<template>
    <NavCmp />
    <h1>Torneos</h1>
    <div class="winners">
        <h2>Ganadores del torneo anterior</h2>
        <p>Equipo Ganador: {{ winner_team }}</p>
        <h3>Ganadores</h3>
        <p>{{ win_player1_name }}</p>
        <p>{{ win_player2_name }}</p>
    </div>
    <div class="general-container">
        <TournamentTreeCmp class="calendar" v-if="alreadyInTeam"/>
        <!-- <div class="calendar" v-else>
            Calendar
        </div> -->
        <div v-if="alreadyInTeam" class="team-info">
            <p><b>Tu Equipo</b></p>
            <p>{{ nextTournamentDate }}</p>
            <p>Jugador 1 : {{ name_player1 }}</p>
            <p>Jugador 2 : {{ name_player2 }}</p>
            <p>Equipo : {{ team_id }}</p>
            <p>{{ errorMessage }}</p>
        </div>
        <div v-else>

            <p>Inscribirse</p>
            <div class="btn-join">
                <router-link v-if="existsToken" to="/joinTournament" class="join-link">Entrar </router-link>
                <router-link v-else to="/login" class="join-link">Login</router-link>
            </div>
        </div>

    </div>
    <FooterCmp/>
</template>


<script>
import NavCmp from './NavCmp.vue';
import TournamentTreeCmp from './TournamentTreeCmp.vue';
import FooterCmp from './FooterCmp.vue';
export default {

    name: 'TournamentsCmp.vue',
    components: {
        NavCmp,
        TournamentTreeCmp,
        FooterCmp
    },
    data() {
        return {
            existsToken: false,
            alreadyInTeam: false,
            name_player1: "",
            name_player2: "",
            team_id : "",
            errorMessage: "",
            user1: "",
            winner_team: null,
            win_player1_name: "",
            win_player2_name: ""
        }
    },
    methods: {
        checkToken() {
            this.existsToken = localStorage.getItem('spicetoken') !== null
        },
        async checkIfInTeam() {
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/checkIfInTeam.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_mail: this.user1
                    })
                })
                const data = await response.json()
                this.alreadyInTeam = data.alreadyInTeam
            } catch (error) {
                console.log("Error en la conexión con el servidor")
                this.errorMessage = "Error en la conexión con el servidor, ERROR : " + error
            }
        },
        getUser1() {
            const spicetokenString = localStorage.getItem('spicetoken')
            const spicetoken = JSON.parse(spicetokenString)
            this.user1 = spicetoken.user_mail
        },
        async getTeamNames(){
            
            try{
                const response = await fetch('http://localhost/spicepadel_api/api/getTeamNames.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        user_email: this.user1
                    })
                })
                const data = await response.json()
                this.name_player1 = data.name_player1
                this.name_player2 = data.name_player2
                this.team_id = data.team_id
            } catch (error) {
                this.errorMessage = "Error en la conexión con el servidor, ERROR : " + error
            }
        },
        async getLastTournamentWinners(){
            try{
                const response = await fetch('http://localhost/spicepadel_api/getLastTournamentWinners.php')
                const data = await response.json()
                if (data.success){
                    this.winner_team = data.winner_team
                    this.win_player1_name = data.win_player1_name
                    this.win_player2_name = data.win_player2_name
                } else {
                    console.log("Error : ", data.message)
                }
            } catch (error) {
                console.log("Error al conectar a la api: ", error)
            }
        }
    },
    created() {
        this.checkToken() // COmprueba que exista token
        this.getLastTournamentWinners()
        if (this.existsToken){

            this.getUser1()
            this.checkIfInTeam()
            this.getTeamNames()
        }
    },
    watch: {
        '$route'() { // Observar cambios en la ruta
            this.checkToken() // COmprueba que exista token
            this.getUser1()
            this.checkIfInTeam()
            this.getTeamNames()
        }
    }
   
}
</script>


<style scoped>
* {
    box-sizing: border-box;

}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.general-container {
    display: flex;
    padding: 20px;
    justify-content: space-around;
}

.calendar {
    min-width: 50vw;
    border: 1px solid #333;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    min-height: 300px;
    text-align: center;
}

.btn-join {
    width: 100%;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;
    max-height: 40px;
    min-height: 40px;
    max-width: 100px;
    display: flex;
    align-items: center;
    margin-bottom: 30vh;
    
}


.btn-join:hover {
    background-color: #555;
}

.join-link {
    display: block;
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
}

.join-link:hover {
    color: #09f;
}
.winners{
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    border-radius: 10px;
    margin: auto;
    border-bottom: 1px solid #333;
}
.team-info{
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    height: 200px;
    border-radius: 10px;
    border-bottom: 1px solid #333;


}
@media (max-width: 800px){
    .general-container{
        flex-direction: column;
    }
    .team-info{
        margin: auto;
        order: -1;
        
    }
}
</style>