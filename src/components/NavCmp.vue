<template>
<nav>
    <div class="nav-container">
      <div class="logo">
        <!-- <router-link to="/">Logo</router-link> -->
        <router-link to="/"><img :src=logo alt="Logo"></router-link>
      </div>
      <div class="nav-main-routes">
      <ul class="nav-main-ul" :class="{ 'nav-active': isNavActive }">
        <li><router-link to="/" class="nav-login-li">Home</router-link></li>
        <li><router-link to="/club" class="nav-login-li">Club</router-link></li>
        <li v-if="existsToken" class="nav-login-li"><router-link to="/reserve">Reservar</router-link></li>
        <li><router-link to="/class" class="nav-login-li">Clases</router-link></li>
        <li><router-link to="/tournaments" class="nav-login-li">Torneos</router-link></li>
        <li><router-link to="/contact" class="nav-login-li" >Contacto</router-link></li>
        <li v-if="!existsToken"><router-link to="/login" class="nav-login-li">Login</router-link></li>
        <li v-else><router-link to="/logout" class="nav-login-li">Logout</router-link></li>
        <li v-if="existsToken"><router-link to="/myAccount" class="nav-login-li">Mi Cuenta</router-link></li>
        <li v-if="admin" class="nav-login-li"><router-link to="/adminView">ADMINISTRAR</router-link></li>
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
            logo : Logo,
            admin: false
        }
    },
    methods: {
        toggleNav() {
            this.isNavActive = !this.isNavActive
        },
        checkToken() {
            this.existsToken = localStorage.getItem('spicetoken') !== null
        },
        checkAdmin(){
          const spicetokenString = localStorage.getItem('spicetoken')
          const spicetoken = JSON.parse(spicetokenString)
          this.admin = spicetoken.admin
        }
    },
    created(){
        this.checkToken() // COmprueba que exista token
        if (this.existsToken){

          this.checkAdmin()
        }

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
  padding: 10px 30px;
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
  background-color: #fc0
}

a {
  text-decoration: none;
  color: #fff;

}

.nav-login-ul {
  display: flex;
}

.nav-login-li {
  /* padding: 0 10px; */
  /* color: #333;  */
  text-shadow: 0 0 6px #ffeb3b; /* Sombra de texto con brillo */
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

@media (max-width: 1200px) {
  .nav-main-ul {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #333;
    display: none;
    z-index: 10;
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
