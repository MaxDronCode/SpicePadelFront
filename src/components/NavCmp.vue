<template>
<nav>
    <div class="nav-container">
      <div class="logo">
        <!-- <router-link to="/">Logo</router-link> -->
        <router-link to="/"><img :src=logo alt="Logo"></router-link>
      </div>
      <div class="nav-main-routes">
      <ul class="nav-main-ul" :class="{ 'nav-active': isNavActive }">
        <li><router-link to="/">Home</router-link></li>
        <li><a>Club</a></li>
        <li><a>Calendario</a></li>
        <li><router-link to="/tournaments">Torneos</router-link></li>
        <li><a>Contacto</a></li>
        <li v-if="!existsToken"><router-link to="/login" class="nav-login-li">Login</router-link></li>
        <li v-else><router-link to="/logout" class="nav-login-li">Logout</router-link></li>
        <li v-if="existsToken"><router-link to="myAccount" class="nav-login-li">Mi Cuenta</router-link></li>
      </ul>
      </div>
      <div class="hamburger" @click="toggleNav">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '@/assets/LogoSpiceGirls.png';

export default {
    name: "NavCmp",
    data() {
        return {
            isNavActive : false,
            existsToken : false,
            logo : Logo
        }
    },
    methods: {
        toggleNav() {
            this.isNavActive = !this.isNavActive
        },
        checkToken() {
            this.existsToken = localStorage.getItem('spicetoken') !== null
        }
    },
    created(){
        this.checkToken() // COmprueba que exista token
    },
    watch: {
        '$route'() { // Observar cambios en la ruta
            this.checkToken();
        }
    }
    
}
</script>

<style scoped>

nav {
  background-color: #333;
  padding: 0 20px;
}


.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo a {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
}

ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

.nav-main-ul {
  margin: 0;
  display: flex;
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

a {
  text-decoration: none;
  color: #fff;

}

.nav-login-ul {
  display: flex;
}

.nav-login-li {
  padding: 0 10px;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger span {
  height: 3px;
  width: 25px;
  background-color: #fff;
  margin: 4px;
  border-radius: 2px;
}
img{
  width: 100px;
  height: auto;
  margin-left:-30px;
}

@media (max-width: 768px) {
  .nav-main-ul {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #333;
    display: none;
    
  }
  

  .nav-main-ul.nav-active {
    display: flex;
  }

  .nav-login-ul {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  li {
    text-align: center;
    width: 100%;
    margin: 0;
  }
}
</style>
