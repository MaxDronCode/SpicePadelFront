<template>
    <NavCmp></NavCmp>
    <h1> Hola, {{ user_name }} </h1>
    <div class="components">
    <AccountCardCmp class="card"></AccountCardCmp>
    <AccountTorneosCmp class="list"></AccountTorneosCmp>
    <AccountMatchReservaCmp class="list"></AccountMatchReservaCmp>
    </div>
    <FooterCmp class="footer"/>
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
    margin-left: 20px;
}

.components{
    display:flex;
    margin-left:-50px;
    justify-content: space-evenly;
}

.card{
    justify-content: left;
    margin:10px;
    align-items: center;
}

.list{
    margin-top:-20px;
    justify-content: center;
    align-items: center;
    margin-left:120px;
}


.footer{
    position:absolute;
    bottom:0;
}

@media(max-width:768px){
    .info{
        flex-direction: column;
        margin:0;
        padding: 0;
        margin:auto;
    }
}

</style>