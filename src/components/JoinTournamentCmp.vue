<template>
    <NavCmp />
    <h1>Apuntarse a Torneo</h1>
    <form @submit.prevent="createTeam" v-if="!alreadyInTeam">
        <p>Próximo Torneo</p>
        <p>{{ nextTournamentDate }}</p>
        <p>Usted: {{ user1 }}</p>
        <select name="users2" id="users2" ref="users2">
            <option value="">Seleccione su compañero</option>
            <option v-for="user in users2" :key="user.email" :value="user.email">{{ user.email }}</option>
        </select><br>
        <button type="submit">Apuntarse</button>
        <p>{{ errorMessage }}</p>
    </form>
    <div v-else>
        <p>Próximo Torneo</p>
        <p>{{ nextTournamentDate }}</p>
        <p>Jugador 1 : {{ name_player1 }}</p>
        <p>Jugador 2 : {{ name_player2 }}</p>
        <p>Equipo : {{ team_id }}</p>
    </div>
    <FooterCmp/>
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
            nextTournamentDate: "2024-06-04", // Fecha hardcodeada de forma temporal
            user1: "",
            users2: [],
            errorMessage: "",
            alreadyInTeam: false,
            name_player1: "",
            name_player2: "",
            team_id : ""
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
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({'player1_mail': this.user1})
                })
                const data = await response.json()
                this.users2 = data
            } catch (error) {
                console.log("Error en la conexión con el servidor")
            }
        },
        async createTeam() {
            const selectedUser2 = this.$refs.users2.value;
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/createTeam.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_mail1: this.user1,
                        user_mail2: selectedUser2
                    })
                })
                const data = await response.json()
                this.errorMessage = data.message
                if (data.success) {
                    this.alreadyInTeam = true; // Actualizar el estado para ocultar el formulario
                    this.getTeamNames()
                }
            } catch (error) {
                console.log("Error en la conexión con el servidor")
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
                console.log("Error en la conexión con el servidor")
                this.errorMessage = "Error en la conexión con el servidor, ERROR : " + error
            }
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
    h1 {
        color: blueviolet;
    }
</style>
