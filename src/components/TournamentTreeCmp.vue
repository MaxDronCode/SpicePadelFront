<template>
    <div>
        <h1>Lista de Equipos</h1>
        <button v-if="!isPaired" @click="pairTeams">{{ buttonText }}</button>
        <div class="teams">
            <div v-for="(pair, index) in pairedTeams" :key="index" class="pair">
                <TeamCmp
                    :team_id="pair.team1.id"
                    :player1_name="pair.team1.player1_name"
                    :player2_name="pair.team1.player2_name">
                </TeamCmp>
                <span class="versus">VS</span>
                <TeamCmp
                    :team_id="pair.team2.id"
                    :player1_name="pair.team2.player1_name"
                    :player2_name="pair.team2.player2_name">
                </TeamCmp>
                <button @click="checkWinner(pair.team1.id, pair.team2.id)">Actualizar</button>
            </div>
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import TeamCmp from './TeamCmp.vue'

export default {
    name: 'TournamentTreeCmp',
    components:{
        TeamCmp
    },
    data() {
        return {
            errorMessage: "",
            teams: [],
            pairedTeams: [],
            buttonText: "Emparejar",
            isPaired: false,
            winnersIds: []
        }
    },
    methods: {
        async getAllTeams() {
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/getAllTeams.php');
                const data = await response.json();
                if (response.ok) {
                    this.teams = data;
                    this.loadPairedTeams(); // Intentar cargar los equipos emparejados desde localStorage
                } else {
                    this.errorMessage = data.error || 'Error desconocido al obtener equipos';
                }
            } catch (error) {
                this.errorMessage = "Error de conexión con el servidor: " + error;
            }
        },
        async pairTeams() {
            this.pairedTeams = [];
            for (let i = 0; i < this.teams.length; i += 2) {
                const pair = {
                    team1: this.teams[i],
                    team2: this.teams[i + 1]
                };
                this.pairedTeams.push(pair);
                await this.insertMatch(pair.team1.id, pair.team2.id); // Insertar el match en la BD
            }
            this.savePairedTeams();
            // this.buttonText = "Actualizar";
            this.isPaired = true;
        },
        // handleButtonClick() {
        //     if (!this.isPaired) {
        //         this.pairTeams();
        //     } else {
        //         this.updateMatches();
        //     }
        // },
        updateMatches() {
            // Aquí iría tu lógica para actualizar los partidos
        },
        savePairedTeams() {
            localStorage.setItem('pairedTeams', JSON.stringify(this.pairedTeams));
            localStorage.setItem('isPaired', JSON.stringify(this.isPaired));
            // localStorage.setItem('buttonText', this.buttonText);
        },
        loadPairedTeams() {
            const pairedTeams = localStorage.getItem('pairedTeams');
            const isPaired = localStorage.getItem('isPaired');
            // const buttonText = localStorage.getItem('buttonText');
            if (pairedTeams && isPaired) {
                this.pairedTeams = JSON.parse(pairedTeams);
                this.isPaired = JSON.parse(isPaired);
                // this.buttonText = buttonText;
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
        async checkWinner(team1_id, team2_id){
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/checkWinner.php', {
                    method: 'POST',
                    headers : {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        'team1_id': team1_id, 
                        'team2_id': team2_id
                    })
                })
                const data = await response.json()
                
                if (data.success){
                    this.winner_id = data.winner_id
                    console.log("Winner id = " + this.winner_id)
                } else {
                    this.errorMessage = data.message;
                }
            } catch (error) {
                this.errorMessage = "Error de conexión con el servidor: " + error;
            }

        }
    },
    created() {
        this.getAllTeams();
    }
}
</script>

<style scoped>
.teams{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.pair{
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.versus {
    margin: 0 10px;
    font-size: 24px;
    font-weight: bold;
}
button{
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
button:hover{
    background-color: #555;
}
</style>
