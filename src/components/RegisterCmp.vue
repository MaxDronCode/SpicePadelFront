<template>
    <NavCmp/>
    <h1>Inscripción</h1>
    <form @submit.prevent="register">
        <label for="name">Nombre: </label>
        <input type="text" v-model="name" required><br>
        <label for="surename1">Apellido: </label>
        <input type="text" v-model="surename1" required><br>
        <label for="surename2">Segundo Apellido</label>
        <input type="text" v-model="surename2" required><br>
        <label for="phone">Teléfono: </label>
        <input type="text" v-model="phone" required><br>
        <label for="email">Correo Electrónico: </label>
        <input type="text" v-model="email" required><br>
        <label for="address">Dirección:</label>
        <input type="text" v-model="address" required><br>
        <label for="birthday">Dirección:</label>
        <input type="text" v-model="birthday" required><br>
        <label for="bank_account">Dirección:</label>
        <input type="text" v-model="bank_account" required><br>
        <br>
        <br>
        <label for="dni">DNI/NIF: </label>
        <input type="text" v-model="dni" required><br>
        <label for="password">Contraseña:</label>
        <input type="text" v-model="password" required><br>
        <button type="submit">Registrarse</button>

    </form>
    <p class="error">{{ errorMessage }}</p>
</template>


<script>
import NavCmp from './NavCmp.vue';

    export default {
        name: 'RegisterCmp',
        components : {
            NavCmp
        },
        data(){
            return{
                dni: "",
                name: "",
                surename1: "",
                surename2: "",
                phone: "",
                email: "",
                birthday: "",
                bank_account: "",
                password: "",
                errorMessage: ""
            }
        },
        methods:{
            async register(){
                try {
                    // ruta Max: http://localhost/spicepadel_api/api/createTeam.php
                    // ruta Martí: http://localhost/PROYECTO_FINAL/SpicePadelApi/spicepadel_api/api/register.php
                    const response = await fetch ('http://localhost/spicepadel_api/api/register.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify({
                            dni : this.dni,
                            name : this.name,
                            surename1 : this.surename1,
                            surename2 : this.surename2,
                            phone : this.phone,
                            email: this.email,
                            birthday: this.birthday,
                            bank_account: this.bank_account,
                            address: this.address,
                            password: this.password,
                        })
                    })
                    const data = await response.json()
                    if (data.success){
                        localStorage.setItem('spicetoken', JSON.stringify({'token' : data.token, 'user_mail' : data.user_mail}));
                        this.$router.push('/')
                    } else {
                        this.errorMessage = data.message
                        alert(data.message)
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
.error {
    color: red;
    text-align: center;
}
</style>