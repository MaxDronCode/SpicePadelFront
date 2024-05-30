<template>
    <NavCmp />
    <div class="super-general-div">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <label for="dni">DNI/NIF: </label>
            <input type="text" v-model="dni" id="dni" required><br>
            <label for="password">Contraseña: </label>
            <input type="password" v-model="password" id="password" required><br>
            <button type="submit">Iniciar Sesión</button>
            <router-link to="/register" class="register-link">Inscríbete</router-link>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
    <FooterCmp />
</template>

<script>
import NavCmp from '@/components/NavCmp.vue';
import FooterCmp from './FooterCmp.vue';

export default {
    name: "LoginCmp",
    components: {
        NavCmp,
        FooterCmp
    },
    data() {
        return {
            dni: "",
            password: "",
            errorMessage: ""
        }
    },
    methods: {
        async login() {
            try {
                const response = await fetch('http://http://test2php-env.eba-tdje93tb.us-east-1.elasticbeanstalk.com//spicepadel_api/api/login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        dni: this.dni,
                        password: this.password
                    })
                })
                const data = await response.json()
                if (data.success) {
                    if (data.admin) {
                        localStorage.setItem('spicetoken', JSON.stringify({ 'user_mail': data.user_mail, 'token': data.token, 'admin': true }))
                        this.$router.push('/myAccount')
                    } else {
                        localStorage.setItem('spicetoken', JSON.stringify({ 'user_mail': data.user_mail, 'token': data.token, 'admin': false }))
                        this.$router.push('/')
                    }
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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body, html {
    height: 100%;
}

.super-general-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('@/assets/recepcion.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
}

h1 {
    text-align: center;
    padding: 40px 0;
    margin-bottom: 1rem;
    color: #fc0;
    font-size: 70px;
    
}

label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 999px;
    box-sizing: border-box;
}

button {
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

button:hover {
    background-color: #555;
}

.register-link {
    display: block;
    margin-top: 20px;
    color: #333;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
    width: min-content;
}

.register-link:hover {
    color: #09f;
}

.error {
    color: red;
    text-align: center;
    margin-top: 20px;
}

.footer {
    width: 100%;
    position: absolute;
    bottom: 0;
}
</style>
