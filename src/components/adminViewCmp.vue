<template>
    <h1>Admin View</h1>
    <p>{{ errorMessage }}</p>
    <div class="general-container">
        <!-- ---------------------------USUARIOS------------------------------------------- -->
        <button @click="getUsers" v-if="!users.length" class="gnrl-button">Ver Usuarios</button>
        <button @click="hideUsers" v-else class="gnrl-button">Ocultar Usuarios</button>
        <table>
            <thead v-if="users.length">
                <tr>
                    <td>DNI</td>
                    <td>Nombre</td>
                    <td>Apellido</td>
                    <td>Apellido2</td>
                    <td>Telefono</td>
                    <td>Mail</td>
                    <td>Direccion</td>
                    <td>Contraseña</td>
                    <td colspan="2">Acciones</td>
                </tr>
            </thead>
            <tr v-for="user in users" :key="user.dni">
                <td>{{ user.dni }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.surname1 }}</td>
                <td>{{ user.surname2 }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.password }}</td>
                <td><button @click="editUser(user.dni)">Modificar</button></td>
                <td><button @click="deleteUser(user.dni)">Eliminar</button></td>
            </tr>
        </table>
        <div v-if="editingUser !== null" class="modal-overlay">
            <div class="modal-content">

                <form @submit.prevent="saveUserEdition">
                    <h2>Editar Usuario</h2>
                    <label for="edit_user_dni">Dni:</label>
                    <input type="text" v-model="editedUser.dni" required><br>
                    <label for="edit_user_name">Nombre:</label>
                    <input type="text" v-model="editedUser.name" required><br>
                    <label for="edit_user_surname1">Apellido1:</label>
                    <input type="text" v-model="editedUser.surname1" required><br>
                    <label for="edit_user_surname2">Apellido2:</label>
                    <input type="text" v-model="editedUser.surname2" required><br>
                    <label for="edit_user_phone">Teléfono:</label>
                    <input type="text" v-model="editedUser.phone" required><br>
                    <label for="edit_user_email">Email:</label>
                    <input type="text" v-model="editedUser.email" required><br>
                    <label for="edit_user_address">Dirección:</label>
                    <input type="text" v-model="editedUser.address" required><br>
                    <label for="edit_user_password">Contraseña:</label>
                    <input type="text" v-model="editedUser.password" required><br>


                    <button type="submit">Guardar</button>
                    <button type="button" @click="cancelEditUser">Cancelar</button>
                </form>
            </div>
        </div>
        <!-- ---------------------------MIEMBROS------------------------------------------- -->

        <button @click="getMembers" v-if="!members.length" class="gnrl-button">Ver miembros</button>
        <button @click="hideMembers" v-else class="gnrl-button">Ocultar Miembros</button>

        <table>
            <thead v-if="members.length">
                <tr>
                    <td>DNI</td>
                    <td>Cumpleaños</td>
                    <td>Cuenta Bancaria</td>
                </tr>
            </thead>
            <tr v-for="member in members" :key="member.dni_m">
                <td>{{ member.dni_m }}</td>
                <td>{{ member.birthday }}</td>
                <td>{{ member.bank_account }}</td>

                <td><button @click="editMember(member.dni_m)">Modificar</button></td>
                <td><button @click="deleteMember(member.dni_m)">Eliminar</button></td>
            </tr>
        </table>
        <div v-if="editingMember !== null" class="modal-overlay">
            <div class="modal-content">

                <form @submit.prevent="saveMemberEdition">
                    <h2>Editar Miembro</h2>
                    <label for="edit_member_dni">Dni:</label>
                    <input type="text" v-model="editedMember.dni_m" required><br>
                    <label for="edit_member_birthday">Cumpleaños:</label>
                    <input type="text" v-model="editedMember.birthday" required><br>
                    <label for="edit_member_bank_account">Cuenta Bancaria:</label>
                    <input type="text" v-model="editedMember.bank_account" required><br>

                    <button type="submit">Guardar</button>
                    <button type="button" @click="cancelEditMember">Cancelar</button>
                </form>
            </div>
        </div>
        <!-- ---------------------------EQUIPOS------------------------------------------- -->
        <button @click="getTeams" v-if="!teams.length" class="gnrl-button">Ver Equipos</button>
        <button @click="hideTeams" v-else class="gnrl-button">Ocultar Equipos</button>

        <table>
            <thead v-if="teams.length">
                <tr>
                    <td>ID</td>
                    <td>DNI jugador 1</td>
                    <td>DNI jugador 2</td>
                    <td>Jugador 1</td>
                    <td>Jugador 2</td>
                </tr>
            </thead>
            <tr v-for="team in teams" :key="team.id">
                <td>{{ team.id }}</td>
                <td>{{ team.player1_dni }}</td>
                <td>{{ team.player2_dni }}</td>
                <td>{{ team.player1_name }}</td>
                <td>{{ team.player2_name }}</td>

                <td><button @click="deleteTeam(team.id)">Eliminar</button></td>
            </tr>
        </table>
        <!-- ---------------------------COMENTARIOS------------------------------------------- -->
        <button @click="getCommentaries" v-if="!commentaries.length" class="gnrl-button">Ver Comentarios</button>
        <button @click="hideCommentaries" v-else class="gnrl-button">Ocultar Comentarios</button>

        <table>
            <thead v-if="commentaries.length">
                <tr>
                    <td>ID</td>
                    <td>Usuario</td>
                    <td>Email</td>
                    <td>Teléfono</td>
                    <td>Tema</td>
                    <td>Comentario</td>
                </tr>
            </thead>
            <tr v-for="commentary in commentaries" :key="commentary.id">
                <td>{{ commentary.id }}</td>
                <td>{{ commentary.user_name }}</td>
                <td>{{ commentary.email }}</td>
                <td>{{ commentary.phone }}</td>
                <td>{{ commentary.theme }}</td>
                <td>{{ commentary.text }}</td>

                <td><button @click="deleteCommentary(commentary.id)">Eliminar</button></td>
            </tr>
        </table>

        <!-- ---------------------------MATCHES------------------------------------------- -->
        <button @click="getMatches" v-if="!matches.length" class="gnrl-button">Ver Matches</button>
        <button @click="hideMatches" v-else class="gnrl-button">Ocultar Matches</button>

        <div v-if="matches.length" class="match-form-container">
            <form v-for="match in matches" :key="match.id" @submit.prevent="punctuateMatch(match)" class="match-form">
                <p>Match: {{ match.id }}</p>
                <div class="team-container">
                    <div>
                        <p>Equipo: {{ match.team1_id }}</p>
                        <input type="text" v-model.number="match.pointsTeam1" required>
                    </div>
                    <div>
                        <p>Equipo: {{ match.team2_id }}</p>
                        <input type="text" v-model.number="match.pointsTeam2" required>
                    </div>
                </div>
                <button class="btn-punctuate" type="submit">Puntuar</button>
            </form>
        </div>


    </div>

    <p>{{ errorMessage }}</p>

