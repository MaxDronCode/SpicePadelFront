<template>
  <NavCmp />
  <div v-if="existsToken" id="bookingForm"> 
    <h1 class="hTitle">Reservar Pista</h1>
    <div v-if="!selectedFieldId"> 
      <div class="generalFieldContainer">
      <form v-for="field in availableFields" :key="field.id" :value="field.id" @submit.prevent="selectField(field.id)" required>
        <div class="fieldContainer">
        <h2>Pista {{ field.name }}</h2>
        <button type="submit" @change="selectedFieldId">Reservar</button>
      </div> 
      </form>
    </div>
    </div> 
    <div v-else class="general-container"> 
      <div>
        <h2 class="pista">Pista {{ selectedFieldId }}</h2>
        <vue-cal style="height: 40rem; width: 600px" locale="es" :events="events" :time-from="8 * 60" :time-to="19 * 60"
          :time-step="60" :disable-views="['years', 'months']" @cell-focus="selectedDate = $event.date || $event"
           xsmall />

      </div>
      <div class="res-form">

        <h2>Reserva</h2>
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
  watch: {
    selectedFieldId() {
      if (this.selectedFieldId) {
        this.fetchBookings();
      }
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
        // un metodo que compruebe
        console.log("Llama a la api reserve")
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
        this.message = 'Error al conectar con el servidor';
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
    selectField (field_id) {
      this.selectedFieldId = field_id
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
        console.log('Bookings data:', response.data);
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

#bookingForm {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/fieldsIMG.webp');
  filter: brightness();
  background-repeat: no-repeat;
  background-size: cover; /* Asegura que la imagen cubra toda la pantalla */
  background-position: center; /* Centra la imagen */
  width: 100vw; /* Asegura que el contenedor ocupe todo el ancho de la pantalla */
  height: 100vh; /* Asegura que el contenedor ocupe todo el alto de la pantalla */
  position: relative;
}

#bookingForm::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Capa semi-transparente para reducir la oscuridad */
  z-index: -1; /* Asegura que esté detrás del contenido */
}

.fields-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
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

.fieldContainer {
  background-color: #42b983;
  padding: 2rem;
  border-radius: 20%;
}

.generalFieldContainer {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
}

.hTitle {
  color: #ffeb3b;
  font-size: 60px;
}

.general
.res-form {
  margin-top: 200px;
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

button{
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
button:hover{
    background-color: #555;
}
.pista{
  text-align: center;
}


@media (max-width:1000px) {
  .general-container {
    flex-direction: column;
  }

  .res-form {
    margin: auto;
  }

}
</style>