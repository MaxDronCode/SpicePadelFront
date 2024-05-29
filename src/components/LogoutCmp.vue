<template>

    <NavCmp/>
    <h1>Logout</h1>
    <div class="general-container">
        
        <form @submit.prevent="logout">
            <button type="submit">Cerrar Sesión</button>
        </form>
    </div>
    <FooterCmp class="footer"></FooterCmp>
</template>


<script>
import NavCmp from './NavCmp.vue';
import FooterCmp from './FooterCmp.vue';

export default {
    name: 'LogoutCmp',
    components : {
        NavCmp,
        FooterCmp
    },
    data(){
        return{
        
        }
    },
    methods: {
        logout() {
            if (confirm("Se va a cerrar sesión. Confirma.")){
                localStorage.removeItem("spicetoken")
                this.$router.push('/')
            }
        }
    }
}
</script>


<style scoped>

h1{
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    padding: 40px;
    font-size: 60px;
}
body{
    background-color: #f0f0e6;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

form{
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    margin: auto;
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
.footer{
    position: absolute;
    bottom: 0;
}

</style>