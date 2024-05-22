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
      <vue-cal 
        :attributes="calendarAttributes"
        :disable-views="['years', 'months']"
        readonly
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
        <div>
          <label for="dni">DNI/NIE: </label>
          <input type="text" v-model="reservation.member_id" required>
          <span class="tooltip" title="Por motivos de seguridad, necesitamos que introduzca su DNI/NIE aún estando logado en la web. Muchas gracias.">
            ?
          </span>
        </div>
        <button type="submit">Reservar</button>
      </form>
      <button @click="clearSelection">Cambiar pista</button>
    </div>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
import NavCmp from '@/components/NavCmp.vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  name: 'BookingForm',
  components: {
    VueCal,
    NavCmp
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
      calendarAttributes: [], // Aquí guardaremos los días ocupados
      today: new Date().toISOString().split('T')[0] // Fecha de hoy en formato YYYY-MM-DD
    };
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
          // Actualiza las reservas en el calendario
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
      this.existsToken = localStorage.getItem('spicetoken') !== null;
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
        this.calendarAttributes = data.map(booking => ({
          start: `${this.reservation.date} ${booking.start_hour}`,
          end: `${this.reservation.date} ${booking.end_hour}`,
          class: 'booked'
        }));
      } catch (error) {
        console.error("Error loading availability:", error);
      }
    },
    clearSelection() {
      this.selectedFieldId = null;
      this.selectedFieldName = '';
      this.calendarAttributes = [];
    }
  },
  mounted() {
    this.checkToken();
    this.loadAvailableFields();
  }
};
</script>

<style scoped>
@import "vue-cal/dist/vuecal.css";

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
</style>
