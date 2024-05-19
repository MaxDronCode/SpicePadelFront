<template>
    <NavCmp/>
    <h1>Login</h1>
    <form @submit.prevent="login">
        <label for="dni">DNI/NIF: </label>
        <input type="text" v-model="dni" id="dni" required><br>
        <label for="password">Contraseña: </label>
        <input type="text" v-model="password" id="password" required><br>
        <button type="submit">Iniciar Sesión</button>
        <router-link to="/register" class="register-link">Inscríbete</router-link>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
</template>

<script>
import NavCmp from '@/components/NavCmp.vue'

export default {
    name: "LoginCmp",
    components: {
        NavCmp
    },
    data(){
        return {
            dni: "",
            password: "",
            errorMessage: ""
        }
    },
    methods:{
        async login() {
            try {
                const response = await fetch ('http://localhost/spicepadel_api/api/login.php', {
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        dni: this.dni,
                        password: this.password
                    })
                })
                const data = await response.json()
                if (data.success) {
                    localStorage.setItem('spicetoken', JSON.stringify({'usu_mail': data.user_mail, 'token': data.token}))
                    this.$router.push('/') 
                } else {
                    this.errorMessage = data.message
                }
            } catch (error) {
                this.errorMessage = "Error en la conexión con el servidor"
            }
        }
        
    }
}

</script>

<style scoped>

body{
    background-color: #f4f4f4;
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
h1{
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}
label{
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: bold;
}
input[type="text"], input[type="password"]{
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 999px;
    box-sizing: border-box;
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
.register-link{
    display: block;
    margin-top: 20px;
    color: #333;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
    width: min-content;
}
.register-link:hover{
    color: #09f;
}
.error {
    color: red;
    text-align: center;
}

</style>