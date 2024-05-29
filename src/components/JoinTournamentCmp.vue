<template>
    <NavCmp />
    <h1>Apuntarse a Torneo</h1>
    <form @submit.prevent="createTeam" v-if="!alreadyInTeam" class="join-form">
        <p>Usted: {{ user1 }}</p>
        <select name="users2" id="users2" ref="users2">
            <option value="">Seleccione su compañero</option>
            <option v-for="user in users2" :key="user.email" :value="user.email">{{ user.email }}</option>
        </select><br>
        <button type="submit">Apuntarse</button>
        <p>{{ errorMessage }}</p>
    </form>
    <div v-else class="join-already">
        <p>Próximo Torneo</p>
        <p>{{ nextTournamentDate }}</p>
        <p>Jugador 1 : {{ name_player1 }}</p>
        <p>Jugador 2 : {{ name_player2 }}</p>
        <p>Equipo : {{ team_id }}</p>
    </div>
    <FooterCmp />
</template>

<script>
import NavCmp from './NavCmp.vue'
import FooterCmp from './FooterCmp.vue';

export default {
    name: 'JoinTournamentCmp',
    components: {
        NavCmp,
        FooterCmp
    },
    data() {
        return {
            user1: "",
            users2: [],
            errorMessage: "",
            alreadyInTeam: false,
            name_player1: "",
            name_player2: "",
            team_id: ""
        }
    },
    methods: {
        getUser1() {
            const spicetokenString = localStorage.getItem('spicetoken')
            const spicetoken = JSON.parse(spicetokenString)
            this.user1 = spicetoken.user_mail
        },
        async getUser2() {
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/getUsers.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'player1_mail': this.user1 })
                })
                const data = await response.json()
                this.users2 = data
            } catch (error) {
                console.log("Error en la conexión con el servidor (getUser2)")
            }
        },
        async createTeam() {
            const selectedUser2 = this.$refs.users2.value;
            console.log("Se envia user 1: ", this.user1, " y el user 2: ", selectedUser2)
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/createTeam.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'user_mail1': this.user1,
                        'user_mail2': selectedUser2
                    })
                })
                const data = await response.json()
                this.errorMessage = data.message
                if (data.success) {
                    this.alreadyInTeam = true; // Actualizar el estado para ocultar el formulario
                    this.getTeamNames()
                } else {
                    console.log(data.message)
                }
            } catch (error) {
                console.log("Error en la conexión con el servidor (Create Team)")
                this.errorMessage = "Error en la conexión con el servidor"
            }
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
                console.log("Error en la conexión con el servidor (checkIfInTeam)")
                this.errorMessage = "Error en la conexión con el servidor, ERROR : " + error
            }
        },
        async getTeamNames() {

            try {
                const response = await fetch('http://localhost/spicepadel_api/api/getTeamNames.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
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
                console.log("Error en la conexion con el servidor, getTeamNames()")
                this.errorMessage = "Error en la conexión con el servidor, ERROR : " + error
            }
        }
    },
    created() {
        this.getUser1()
        this.getUser2()
        this.checkIfInTeam()
        this.getTeamNames()
    },
    watch: {
        '$route'() { // Observar cambios en la ruta
            this.checkIfInTeam();
        }
    }
}
</script>

<style scoped>


.join-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto auto 50px auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
    width: 300px;
    height: 400px;
}

.join-form p {
    font-size: 16px;
    color: #333;
}

select {
    width: 100%;
    padding: 10px 15px;
    margin-top: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
    background-color: white;
    cursor: pointer;
}

select:focus {
    border-color: #0056b3;
    outline: none;
}
button{
    width: 100%;
    padding: 10px;
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

/* Estilos para los detalles del torneo en caso de estar ya en un equipo */
.join-already {
    text-align: center;
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 8px;
    margin: 20px 20px 350px 20px;
}
h1 {
    text-align: center;
    color: #333;
    padding: 40px;
}
</style>
