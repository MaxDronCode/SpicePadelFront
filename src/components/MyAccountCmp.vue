<template>
    <NavCmp></NavCmp>
    <h1> Hola, {{ user_name }} </h1>
    <AccountCardCmp></AccountCardCmp>
    <FooterCmp />
</template>


<script>
import NavCmp from './NavCmp.vue';
import AccountCardCmp from './AccountCardCmp.vue';
import FooterCmp from './FooterCmp.vue';

export default {
    name: 'MyAccountCmp',
    components: {
        NavCmp,
        AccountCardCmp,
        FooterCmp
    },
    data() {
        return {
            usuMail: "",
            user_name: ""
        }
    },
    methods: {
        obtainEmail() {
            const spiceTokenString = localStorage.getItem('spicetoken');
            const spiceToken = JSON.parse(spiceTokenString);
            this.usuMail = spiceToken.user_mail;
        },
        async obtainName() {

            try {
                const response = await fetch('http://localhost/spicepadel_api/api/getName.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'user_email': this.usuMail
                    })
                })
                const data = await response.json()
                this.user_name = data.user_name
                

            } catch (error) {
                console.log("Error al conectar con la api: " + error)
            }
        },
    },
    mounted() {
        this.obtainEmail()
        this.obtainName()
    }
}
</script>

<style scoped>

</style>