</template>


<script>

export default {
    name: 'AdminView',
    components: {

    },
    data() {
        return {
            existsToken: false,
            users: [],
            errorMessage: "",
            editingUser: null,
            editedUser: {
                dni: '',
                name: '',
                surname1: '',
                surname2: '',
                phone: '',
                email: '',
                address: '',
                password: ''
            },
            members: [],
            editingMember: null,
            editedMember: {
                dni_m: "",
                birthday: "",
                bank_account: ""
            },
            teams: [],
            commentaries: [],
            matches: [],
            pointsTeam1: null,
            pointsTeam2: null

        }
    },
    methods: {
        getUsers() {
            fetch('http://localhost/spicepadel_api/api.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.users = data;
                })
                .catch(error => {
                    this.errorMessage = "Failed to load users: " + error.message;
                });
        },
        getMembers() {
            fetch('http://localhost/spicepadel_api/getMembers.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.members = data;
                })
                .catch(error => {
                    this.errorMessage = "Failed to load users: " + error.message;
                });
        },
        getTeams() {
            fetch('http://localhost/spicepadel_api/getTeams.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.teams = data;
                })
                .catch(error => {
                    this.errorMessage = "Failed to load teams: " + error.message;
                });
        },
        getCommentaries() {
            fetch('http://localhost/spicepadel_api/getCommentaries.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.commentaries = data;
                })
                .catch(error => {
                    this.errorMessage = "Failed to load commentaries: " + error.message;
                });
        },
        getMatches() {
            fetch('http://localhost/spicepadel_api/getMatches.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.matches = data.map(match => ({
                        ...match,
                        pointsTeam1: 0,
                        pointsTeam2: 0
                    }));
                })
                .catch(error => {
                    this.errorMessage = "Failed to load matches: " + error.message;
                });
        },

        editUser(user_dni) {
            const user = this.users.find(u => u.dni === user_dni);
            if (user) {
                this.editingUser = user_dni;
                this.editedUser = { ...user };
            } else {
                this.errorMessage = "No se encontró el usuario.";
            }
        },
        editMember(dni_m) {
            const member = this.members.find(m => m.dni_m === dni_m)
            if (member) {
                this.editingMember = dni_m
                this.editedMember = { ...member }
            } else {
                this.errorMessage = "No se encontró el miembro"
            }
        },

        cancelEditUser() {
            this.editingUser = null;
            this.editedUser = {
                dni: '',
                name: '',
                surname1: '',
                surname2: '',
                phone: '',
                email: '',
                address: '',
                password: ''
            };
        },
        cancelEditMember() {
            this.editingMember = null
            this.editedMember = {
                dni_m: "",
                birthday: "",
                bank_account: ""
            }
        },
        async saveUserEdition() {
            try {
                const response = await fetch('http://localhost/spicepadel_api/modifyUser.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.editedUser)
                });
                const data = await response.json();
                if (data.success) {
                    this.errorMessage = data.message;
                    this.cancelEditUser(); // Limpia el formulario y cierra el modal
                    this.getUsers(); // Recarga la lista de usuarios
                } else {
                    this.errorMessage = data.message;
                }
            } catch (error) {
                this.errorMessage = "Error de conexión con el servidor al modificar usuario, error: " + error.message;
            }

        },
        async saveMemberEdition() {
            try {
                const response = await fetch('http://localhost/spicepadel_api/modifyMember.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.editedMember)
                });
                const data = await response.json();
                if (data.success) {
                    this.errorMessage = data.message;
                    this.cancelEditMember(); // Limpia el formulario y cierra el modal
                    this.getMembers(); // Recarga la lista de miembros
                } else {
                    this.errorMessage = data.message;
                }
            } catch (error) {
                this.errorMessage = "Error de conexión con el servidor al modificar miembro, error: " + error.message;
            }

        },

        async deleteUser(user_dni) {
            if (confirm(`Seguro que deseas eliminar el usuario con dni ${user_dni} ?`)) {
                try {
                    const response = await fetch('http://localhost/spicepadel_api/deleteUser.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_dni })
                    });
                    const data = await response.json();
                    if (data.success) {
                        this.errorMessage = data.message;
                        this.cancelEditUser(); // Limpia el formulario y cierra el modal
                        this.getUsers(); // Recarga la lista de usuarios
                    } else {
                        this.errorMessage = data.message;
                    }
                } catch (error) {
                    this.errorMessage = "Error de conexión con el servidor al eliminar usuario, error: " + error.message;
                }
            }
        },
        async deleteMember(dni_m) {
            if (confirm(`Seguro que deseas eliminar el miembro con dni ${dni_m} ?`)) {
                try {
                    const response = await fetch('http://localhost/spicepadel_api/deleteMember.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ dni_m })
                    });
                    const data = await response.json();
                    if (data.success) {
                        this.errorMessage = data.message;
                        this.cancelEditMember(); // Limpia el formulario y cierra el modal
                        this.getMembers(); // Recarga la lista de miembros
                    } else {
                        this.errorMessage = data.message;
                    }
                } catch (error) {
                    this.errorMessage = "Error de conexión con el servidor al eliminar miembro, error: " + error.message;
                }
            }
        },
        async deleteTeam(team_id) {
            if (confirm(`Seguro que deseas eliminar el equipo con id ${team_id} ?`)) {
                try {
                    const response = await fetch('http://localhost/spicepadel_api/deleteTeam.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ team_id })
                    });
                    const data = await response.json();
                    if (data.success) {
                        this.errorMessage = data.message;
                        this.getTeams(); // Recarga la lista de miembros
                    } else {
                        this.errorMessage = data.message;
                    }
                } catch (error) {
                    this.errorMessage = "Error de conexión con el servidor al eliminar team, error: " + error.message;
                }
            }
        },
        async deleteCommentary(com_id) {
            if (confirm(`Seguro que deseas eliminar el comentario con id ${com_id} ?`)) {
                try {
                    const response = await fetch('http://localhost/spicepadel_api/deleteCommentary.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ com_id })
                    });
                    const data = await response.json();
                    if (data.success) {
                        this.errorMessage = data.message;
                        this.getCommentaries(); // Recarga la lista de comentarios
                    } else {
                        this.errorMessage = data.message;
                    }
                } catch (error) {
                    this.errorMessage = "Error de conexión con el servidor al eliminar comentario, error: " + error.message;
                }
            }
        },
        async punctuateMatch(match) {
            const payload = {
                match_id: match.id,
                pointsTeam1: match.pointsTeam1,
                pointsTeam2: match.pointsTeam2
            };

            try {
                const response = await fetch('http://localhost/spicepadel_api/postMatchResults.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json(); 
                console.log('Success:', data);

                this.getMatches();
            } catch (error) {
                console.error('Error posting match results:', error);
            }
        },

        hideUsers() {
            this.users = []
        },
        hideMembers() {
            this.members = []
        },
        hideTeams() {
            this.teams = []
        },
        hideCommentaries() {
            this.commentaries = []
        },
        hideMatches() {
            this.matches = []
        },
        checkIfAdmin() {
            const spiceTokenString = localStorage.getItem('spicetoken')
            const spiceToken = JSON.parse(spiceTokenString)
            if (spiceToken.admin == false) {
                this.$router.push('/')
            }
        },
        checkToken() {
            this.existsToken = localStorage.getItem('spicetoken') !== null
        },

    },

    created() {
        this.checkToken() // COmprueba que exista token
        if (this.existsToken) {
            this.checkIfAdmin()
        } else {
            this.$router.push('/')
        }


    }
}
</script>


