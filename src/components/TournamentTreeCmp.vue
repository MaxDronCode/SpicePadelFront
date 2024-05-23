<template>
    <div >
        <h1>Lista de Equipos</h1>
        <button v-if="!isPaired" @click="pairTeams">{{ buttonText }}</button>
        <div class="teams">
            <div v-for="(pair, index) in pairedTeams" :key="index" class="pair">
                <TeamCmp :class="{ winner: pair.team1 && pair.team1.winner }" :team_id="pair.team1.id"
                    :player1_name="pair.team1.player1_name" :player2_name="pair.team1.player2_name">
                </TeamCmp>
                <span class="versus" v-if="pair.team2">VS</span>
                <TeamCmp v-if="pair.team2" :class="{ winner: pair.team2 && pair.team2.winner }" :team_id="pair.team2.id"
                    :player1_name="pair.team2.player1_name" :player2_name="pair.team2.player2_name">
                </TeamCmp>
                <button v-if="pair.team2 && !pair.team1.winner && !pair.team2.winner"
                    @click="checkWinner(pair.team1.id, pair.team2.id)">Actualizar</button>
                <template v-else-if="!pair.team2">
                    <div class="end">
                        <p>Ganador</p>
                        <button @click="resetTournament">Reset</button>

                    </div>

                </template>
            </div>

        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import confetti from 'canvas-confetti'
import TeamCmp from './TeamCmp.vue'

