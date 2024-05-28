<template>
  <NavCmp></NavCmp>
  <div class="info">
      <div class="container">
          <div>
              <div class="title">
                  <h1>Hola, {{ user_name }} 👋</h1>
                </div>
                <div class="components">
                    <AccountCardCmp class="card"></AccountCardCmp>
                    <AccountTorneosCmp class="list"></AccountTorneosCmp>
                    <AccountMatchReservaCmp class="list"></AccountMatchReservaCmp>
                </div>
            </div>
        </div>
    </div>
  <FooterCmp class="footer" />
</template>

<script>
import NavCmp from "./NavCmp.vue";
import AccountCardCmp from "./AccountCardCmp.vue";
import AccountTorneosCmp from "./AccountTorneosCmp.vue";
import AccountMatchReservaCmp from "./AccountMatchReservaCmp";
import FooterCmp from "./FooterCmp.vue";

export default {
    name: "MyAccountCmp",
    components: {
        NavCmp,
        AccountCardCmp,
        FooterCmp,
        AccountTorneosCmp,
        AccountMatchReservaCmp,
  },
  data() {
      return {
          usuMail: "",
          user_name: "",
        };
    },
    methods: {
        obtainEmail() {
            const spiceTokenString = localStorage.getItem("spicetoken");
            const spiceToken = JSON.parse(spiceTokenString);
            this.usuMail = spiceToken.user_mail;
        },
        async obtainName() {
            try {
                const response = await fetch(
                    "http://localhost/spicepadel_api/api/getName.php",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user_email: this.usuMail,
                        }),
                    }
                    );
                    const data = await response.json();
                    this.user_name = data.user_name;
                } catch (error) {
                    console.log("Error al conectar con la api: " + error);
                }
            },
  },
  mounted() {
    this.obtainEmail();
    this.obtainName();
},
};
</script>

<style scoped>

.container {
  min-height: 90vh; /* Asegura que el contenedor ocupe al menos la altura de la ventana */
  height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la pantalla */
  padding: 1rem;
  background-image: url("../assets/ImgMyAccount.webp");
  background-repeat: no-repeat;
  background-size: cover; 
  background-position: center; 
  position: relative;
  filter: brightness(1.1); /* Aumenta el brillo de la imagen */

}

h1 {
  margin: 0; /* Elimina márgenes para mejor centrado */
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5); /* Blanco con 50% de opacidad */
  padding: 2rem;
  border-radius: 30px;
  width: 60vh;
  height: 10px;
  text-align: center;
  position: relative;
}

.components {
  display: flex;
  margin-left: -50px;
  justify-content: space-evenly;
  align-items: center;
  margin-top:90px;
}

.card {
  justify-content: left;
  margin: 10px;
  align-items: center;
  align-self:start;

}

.list {
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  margin-left: 120px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.7);
}

.footer {
  position: absolute;
  /* bottom: 0; */
}

@media (max-width: 1100px) {
  .container {
    flex-direction: column;
    margin: 0;
    padding: 0;
    margin: auto;
    background-image: none;
  }
  .components{
    flex-direction: column;
    margin: 0;
    
  }
  .footer{
    display: none;
  }
  .title{
    width: 300px;
    margin: auto;
  }
  .title h1{
    font-size: 18px;
  }
  .card{
    margin: 50px auto;
    padding: 0;
  }
  .list{
    margin: 50px auto;
    padding: 0;
  }
  
}
</style>
