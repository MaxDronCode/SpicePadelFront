<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><a>Club</a></li>
            <li><a>Calendario</a></li>
            <li><a>Torneo</a></li>
            <li><a>Contacto</a></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "NavCmp"
}
</script>

<style scoped>

nav {
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
}

ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
}

li {
    position: relative;
    padding: 15px 20px;
    margin: 0 10px;
    cursor: pointer;
    color: #fff;
    transition: background-color 0.3s ease;
}

li::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #fff;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

li:hover {
    background-color: #555;
}

li:hover::before {
    transform: scaleX(1);
}
a{
    text-decoration: none;
    color: #fff;
}
</style>
