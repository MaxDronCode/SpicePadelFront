<template>
    <div>
        <h1>Lista de Equipos</h1>
        <div class="teams">
            <TeamCmp v-for="team in teams" 
                :key="team.id" 
                :team_id="team.id" 
                :player1_name="team.player1_name" 
                :player2_name="team.player2_name">
            </TeamCmp>
            
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import TeamCmp from './TeamCmp.vue'

export default {
    name: 'TournametTreeCmp',
    components:{
        TeamCmp
    },
    data() {
        return {
            errorMessage: "",
            teams: []
        }
    },
    methods: {
        async getAllTeams() {
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/getAllTeams.php');
                const data = await response.json();
                if (response.ok) {
                    this.teams = data; // Actualizar la variable teams con los datos recibidos
                } else {
                    this.errorMessage = data.error || 'Error desconocido al obtener equipos';
                }
            } catch (error) {
                this.errorMessage = "Error de conexión con el servidor: " + error;
            }
        }
    },
    created() {
        this.getAllTeams();
    }
}
</script>

<style scoped>
.teams{
    display: flex;
    flex-direction: column;
}
</style>