export default {
    name: 'TournamentTreeCmp',
    components: {
        TeamCmp
    },
    data() {
        return {
            errorMessage: "",
            teams: [],
            pairedTeams: [],
            buttonText: "Emparejar",
            isPaired: false,
            winnerIds: [], // Almacenar los IDs de los ganadores
        }
    },
    methods: {
        async getAllTeams() { // primera funcion en ejecutarse, rellena this.teams con todos los EQUIPOS que hay en la bd
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/getAllTeams.php');
                const data = await response.json();
                if (response.ok) {
                    this.teams = data;
                    this.loadPairedTeams(); // Intentar cargar los equipos emparejados desde localStorage
                    this.paintWinner(); // Pintar los ganadores
                } else {
                    this.errorMessage = data.error || 'Error desconocido al obtener equipos';
                }
            } catch (error) {
                this.errorMessage = "Error de conexión con el servidor: " + error;
            }
        },
        async pairTeams() { // segunda funcion en ejecutarse, al pulsar "emparejar"

            this.pairedTeams = []; // vacio el this.pairedTeams
            for (let i = 0; i < this.teams.length; i += 2) { // recorro this.teams de 2 en 2
                const pair = {
                    team1: this.teams[i],
                    team2: this.teams[i + 1]
                };
                this.pairedTeams.push(pair); // los cojo de 2 en 2 y los meto en this.pairedTeams
                await this.insertMatch(pair.team1.id, pair.team2.id); // Inserto el match en la BD
            }
            this.isPaired = true; // Para quitar el boton de "Emparejar"
            this.savePairedTeams(); // Guardo en LocalStorage
        },

        updateMatches() {
            // Aquí iría la logica para actualizar los partidos
        },
        savePairedTeams() {
            localStorage.setItem('pairedTeams', JSON.stringify(this.pairedTeams));
            localStorage.setItem('isPaired', JSON.stringify(this.isPaired));
            localStorage.setItem('winnerIds', JSON.stringify(this.winnerIds));
        },

        loadPairedTeams() {
            const pairedTeams = localStorage.getItem('pairedTeams');
            const isPaired = localStorage.getItem('isPaired');
            const winnerIds = localStorage.getItem('winnerIds');
            if (pairedTeams && isPaired) {
                this.pairedTeams = JSON.parse(pairedTeams);
                this.isPaired = JSON.parse(isPaired);
                this.winnerIds = winnerIds ? JSON.parse(winnerIds) : [];
                this.paintWinner(); // Pintar los ganadores
            }
        },


        async insertMatch(team1_id, team2_id) {
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/insertMatch.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ team1_id, team2_id })
                });
                const data = await response.json();
                if (!response.ok) {
                    this.errorMessage = data.error || 'Error desconocido al insertar el partido';
                }
            } catch (error) {
                this.errorMessage = "Error de conexión con el servidor: " + error;
            }
        },
        async checkWinner(team1_id, team2_id) {
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/checkWinner.php', { // devuelve el team_id del winner
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'team1_id': team1_id,
                        'team2_id': team2_id
                    })
                });
                const data = await response.json();
                if (data.success) {
                    this.winnerIds.push(data.winner_id); // lo meto en winnerIds    
                    this.paintWinner(); // le damos la el atributo winner
                    this.savePairedTeams(); // guardamos en localStorage
                    this.updatePairings(); // actualizamos los pairings para los nuevos enfrentamientos
                    // console.log("Winner id = " + data.winner_id);
                } else {
                    this.errorMessage = data.message;
                }
            } catch (error) {
                this.errorMessage = "Error de conexión con el servidor: " + error;
            }
        },
        async updatePairings() {
            if (this.winnerIds.length === this.pairedTeams.length && this.winnerIds.length > 1) { // Verificar que todos los ganadores de la ronda actual han sido seleccionados
                const newPairings = []; // array auxiliar
                //recorremos los winnerIDs de 2 en 2, creamos los nuevos equipos en base a si tienen su id en winnerIds
                for (let i = 0; i < this.winnerIds.length; i += 2) {
                    const team1 = this.teams.find(team => team.id === this.winnerIds[i]);
                    const team2 = this.teams.find(team => team.id === this.winnerIds[i + 1]);
                    if (team1 && team2) { // Verificar que ambos equipos existan antes de emparejar
                        newPairings.push({ team1, team2 });
                        await this.insertMatch(team1.id, team2.id); // Insertar el nuevo emparejamiento en la BD
                    }
                }
                this.pairedTeams = newPairings; // tenemos el nuevo this.pairedTeams
                this.winnerIds = []; // Resetear los winner ids
                this.paintWinner(); // Pintar los ganadores después de actualizar los emparejamientos
                this.savePairedTeams(); // guardamos en localStorage

            } else if (this.winnerIds.length === 1 && this.pairedTeams.length === 1) {
                // Solo queda un equipo, es el ganador final
                this.pairedTeams = [{ team1: this.teams.find(team => team.id === this.winnerIds[0]), team2: null }];
                this.paintWinner(); // Pintar el ganador final
                this.winnerIds = [];
                this.savePairedTeams(); // guardamos en localStorage
                this.launchConfetti()   
            }
        },

        paintWinner() {
            this.pairedTeams.forEach(pair => { // recorro cada emparejamiento en this.pairedTeams
                // establezco la propiedad .winner en true si el id del team esta en la lista de winnerIds
                // luego esta propiedad se usa en el template para aplicar una clase
                if (pair.team1) pair.team1.winner = this.winnerIds.includes(pair.team1.id);
                if (pair.team2) pair.team2.winner = this.winnerIds.includes(pair.team2.id);
            });
        },
        async resetTournament(){
            this.clearLocalStorage() // limpiamos la localStorage
            // vaciamos la tabla match del bd
            try{
                const response = await fetch('http://localhost/spicepadel_api/api/deleteMatch.php', {
                    method: 'POST',
                })
                const data = await response.json()
                if (data.success){
                    console.log("Delete de todos los matches, hecho")
                } else {
                    console.log(data.message)
                }
            } catch(error){
                console.log("Error conexion con la db, error: " + error)
            }
            // Recargamos la página
            await new Promise(resolve => setTimeout(resolve, 100)); // Espera breve para asegurar que todo se complete
            window.location.reload();
        },
        clearLocalStorage(){
            localStorage.removeItem('pairedTeams');
            localStorage.removeItem('isPaired');
            localStorage.removeItem('winnerIds');
        },
        launchConfetti() {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    },
    created() {
        this.getAllTeams();
    },
    watch: {
        '$route'() { // Observar cambios en la ruta
            this.paintWinner();
        }
    }
}
</script>

<style scoped>
.teams {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pair {
    display: flex;
    align-items: center;
    margin: 10px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

}

.versus {
    margin: 0 10px;
    font-size: 24px;
    font-weight: bold;
}

button {
    width: 50%;
    padding: 10px;
    margin: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;
}

button:hover {
    background-color: #555;
}

.winner {
    background-color: green;
    color: white;
}
.end{
    width: 150px;
}
@media (max-width: 800px){
    .pair{
        flex-direction: column;
    }
    
}
</style>
