<template>
<NavCmp></NavCmp>
<h1> Hola, {{ usuMail }} </h1>
<AccountCardCmp></AccountCardCmp>
<FooterCmp/>
</template>


<script>
import NavCmp from './NavCmp.vue';
import AccountCardCmp from './AccountCardCmp.vue';
import FooterCmp from './FooterCmp.vue';

    export default {
        name: 'MyAccountCmp',
        components : {
            NavCmp,
            AccountCardCmp,
            FooterCmp
        },
        data(){
            return {
                usuMail:"",
               
            }
        },
        methods:{
            obtainName(){
                const spiceTokenString=localStorage.getItem('spicetoken');
                const spiceToken= JSON.parse(spiceTokenString);
                this.usuMail=spiceToken.user_mail;
            },
            getTeam(){
                

            },
        },
        mounted(){
            this.obtainName()
        }
    }
</script>

<style scoped>

</style>