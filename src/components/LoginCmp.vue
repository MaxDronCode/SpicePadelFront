<template>
    <NavCmp/>
    <h1>Login</h1>
    <form action="" method="get">
        <label for="dni">DNI/NIF: </label>
        <input type="text" name="dni" id="dni"><br>
        <label for="password">Contraseña: </label>
        <input type="text" name="password" id="password"><br>
        <button type="submit">Iniciar Sesión</button>
        <router-link to="/register" class="register-link">Inscríbete</router-link>
    </form>

</template>

<script>
import NavCmp from '@/components/NavCmp.vue'

export default {
    name: "LoginCmp",
    components: {
        NavCmp
    }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
*{
    font-family: "Montserrat", sans-serif;
}
body{
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

form{
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    margin: auto;
}
h1{
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}
label{
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: bold;
}
input[type="text"], input[type="password"]{
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 999px;
    box-sizing: border-box;
}
button{
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
button:hover{
    background-color: #555;
}
.register-link{
    display: block;
    margin-top: 20px;
    color: #333;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
    width: min-content;
}
.register-link:hover{
    color: #09f;
}

</style>