<template>
    <NavCmp />
    <h1>Torneos</h1>
    <div class="general-container">
        <div class="calendar">
            Calendar
        </div>
        <div>

            <p>Inscribirse</p>
            <div class="btn-join">
                <router-link v-if="existsToken" to="/joinTournament" class="join-link">Entrar </router-link>
                <router-link v-else to="/login" class="join-link">Login</router-link>
            </div>
        </div>

    </div>
</template>


<script>
import NavCmp from './NavCmp.vue';

export default {
    name: 'TournamentsCmp.vue',
    components: {
        NavCmp
    },
    data() {
        return {
            existsToken: false
        }
    },
    methods: {
        checkToken() {
            this.existsToken = localStorage.getItem('spicetoken') !== null
        }
    },
    created() {
        this.checkToken() // COmprueba que exista token
    },
   
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
</style>