<template>
    <NavCmp></NavCmp>
    <h1> Hola, {{ user_name }} </h1>
    <div class="components">
        <AccountCardCmp class="card"></AccountCardCmp>
    </div>
    <div class="info">
    <AccountTorneosCmp class="list"></AccountTorneosCmp>
    <AccountMatchReservaCmp class="list"></AccountMatchReservaCmp>
    </div>
    <FooterCmp />
</template>


<script>
import NavCmp from './NavCmp.vue';
import AccountCardCmp from './AccountCardCmp.vue';
import AccountTorneosCmp from './AccountTorneosCmp.vue';
import AccountMatchReservaCmp from './AccountMatchReservaCmp';
import FooterCmp from './FooterCmp.vue';

export default {
    name: 'MyAccountCmp',
    components: {
        NavCmp,
        AccountCardCmp,
        FooterCmp,
        AccountTorneosCmp,
        AccountMatchReservaCmp,
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

h1{
    margin-left: 20px;;
}

.components{
    width: 100%;
    display:flex;
    justify-content: center;
    margin-left:-100px;
}

.info{
    display: flex;
    justify-content: space-around;
}

.card{
    justify-content: left;
    margin-left:100px;
    align-items: center;
}

.list{
    justify-content: center;
    align-items: center;
    margin-left:120px;
}

</style>