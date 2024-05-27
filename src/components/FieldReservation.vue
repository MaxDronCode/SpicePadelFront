<template>
    <NavCmp/>
    <div>
      <h2>Reserva Pista {{ fieldId }}</h2>
      <vue-cal
        style="height: 40rem; width: 100%"
        locale="es"
        :events="events"
        :time-from="8 * 60"
        :time-to="19 * 60"
        :time-step="60"
        :disable-views="['years', 'months']"
        @cell-focus="selectedDate = $event.date || $event"
        xsmall
      />
      <form @submit.prevent="submitReservation">
        <div>
          <label for="date" class="lab">Fecha: </label><br>
          <input type="date" v-model="reservation.date" required class="inp-date" />
        </div>
        <div>
          <label for="start_hour" class="lab">Hora de inicio: </label><br>
          <input type="time" v-model="reservation.start_hour" required class="inp-time">
        </div>
        <button type="submit">Reservar</button>
      </form>
      <button @click="$emit('clearSelection')">Cambiar pista</button>
      <div v-if="message">{{ message }}</div>
    </div>
    <FooterCmp/>
  </template>
  
  <script>
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  import axios from 'axios';
  import NavCmp from '@/components/NavCmp.vue';
  import FooterCmp from './FooterCmp.vue';
  
  export default {
    name: 'FieldReservation',
    components: {
      VueCal,
      NavCmp,
      FooterCmp
    },
    props: {
      fieldId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        reservation: {
          date: '',
          start_hour: '',
          member_id: ''
        },
        events: [],
        message: '',
        selectedDate: new Date()
      };
    },
    created() {
      this.checkToken();
      this.fetchBookings();
    },
    methods: {
      async submitReservation() {
        if (!this.reservation.date || !this.reservation.start_hour || !this.reservation.member_id || !this.fieldId) {
          this.message = 'Todos los campos son requeridos';
          return;
        }
  
        const startHour = this.reservation.start_hour;
        const endHour = this.calculateEndHour(startHour);
  
        try {
          const response = await fetch('http://localhost/spicepadel_api/api/reserve.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              date: this.reservation.date,
              start_hour: startHour,
              end_hour: endHour,
              member_id: this.reservation.member_id,
              field_id: this.fieldId
            })
          });
          const result = await response.json();
          if (result.success) {
            this.message = 'Reserva realizada con éxito';
            this.fetchBookings();
          } else {
            this.message = 'Error al realizar la reserva: ' + result.message;
          }
        } catch (error) {
          this.message = 'Error al conectar con el servidor';
        }
      },
      calculateEndHour(startHour) {
        const [hours, minutes] = startHour.split(':').map(Number);
        const endHour = new Date();
        endHour.setHours(hours + 2);
        endHour.setMinutes(minutes);
        return `${endHour.getHours().toString().padStart(2, '0')}:${endHour.getMinutes().toString().padStart(2, '0')}`;
      },
      checkToken() {
        const spiceTokenString = localStorage.getItem('spicetoken');
        if (spiceTokenString) {
          const spiceToken = JSON.parse(spiceTokenString);
          this.reservation.member_id = spiceToken.user_mail;
        }
      },
      async fetchBookings() {
        try {
          const response = await axios.get(`http://localhost/spicepadel_api/api/getBookings.php?field_id=${this.fieldId}`);
          this.events = response.data.map(booking => ({
            start: `${booking.date}T${booking.start_hour}`,
          end: `${booking.date}T${booking.end_hour}`,
          title: 'Reservado',
          content: 'Reservado',
          class: 'booked'
        }));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }
  }
};
</script>

<style scoped>
@import "vue-cal/dist/vuecal.css";

.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #42b983;
}

.vuecal__title-bar {
  background-color: #e4f5ef;
}

.vuecal__cell--today,
.vuecal__cell--current {
  background-color: rgba(240, 240, 255, 0.4);
}

.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: rgba(235, 255, 245, 0.4);
}

.vuecal__cell--selected:before {
  border-color: rgba(66, 185, 131, 0.5);
}

.lab {
  margin-bottom: 15px; /* Ajusta este valor si necesitas más espacio */
}

.inp-date, input[type="time"] {
  background-color: #f0f0f0; /* Color de fondo */
  border: none; /* Sin bordes */
  border-radius: 8px; /* Bordes redondeados */
  padding: 12px 20px; /* Espaciado interno */
  font-size: 16px; /* Tamaño del texto */
  color: #333; /* Color del texto */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Sombra ligera */
  transition: box-shadow 0.3s ease-in-out; /* Transición suave de la sombra */
  display: block; /* Asegura que el input ocupe toda la línea */
  width: calc(100% - 24px); /* Ajusta el ancho para tener en cuenta el padding */
  margin-bottom: 20px; /* Espacio debajo de cada input */
}

input[type="date"]:focus, input[type="time"]:focus {
  outline: none; /* Eliminar el contorno predeterminado */
  box-shadow: 0 0 10px rgba(30, 144, 255, 0.8); /* Sombra más destacada al enfocar */
}

button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
  margin-top: 30px;
}

button:hover {
  background-color: #555;
}
</style>

  