<template>
    <NavCmp />

        <h1>Inscripción</h1>
        <div class="general-container">
            <img :src="alicia1" alt="desc">
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
                <label for="birthday">Fecha de Nacimiento:</label>
                <input type="date" v-model="birthday" required><br><br>
                <label for="bank_account">IBAN:</label>
                <input type="text" v-model="bank_account" required><br>
                <br>
                <br>
                <label for="dni">DNI/NIF: </label>
                <input type="text" v-model="dni" required><br>
                <label for="password">Contraseña:</label>
                <input type="text" v-model="password" required><br>
                <button type="submit">Registrarse</button>

            </form>
            <img :src="alicia2" alt="desc">
        </div>
        <p class="error">{{ errorMessage }}</p>

    <FooterCmp />

</template>


<script>
import NavCmp from './NavCmp.vue';
import FooterCmp from './FooterCmp.vue';
import ali1 from '@/assets/alicia1.webp';
import ali2 from '@/assets/alicia2.webp';

export default {
    name: 'RegisterCmp',
    components: {
        NavCmp,
        FooterCmp
    },
    data() {
        return {
            dni: "",
            name: "",
            surename1: "",
            surename2: "",
            phone: "",
            email: "",
            birthday: "",
            bank_account: "",
            password: "",
            errorMessage: "",
            alicia1: ali1,
            alicia2: ali2
        }
    },
    methods: {
        async register() {
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/registerChat.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        dni: this.dni,
                        name: this.name,
                        surename1: this.surename1,
                        surename2: this.surename2,
                        phone: this.phone,
                        email: this.email,
                        birthday: this.birthday,
                        bank_account: this.bank_account,
                        address: this.address,
                        password: this.password,
                    })
                })
                const data = await response.json()
                if (data.success) {
                    console.log(data)
                    localStorage.setItem('spicetoken', JSON.stringify({ 'token': data.token, 'user_mail': data.user_mail }));
                    this.$router.push('/')
                } else {
                    console.log(data)
                    this.errorMessage = data.message
                    alert(data.message)
                }
            } catch (error) {
                this.errorMessage = "Error en la conexión con el servidor ERROR : " + error
            }
        }
    }
}
</script>


<style scoped>
body {
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    margin: auto;
    height: 100%;
}

h1 {
    text-align: center;
    color: #333;
    /* margin-bottom: 20px; */
    padding: 40px;
    background-color: #f0f0e6;
    font-size: 60px;
    margin: 0;

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

.general-container {
    display: flex;
    justify-content: space-between;
    width: 100vw;
    background-color: #f0f0e6;
    height: 100%;
}

img {
    width: auto;
    height: 700px;
    margin: 0;
    border-radius: 10px;
}


.error {
    color: red;
    text-align: center;
    background-color: #f0f0e6;

}

@media (max-width:900px){
    img{
        
    }
}
</style>