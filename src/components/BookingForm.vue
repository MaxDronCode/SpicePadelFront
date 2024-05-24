<template>
  <NavCmp/>
  <div v-if="existsToken" id="bookingForm">
    <h1>Reservar Pista</h1>
    <div v-if="!selectedFieldId">
      <label for="field_id">Selecciona una pista: </label>
      <select v-model="selectedFieldId" @change="loadAvailability" required>
        <option v-for="field in availableFields" :key="field.id" :value="field.id">
          {{ field.name }}
        </option>
      </select>
    </div>
    <div v-else>
      <h2>Calendario</h2>
      <h2>Pista {{ selectedFieldId }}</h2>
      <vue-cal 
        style="height: 40rem" 
        locale="es" 
        :events="events"
        :time-from="8 * 60"
        :time-to="19 * 60"
        :time-step="60"
        :disable-views="['years', 'months']"
        @cell-focus="selectedDate = $event.date || $event"
      />
      <h2>Reserva</h2><p>Te recomendamos con 1 día de antelación</p>
      <form @submit.prevent="submitReservation">
        <div>
          <label for="date">Fecha: </label>
          <input type="date" v-model="reservation.date" @change="loadAvailability" required>
        </div>
        <div>
          <label for="start_hour">Hora de inicio: </label>
          <input type="time" v-model="reservation.start_hour" required>
        </div>
        <button type="submit">Reservar</button>
      </form>
      <button @click="clearSelection">Cambiar pista</button>
    </div>
    <div v-if="message">{{ message }}</div>
  </div>
  <FooterCmp/>
</template>


<script>
import NavCmp from '@/components/NavCmp.vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import FooterCmp from './FooterCmp.vue';
import axios from 'axios';

export default {
  name: 'BookingForm',
  components: {
    VueCal,
    NavCmp,
    FooterCmp
  },
  data() {
    return {
      reservation: {
        date: '',
        start_hour: '',
        member_id: ''
      },
      availableFields: [],
      selectedFieldId: null,
      selectedFieldName: '',
      message: '',
      existsToken: false,
      events: [],
      selectedDate: new Date()
    };
  },
  created() {
    this.checkToken();
    this.loadAvailableFields();
    this.fetchBookings();
  },
  
  methods: {
    async submitReservation() {
      if (!this.reservation.date || !this.reservation.start_hour || !this.reservation.member_id || !this.selectedFieldId) {
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
            field_id: this.selectedFieldId 
          })
        });
        const result = await response.json();
        if (result.success) {
          this.message = 'Reserva realizada con éxito';
          await this.loadAvailability();
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
        this.existsToken = true;
      }
    },
    async loadAvailableFields() {
      try {
        const response = await fetch('http://localhost/spicepadel_api/api/getFields.php');
        const data = await response.json();
        this.availableFields = data;
      } catch (error) {
        this.message = "Error en la conexión con el servidor";
      }
    },
    async loadAvailability() {
      if (!this.selectedFieldId || !this.reservation.date) return;

      const selectedField = this.availableFields.find(field => field.id === this.selectedFieldId);
      if (selectedField) {
        this.selectedFieldName = selectedField.name;
      }

      try {
        const response = await fetch(`http://localhost/spicepadel_api/api/getAvailableFields.php?id=${this.selectedFieldId}&date=${this.reservation.date}`);
        const data = await response.json();
        this.events = data.map(booking => ({
          start: `${this.reservation.date}T${booking.start_hour}`,
          end: `${this.reservation.date}T${booking.end_hour}`,
          title: 'Reservado',
          content: 'Reservado',
          class: 'booked'
        }));
      } catch (error) {
        console.error("Error loading availability:", error);
      }
    },
    async fetchBookings() {
      try {
        const response = await axios.get('http://localhost/spicepadel_api/api/getBookings.php');
        console.log('Bookings data:', response.data);
        this.events = response.data.map(booking => ({
          start: `${booking.date} ${booking.start_hour}`,
          end: `${booking.date} ${booking.end_hour}`,
          title: `Pista ${booking.field_id}`,
          content: `<i class="w-icon material-icons mt1">sports_soccer</i> Member ${booking.member_id}`,
          resizable: false,
          deletable: false,
          split: booking.field_id % 2 === 0 ? 1 : 2
        }));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    },
    clearSelection() {
      this.selectedFieldId = null;
      this.selectedFieldName = '';
      this.events = [];
    }
  }
};
</script>

<style scoped>
@import "vue-cal/dist/vuecal.css";

.vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
.vuecal__title-bar {background-color: #e4f5ef;}
.vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
.vuecal__cell--selected:before {border-color: rgba(66, 185, 131, 0.5);}

#bookingForm {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tooltip {
  display: inline-block;
  position: relative;
  cursor: pointer;
  color: blue;
  font-weight: bold;
  margin-left: 5px;
}

.tooltip:hover::after {
  position: absolute;
  left: 100%;
  bottom: 0;
  background: #333;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 10;
  margin-left: 5px;
  opacity: 0;
  font-size: 10px;
}

.booked {
  background-color: rgba(255, 0, 0, 0.5);
  color: white;
}
</style>




