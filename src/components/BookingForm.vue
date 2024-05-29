<template>
  <NavCmp />
  <div v-if="existsToken" id="bookingForm"> 
    <h1 class="hTitle">Reservar Pista</h1>
    <div v-if="!selectedFieldId"> 
      <div class="generalFieldContainer">
        <div 
          v-for="field in availableFields" 
          :key="field.id" 
          class="fieldContainer"
          :style="{ backgroundImage: `url(${field.field_img})` }"
        >
          <div class="fieldOverlay">
            <h2 class="fieldNum">Pista {{ field.name }}</h2>
            <p>{{ field.description }}</p>
            <button type="button" @click="selectField(field.id)">Reservar</button>
          </div>
          <div class="fieldNumber">
            <h2>{{ field.name }}</h2>
          </div>
        </div> 
      </div>
    </div> 
    <div v-else class="general-container"> 
      <div>
        <h2 class="fieldNameH2">Pista {{ selectedFieldId }}</h2>
        <vue-cal style="height: auto; width: auto" locale="es" :events="events" :time-from="8 * 60" :time-to="19 * 60"
          :time-step="60" :disable-views="['years', 'months', 'year']" @cell-focus="selectedDate = $event.date || $event"
           xsmall />
      </div>
      <div class="res-form">
        <h2 class="resH2">Reserva</h2>
        <p>Te recomendamos con 1 día de antelación</p>
        <form @submit.prevent="submitReservation">
          <div> 
            <label for="date" class="lab">Fecha: </label><br>
            <input type="date" v-model="reservation.date" required class="inp-date"/>
          </div> 
          <div>
            <label for="start_hour" class="lab">Hora de inicio: </label><br>
            <input type="time" v-model="reservation.start_hour" required class="inp-time" >
          </div>
          <button type="submit">Reservar</button>
        </form>
        <button @click="clearSelection">Cambiar pista</button>
        <div v-if="message">{{ message }}</div>
      </div>
    </div>
  </div> 
  <FooterCmp />
</template>



<script>
import NavCmp from '@/components/NavCmp.vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import FooterCmp from './FooterCmp.vue';
import axios from 'axios';
import 'animate.css'; // Import the animate.css library

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
      selectedDate: new Date(),
    };
  },
  created() {
    this.checkToken();
    this.loadAvailableFields();
    this.fetchBookings();
  },
  watch: {
    selectedFieldId() {
      if (this.selectedFieldId) {
        this.fetchBookings();
      }
    }
  },
  computed: {
    getSelectedFieldImage() {
      const selectedField = this.availableFields.find(field => field.id === this.selectedFieldId);
      return selectedField ? selectedField.field_img : '';
    }
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
          this.reloadPage()
        } else {
          this.message = 'Error al realizar la reserva: ' + result.message;
        }
      } catch (error) {
        this.message = 'Error';
      }
    },
    async reloadPage() {
      this.$router.push('/myAccount');
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
    selectField(fieldId) {
      this.selectedFieldId = fieldId;
    },
    async loadAvailableFields() {
      try {
        const response = await fetch(`http://localhost/spicepadel_api/api/getFields.php`);
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
        const response = await axios.get(`http://localhost/spicepadel_api/api/getBookings.php?field_id=${this.selectedFieldId}`);
        this.events = response.data.map(booking => ({
          start: `${booking.date} ${booking.start_hour}`,
          end: `${booking.date} ${booking.end_hour}`,
          title: `Pista ${booking.field_id}`,
          content: `<i class="w-icon material-icons mt1"></i> ${booking.member_id}`,
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

<style scooped>
@import "vue-cal/dist/vuecal.css";
@import 'animate.css';

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.resH2 {
  color:white;
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vuecal {
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 6rem;
}


.vuecal__cell--today,
.vuecal__cell--current {
  background-color: rgba(240, 240, 255, 0.4);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
  position: relative;
  color: white
}

#bookingForm {
  min-height: 100vh;
  /* height: 100vh; */
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/fieldsIMG.webp');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  filter: brightness(1.1);
}

#bookingForm::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: -1;
}

.generalFieldContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.fieldContainer {
  background-size: cover;
  background-position: center;
  border-radius: 20%;
  width: 250px;
  height: 300px;
  text-align: center;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
}

.fieldOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  padding: 2rem;
}

.fieldContainer:hover .fieldOverlay {
  opacity: 1;
}

.fieldNameH2 {
  color:#ffeb3b;
  font-size: 50px;
  padding: 3rem;
}

.fieldNumber {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffeb3b;
  font-size: 4rem;
}

.fieldContainer:hover .fieldNumber {
  opacity: 0;
}

.fieldContainer:hover {
  transform: scale(1.1);
  filter: brightness(0.5);
}

button {
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px;
}

button:hover {
  background-color: #555;
}

.pista {
  text-align: center;
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

.general-container {
  display: flex;
  gap: 3rem;
}

.res-form {
  margin-top: 200px;
}

.lab {
  margin-bottom: 15px;
}

.inp-date, input[type="time"] {
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
  display: block;
  width: calc(100% - 24px);
  margin-bottom: 20px;
}

input[type="date"]:focus, input[type="time"]:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(30, 144, 255, 0.8);
}

button {
  width: 50%;
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

.pista {
  text-align: center;
}

.res-form {
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 4rem;
  height: 27rem;
  color: white
}

@media (max-width:1000px) {
  .general-container {
    flex-direction: column;
  }

  .res-form {
    margin: auto;
  }
}

.hTitle {
  margin-bottom: 3rem;
  color: #ffeb3b;
  font-size: 70px;
}
</style>