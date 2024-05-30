<template>
  <NavCmp />
  <div class="info">
    <div class="container">
      <div class="title">
        <h1>Hola, {{ user_name }}</h1>
        <p>Bienvenido a tu panel de usuario. Aquí puedes ver tus torneos, información de tu cuenta y reservas de pistas.</p>
      </div>
      <div class="components">
        <div class="component-wrapper">
          <h2>Tus Torneos</h2>
          <AccountTorneosCmp class="list"></AccountTorneosCmp>
        </div>
        <div class="component-wrapper">
          <h2>Tarjeta del Club</h2>
          <AccountCardCmp class="card"></AccountCardCmp>
        </div>
        <div class="component-wrapper">
          <h2>Tus reservas</h2>
          <AccountMatchReservaCmp class="list"></AccountMatchReservaCmp>
        </div>
      </div>
    </div>
  </div>
  <FooterCmp/>
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
                    "https://localhost/spicepadel_api/api/getName.php",
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
* {
  box-sizing: border-box;
}

.container {
  height: fit-content;
  padding: 2rem;
  background-image: url("@/assets/ImgMyAccount.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  filter: brightness(0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  background-color: rgba(255, 255, 255, 0.6);
  padding: 2rem;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  margin-bottom: 2rem;
}

h1 {
  margin: 0;
  color: #fc0;
  font-size: 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.title p {
  font-size: 18px;
  color: #333;
  margin-top: 1rem;
}

.components {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  width: fit-content;
}

.component-wrapper {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  width: 30%;
  margin: 1rem;
  text-align: center;
  color: black;
}

.component-wrapper h2 {
  color: black;
  margin-bottom: 1rem;
}

.card,
.list {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

@media (max-width: 1100px) {
  .container {
    padding: 1rem;
  }

  .title {
    width: 100%;
    padding: 1rem;
  }

  .components {
    flex-direction: column;
    align-items: center;
  }

  .component-wrapper {
    width: 90%;
  }

  .footer {
    display: none;
  }
}
</style>
