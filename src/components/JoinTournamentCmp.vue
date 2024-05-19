<template>
    <NavCmp/>
    <h1>Apuntarse a Torneo</h1>
    <div>
        <p>Próximo Torneo</p>
        <p>{{ nextTournamentDate }}</p>
    </div>
</template>


<script>
import NavCmp from './NavCmp.vue'
    export default {
        name: 'JoinTournamentCmp',
        components : {
            NavCmp
        },
        data(){
            return{
                nextTournamentDate : "2024-06-04",
            }
        }
    }
</script>


<style scoped>
h1{
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}
</style>