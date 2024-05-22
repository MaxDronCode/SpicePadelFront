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
</template>

<script>
import NavCmp from './NavCmp.vue'
export default {
    name: 'JoinTournamentCmp',
    components: {
        NavCmp
    },
    data() {
        return {
            nextTournamentDate: "2024-06-04", // Fecha hardcodeada de forma temporal
            user1: "",
            users2: [],
            errorMessage: "",
            alreadyInTeam: false
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
                const response = await fetch('http://localhost/spicepadel_api/api/getUsers.php')
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
                this.errorMessage = "Error en la conexión con el servidor"
            }
        }
    },
    created() {
        this.getUser1()
        this.getUser2()
        this.checkIfInTeam()
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
