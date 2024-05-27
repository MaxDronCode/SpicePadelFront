<template>
    <NavCmp/>
    <h1>Contáctanos</h1>
    <form @submit.prevent="sendForm" v-if="!this.formSent">
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
        data(){
            return {
                formSent: false,
                message: "",
                form:{
                    'user_name': "",
                    'email': "",
                    'phone': "",
                    'theme': "",
                    'text': ""
                }
            }
        },
        methods: {
            async sendForm(){
                try{
                    const response = await fetch('http://localhost/spicepadel_api/insertComment.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(this.form)
                    })
                    const data = await response.json()
                    if (data.success){
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
        created(){
        }
    }
</script>


<style scoped>
h1{
    text-align: center;
    background-color: #fa1f88;
    line-height: 100px;
    height: 100px;
    margin: 0 0 50px 0;
}
form{
    width: 80%;
    margin: 0 auto 50px auto;
}
.formSent{
    width: 80%;
    margin: 0 auto 800px auto;
}
h2{
    color: #fa1f88;

}
input[type="text"], textarea{
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    box-sizing: border-box;

}

.container-inputs1{
    display: flex;

}
.inp-email{
    margin-right: 20px;
}
button{
    width: 50%;
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;
    justify-self: center;
}
button:hover{
    background-color: #555;
}
</style>