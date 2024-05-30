<template>
  <div class="card">
    <p class="title">Pistas Reservadas</p>
    <ul class="lists">
      <li class="list">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clip-rule="evenodd" fill-rule="evenodd"></path>
          </g>
        </svg>
        <p v-if="field_id==''">Campo de reserva: N/A</p> <p v-else>Campo de reserva: {{ field_id }}</p>
      </li>
      <li class="list">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clip-rule="evenodd" fill-rule="evenodd"></path>
          </g>
        </svg>
        <p v-if="startHour==''">Hora de inicio: N/A</p> <p v-else>Hora de inicio: {{ startHour }}</p>
      </li>
      <li class="list">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clip-rule="evenodd" fill-rule="evenodd"></path>
          </g>
        </svg>
        <p v-if="end_hour==''">Hora de fin: N/A</p> <p v-else>Hora de fin: {{ end_hour }}</p>
      </li>
      <li class="list">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clip-rule="evenodd" fill-rule="evenodd"></path>
          </g>
        </svg>
        <p v-if="date==''">Fecha: N/A</p> <p v-else>Fecha: {{ date }}</p>
      </li>
    </ul>
    <router-link to='/reserve' class="action">Reservar pista</router-link>
  </div>
</template>

<script>
export default {
    name: 'AccountMatchReservaCmp',
    data() {
        return {
            usuMail: "",
            startHour: "",
            end_hour: "",
            field_id: "",
            date: "",
        };
    },
    methods: {
        async obtainEmail() {
            const spiceTokenString = localStorage.getItem('spicetoken');
            const spiceToken = JSON.parse(spiceTokenString);
            this.usuMail = spiceToken.user_mail;
        },
        async obtainEnterHour() {
            // console.log("Enviamos a la api de reserva de pista: ", this.usuMail);
            const response = await fetch('http://localhost/spicepadel_api/api/getUserBookings.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'user_mail': this.usuMail
                })
            });
            const data = await response.json();
            // console.log("data "+ data);
            this.startHour = data.start_hour;
            this.end_hour = data.end_hour;
            this.field_id = data.field_id;
            this.date = data.date;
            // console.log("la api de reservas de partidos nos devuelve " + this.field_id + " " + this.end_hour + " " + this.startHour);
        }
    },
    mounted() {
        this.obtainEmail();
        this.obtainEnterHour();
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

.icon {
  fill: black;
  stroke: black;
}

.list span {
  margin-left: 1rem;
}

.ghost-shadow {
  height: 1rem;
  width: 1rem;
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
