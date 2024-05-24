<template>
    <div>
        <h1>User List</h1>
        <ul>
            <li v-for="user in users" :key="user.dni">
                {{ user.name }} {{ user.surname1 }} {{ user.surname2 }}
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    name: "TestCmp",
    data() {
        return {
            users: [] 
        }
    },
    mounted(){
        // Ruta Marti : http://localhost/PROYECTO_FINAL/SpicePadelApi/spicepadel_api/api.php
        // Ruta Max : http://localhost/spicepadel_api/api.php
        // fetch('https://Test2php-env.eba-tdje93tb.us-east-1.elasticbeanstalk.com/api.php')
        fetch('http://localhost/spicepadel_api/api.php')
            .then(response => response.json())
            .then(data => {
                this.users = data; 
             
            });
    }
}
</script>


<style scoped>


</style>
