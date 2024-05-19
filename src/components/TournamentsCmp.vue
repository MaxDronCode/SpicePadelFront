<template>
    <NavCmp/>
    <h1>Torneos</h1>
    <div class="general-container">
        <div class="calendar">
            Calendar
        </div>

        <div class="btn-join">
            <router-link to="/joinTournament" class="join-link">Apuntarse </router-link>
        </div>

    </div>
</template>


<script>
import NavCmp from './NavCmp.vue';

    export default {
        name: 'TournamentsCmp.vue',
        components : {
            NavCmp
        },
        data(){
            return{

            }
        }
    }
</script>


<style scoped>
*{
    box-sizing: border-box;

}
h1{
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}
.general-container{
    display: flex;
    padding: 20px;
    justify-content: space-around;
}
.calendar{
    min-width: 50vw;
    border: 1px solid #333;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    min-height: 300px;
    text-align: center;
}
.btn-join{
    width: 100%;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;
    max-height: 40px;
    max-width: 100px;
    display: grid;
    place-items: center;
}


.btn-join:hover{
    background-color: #555;
}
.join-link{
    display: block;
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
    width: min-content;
}
.join-link:hover{
    color: #09f;
}
</style>