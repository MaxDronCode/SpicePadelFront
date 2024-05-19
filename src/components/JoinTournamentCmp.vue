<template>
    <NavCmp />
    <h1>Apuntarse a Torneo</h1>
    <form>
        <p>Próximo Torneo</p>
        <p>{{ nextTournamentDate }}</p>
        <p>Usted: {{ user1 }}</p>
        <select name="users2" id="users2">
            <option value="">Seleccione su compañero</option>
            <option v-for="user in users2" :key="user.email" :value="user.email">{{ user.email }}</option>
        </select>
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
            users2: []
        }
    },
    methods: {
        getUser1() {
            const spicetokenString = localStorage.getItem('spicetoken')
            const spicetoken = JSON.parse(spicetokenString)
            this.user1 = spicetoken.user_mail
        },
        async getUser2(){
            try {
                const response = await fetch ('http://localhost/spicepadel_api/api/getUsers.php')
                const data = await response.json()
                this.users2 = data
            } catch (error) {
                console.log("Error en la conexión con el servidor")
            }
        }
    },
    created() {
        this.getUser1() 
        this.getUser2()
    },
    
}
</script>


<style scoped>
h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}
</style>