<style scoped>
h1 {
    text-align: center;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;

}

button:hover {
    background-color: #555;
}

.general-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
    /* Asegura que el contenedor general no sea más ancho que la pantalla */
    overflow-x: auto;
    /* Permite desplazamiento horizontal si el contenido excede el ancho de la pantalla */
}

table {
    min-width: 1000px;
    /* Asegura un ancho mínimo para la tabla, ajusta según tus necesidades */
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

thead {
    font-weight: bold;
}

th,
td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    text-align: left;
    white-space: nowrap;
    /* Asegura que el contenido de cada celda no se envuelva, ajusta según necesidades */
}

button {
    width: 100px;
    padding: 5px;
    font-size: 14px;
}
.gnrl-button{
    width: 30%;
    height: 60px;
    padding: 5px;
    font-size: 18px;
}

td:nth-last-child(-n+2) {
    width: 110px;
}

tbody tr:nth-child(odd) {
    background-color: #a7a7a7;
}

tbody tr:hover {
    background-color: #f1f1f1;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    width: 90%;
    max-width: 500px;
}

.blur {
    filter: blur(5px);
    pointer-events: none;
}

.modal-content form {
    display: flex;
    flex-direction: column;
}

.modal-content form label {
    font-weight: bold;
}

.modal-content form input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.modal-content form button {
    margin: 20px;
}

.team-container {
    display: flex;
    /* border: 1px solid #333; */
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 999px;
    box-sizing: border-box;
}

.match-form {
    /* border: 1px solid #333; */
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.match-form p:first-child {
    text-align: center;
}

.btn-punctuate {
    width: 100%;
}

.match-form-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>