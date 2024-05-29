<template>
    <NavCmp />
    <div class="logout-container">
        <h1>Logout</h1>
        <form @submit.prevent="logout">
            <button class="shadow__btn">
                Cerrar sesión
            </button>
        </form>
    </div>
    <FooterCmp/>
</template>

<script>
import NavCmp from './NavCmp.vue';
import FooterCmp from './FooterCmp.vue';

export default {
    name: 'LogoutCmp',
    components: {
        NavCmp,
        FooterCmp
    },
    methods: {
        logout() {
            if (confirm("Se va a cerrar sesión. Confirma.")) {
                localStorage.removeItem("spicetoken");
                this.$router.push('/');
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.logout-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/bye.webp');
    background-size: cover;
    background-position: center;
    height: 100VH;
}

.logout-content {
    text-align: center;
    padding: 40px;
    animation: fadeIn 1s ease-in-out;
}

h1 {
    color: #ffeb3b;
    margin-bottom: 20px;
    font-size: 60px;
    animation: slideIn 0.5s ease-in-out;
}



.shadow__btn {
    padding: 10px 20px;
    border: none;
    font-size: 17px;
    color: black;
    border-radius: 7px;
    letter-spacing: 4px;
    font-weight: 700;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow;
    width: 10rem;
}

.shadow__btn {
    background: #ffeb3b;
    box-shadow: 0 0 25px #ffeb3b;
}

.shadow__btn:hover {
    box-shadow: 0 0 5px #ffeb3b,
        0 0 25px #ffeb3b,
        0 0 50px #ffeb3b,
        0 0 100px #ffeb3b;
}
</style>