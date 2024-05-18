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
        fetch('http://localhost/spicepadel_api/api.php')
            .then(response => response.json())
            .then(data => {
                this.users = data; 
             
            });
    }
}
</script>


<style scoped>
/* Estilos para tu componente */
</style>
