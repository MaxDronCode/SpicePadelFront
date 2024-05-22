<template>
    <div class="team">
        <p>{{ player1_name }}</p>
        <p>{{ player2_name }}</p>
        <p>{{ team_id }}</p>
    </div>

</template>


<script>
export default {
    name: 'TeamCmp',
    components: {

    },
    props: {
        team_id: String,
        player1_name: String,
        player2_name: String
    },
    data() {
        return {

        }
    }
}
</script>


<style scoped>
.team{
    border: 1px solid #333;
    border-radius: 8px;
    width: 180px;
    margin: 5px ;
}
p:first-child{
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
}
p:nth-child(2){
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
}
</style>