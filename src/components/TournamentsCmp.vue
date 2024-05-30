<template>
    <NavCmp />
    <div class="super-mega-div">


        <h1>Torneos</h1>
        <div class="super-general-container">


            <div class="general-container" v-if="existsToken && alreadyInTeam">
                <TournamentTreeCmp class="calendar" v-if="alreadyInTeam" />
            </div>
            <div class="secondary-container">
                <div class="winners">
                    <h2>Ganadores del último anterior</h2>
                    <p>Equipo Ganador: {{ winner_team }}</p>
                    <h3>Ganadores</h3>
                    <p>{{ win_player1_name }}</p>
                    <p>{{ win_player2_name }}</p>
                </div>

                <div v-if="alreadyInTeam" class="team-info">
                    <h2>Tu Equipo</h2>
                    <p>{{ nextTournamentDate }}</p>
                    <p>Jugador 1 : {{ name_player1 }}</p>
                    <p>Jugador 2 : {{ name_player2 }}</p>
                    <p>Equipo : {{ team_id }}</p>
                    <p class="errorMessage">{{ errorMessage }}</p>
                </div>
                <div v-else class="suscribe">
                    <h2>Inscribirse</h2>
                    <div class="btn-join">
                        <router-link v-if="existsToken" to="/joinTournament" class="join-link">Entrar </router-link>
                        <router-link v-else to="/login" class="join-link">Login</router-link>
                    </div>
                </div>
            </div>




        </div>
    </div>
    <FooterCmp />
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
            team_id: "",
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
                const response = await fetch('https://test2php-env.eba-tdje93tb.us-east-1.elasticbeanstalk.com/spicepadel_api/api/checkIfInTeam.php', {
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
        async getTeamNames() {

            try {
                console.log("Se ejecuta getTeamNames")
                const response = await fetch('https://spicepadelv1-env.eba-3r3vapjq.us-east-1.elasticbeanstalk.com/spicepadel_api/api/getTeamNames.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_email: this.user1
                    })
                })
                const data = await response.json()
                console.log("recibo data")
                this.name_player1 = data.name_player1
                this.name_player2 = data.name_player2
                this.team_id = data.team_id
            } catch (error) {
                this.errorMessage = "Error en la conexión con el servidor, ERROR : " + error
            }
        },
        async getLastTournamentWinners() {
            try {
                const response = await fetch('https://spicepadelv1-env.eba-3r3vapjq.us-east-1.elasticbeanstalk.com/spicepadel_api/getLastTournamentWinners.php')
                const data = await response.json()
                if (data.success) {
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
        if (this.existsToken) {

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
    padding: 40px;
    color: #fc0;
    font-size: 70px;
    margin-top: 0;
}

.general-container {
    display: flex;
    padding: 20px;
    justify-content: space-around;
    margin-bottom: 150px;
    background-color: #ffffffc8;
    border-radius: 10px
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
    color: #fc0;
    text-shadow: 0 0 1px #fc0, 0 0 2px #fc0, 0 0 5px #fc0;
}




.winners {
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    border-radius: 10px;
    border-bottom: 1px solid #333;
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
    min-height: 250px;
    background-color: #ffffffc8;
    padding: 10px;
    overflow: auto;
    /* Añade scroll si es necesario */
}

.team-info {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    min-height: 250px;
    border-radius: 10px;
    border-bottom: 1px solid #333;
    display: flex;
    flex-direction: column;

    background-color: #ffffffc8;
    text-align: center;
}

.suscribe {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffffc8;
    text-align: center;
    min-height: 100px;
    max-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
    margin-bottom: 60px;
    padding: 2rem;
}

.super-general-container {
    display: flex;
    justify-content: space-around;

}

.super-mega-div {
    background-image: url('@/assets/bg-tournament2.webp');
    background-repeat: no-repeat;
    background-size: cover;
}

.secondary-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 30px;
    margin-bottom: 40px;
}

.winners p {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    width: 150px;
    align-self: center;

}

.errorMessage {
    color: red;
    font-weight: bold;
    padding: 1rem;
}

.winners {
    text-align: center;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.75); /* Sombra dorada para destacar */
    width: 300px;
    border-radius: 10px;
    border: 2px solid #fc0; /* Borde dorado */
    display: flex;
    flex-direction: column;
    min-height: 250px;
    background-color: #ffffffc8; /* Fondo semitransparente */
    padding: 10px;
    overflow: auto; /* Permite desplazamiento si es necesario */
    position: relative; /* Para efectos de posición */
    animation: glow 1.5s infinite alternate; /* Animación de brillo */
}

.winners h2, .winners h3 {
    color: #333; /* Texto oscuro para más contraste */
    text-shadow: 0 0 6px #fc0; /* Sombra de texto con brillo */
}

.winners p {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    width: 150px;
    align-self: center;
    background-color: #fc0; /* Fondo dorado para los nombres */
    color: #333;
    margin: 5px 0;
    padding: 5px;
    font-weight: bold;
}

/* Keyframes para la animación de brillo */
@keyframes glow {
    from {
        box-shadow: 0 4px 8px rgba(255, 215, 0, 0.6);
    }
    to {
        box-shadow: 0 4px 20px rgba(255, 215, 0, 0.9);
    }
}

@media (max-width: 800px) {
    .general-container {
        flex-direction: column;
    }

    .team-info {
        margin: auto;
        order: -1;

    }

    .super-general-container {
        flex-direction: column;
    }

    .secondary-container {
        align-items: center;
    }
}
</style>