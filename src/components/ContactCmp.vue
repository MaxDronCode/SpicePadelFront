<template>
    <NavCmp/>
    <h1>Contáctanos</h1>
    <form @submit.prevent="sendForm" v-if="!formSent">
        <h2>Tienes alguna duda o consulta?</h2>
        <p>Si te quieres poner en contacto con el Club, solicitar información o hacer alguna consulta, rellena el siguiente formulario:</p>
        <input type="text" placeholder="Nombre y Apellido" required v-model="form.user_name"><br>
        <div class="container-inputs1">
            <input type="text" placeholder="Correo electrónico" class="inp-email" required v-model="form.email">
            <input type="text" placeholder="Teléfono de contacto" required v-model="form.phone">
        </div>
        <input type="text" placeholder="Tema" required v-model="form.theme">
        <textarea placeholder="Comentario" rows="10" required v-model="form.text"></textarea>
        <button>Enviar</button>
    </form>
    <div v-else class="formSent">
        <h2>{{ message }}</h2>
    </div>
    <FooterCmp/>
</template>

<script>
import NavCmp from './NavCmp.vue';
import FooterCmp from './FooterCmp.vue';

export default {
    name: 'ContactCmp',
    components : {
        NavCmp,
        FooterCmp
    },
    data() {
        return {
            formSent: false,
            message: "",
            form: {
                'user_name': "",
                'email': "",
                'phone': "",
                'theme': "",
                'text': ""
            }
        }
    },
    methods: {
        async sendForm() {
            try {
                const response = await fetch('http://localhost/spicepadel_api/insertComment.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.form)
                })
                const data = await response.json()
                if (data.success) {
                    this.message = data.message
                    this.formSent = true
                } else {
                    this.message = data.message
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    created() {
    }
}
</script>

<style scoped>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
}

h1 {
    text-align: center;
    background-color: #fc0;
    line-height: 100px;
    height: 100px;
    margin: 0 0 50px 0;
    font-size: 60px;
    color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form {
    width: 80%;
    margin: 0 auto 50px auto;
    padding: 2rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.formSent {
    width: 80%;
    margin: 0 auto 800px auto;
    text-align: center;
    padding: 2rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #fc0;
    margin-bottom: 1rem;
    font-size: 2rem;
}

p {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #333;
}

input[type="text"], textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    outline: none;
}

.container-inputs1 {
    display: flex;
    gap: 1rem;
}

.container-inputs1 input {
    flex: 1;
}

button {
    width: 100%;
    padding: 15px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: background-color 0.3s ease-in-out;
    display: block;
    margin: 1rem auto 0 auto;
}

button:hover {
    background-color: #555;
}

@media (max-width: 600px) {
    .container-inputs1 {
        flex-direction: column;
    }
}
</style>

