<template>
  <div class="card">
    <p class="title">Partidos de Torneo</p>
    <ul class="lists">
      <li class="list">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clip-rule="evenodd" fill-rule="evenodd"></path>
          </g>
        </svg>
        <p v-if="player2_name==''">No hay equipo creado</p> <p v-else>Compañero: {{ player2_name }}</p>
      </li>
      <li class="list">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clip-rule="evenodd" fill-rule="evenodd"></path>
          </g>
        </svg>
        <p v-if="field==''">No hay pista asignada</p> <p v-else>Pista: {{ field }}</p>
      </li>
      <li class="list">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clip-rule="evenodd" fill-rule="evenodd"></path>
          </g>
        </svg>
        <p v-if="time==''">No hay horario para el partido</p> <p v-else>Hora: {{ time }}</p>
      </li>
      <li class="list">
        <div class="ghost-shadow"></div>
        <p></p>
      </li>
    </ul>
    <router-link to='/tournaments' class="action">Torneos</router-link>
  </div>
</template>

<script>
export default {
    name: 'AccountTorneosCmp',
    data() {
        return {
            usuMail: "",
            dni_player: "",
            field: "",
            time: "",
            idMatch: "",
            player2_name: "",
        };
    },
    methods: {
        async obtainEmail() {
            const spiceTokenString = localStorage.getItem('spicetoken');
            const spiceToken = JSON.parse(spiceTokenString);
            this.usuMail = spiceToken.user_mail;
        },
        async obtainName() {
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/getName.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        'user_email': this.usuMail
                    })
                });
                const data = await response.json();
                this.dni_player = data.dni;
            } catch (error) {
                console.log("Error al conectar con la api: " + error);
            }
        },
        async obtainInfoMatch() {
            try {
                const response = await fetch('http://localhost/spicepadel_api/api/getUserTournaments.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        'dni': this.dni_player
                    })
                });
                const data = await response.json();
                if (data.success) {
                    this.time = data.time;
                    this.field = data.field;
                    this.idMatch = data.id;
                    this.player2_name = data.player2_name;
                } else {
                    console.log("La api de torneos no devuelve nada");
                }
            } catch (error) {
                console.log("Error al conectar con la api: " + error);
            }
        },
    },
    async mounted() {
        await this.obtainEmail();
        await this.obtainName();
        await this.obtainInfoMatch();
    }
};
</script>

<style scoped>
.card {
  width: 320px;
  display: flex;
  flex-direction: column;
  border-radius: 1.5rem;
  background-color: #333333;
  padding: 1rem;
  justify-content: center;
}

.title {
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  color: black;
}

.lists {
  display: flex;
  flex-direction: column;
  grid-row-gap: 0.75rem;
  row-gap: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: black;
}

.list {
  display: flex;
  align-items: center;
}

.list svg {
  height: 1rem;
  width: 1rem;
  margin-right: 10px;
}

.list span {
  margin-left: 1rem;
}

.ghost-shadow {
  height: 1rem;
  width: 1rem;
}

.icon {
  fill: black;
  stroke: black;
}

.action {
  margin-top: 2rem;
  width: 80%;
  border: 2px solid rgba(255, 255, 255, 1);
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 1);
  padding: 0.625rem 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(0, 0, 0, 1);
  outline: none;
  transition: all 0.2s ease;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 10px;
}

.action:hover {
  color: rgba(255, 255, 255, 1);
  background-color: #fc0;
  text-decoration: none;
  text-shadow: 0 0 2.5px #333333, 0 0 5px #333333, 0 0 10px #333333;
}
</style>
