<template>
    <h1>Admin View</h1>
    <p>{{ errorMessage }}</p>
    <div class="general-container">
        <button @click="getUsers">Ver Usuarios</button>
        <table>
            <thead>
                <tr>

                    <td>DNI</td>
                    <td>Nombre</td>
                    <td>Apellido</td>
                    <td>Apellido2</td>
                    <td>Telefono</td>
                    <td>Mail</td>
                    <td>Direccion</td>
                    <td>Contraseña</td>
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
                <td><button>Eliminar</button></td>
            </tr>
        </table>
        <div v-if="editingUser !== null" class="modal-overlay">
            <div class="modal-content">
                
                <form @submit.prevent="saveEdition">
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
            }
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
        editUser(user_dni) {
            const user = this.users.find(u => u.dni === user_dni);
            if (user) {
                this.editingUser = user_dni;
                this.editedUser = { ...user };
            } else {
                this.errorMessage = "No se encontró el usuario.";
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
        async saveEdition() {
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

        }

    }
}
</script>


<style scoped>
h1 {
    text-align: center;
}

button {
    width: 200px;
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
    /* Reduce el ancho de los botones para ahorrar espacio */
    padding: 5px;
    font-size: 14px;
    /* Ajusta el tamaño del texto para que sea coherente con el espacio más pequeño */
}

td:nth-last-child(-n+2) {
    width: 110px;
    /* Asegura que las celdas de los botones tengan un ancho fijo */
}

tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
    /* Zebra striping for rows */
}

tbody tr:hover {
    background-color: #f1f1f1;
    /* Light grey background on row hover */
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
</style>