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
                <td>{{user.email}}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.password }}</td>
                <td><button>Modificar</button></td>
                <td><button>Eliminar</button></td>
            </tr>
        </table>
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
    width: 100%; /* Asegura que el contenedor general no sea más ancho que la pantalla */
    overflow-x: auto; /* Permite desplazamiento horizontal si el contenido excede el ancho de la pantalla */
}

table {
    min-width: 1000px; /* Asegura un ancho mínimo para la tabla, ajusta según tus necesidades */
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

th, td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    text-align: left;
    white-space: nowrap; /* Asegura que el contenido de cada celda no se envuelva, ajusta según necesidades */
}
button {
    width: 100px; /* Reduce el ancho de los botones para ahorrar espacio */
    padding: 5px;
    font-size: 14px; /* Ajusta el tamaño del texto para que sea coherente con el espacio más pequeño */
}
td:nth-last-child(-n+2) {
    width: 110px; /* Asegura que las celdas de los botones tengan un ancho fijo */
}

tbody tr:nth-child(odd) {
    background-color: #f9f9f9; /* Zebra striping for rows */
}

tbody tr:hover {
    background-color: #f1f1f1; /* Light grey background on row hover */
}

</style>