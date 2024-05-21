
<template>
<NavCmp/>
  <div v-if="existsToken" id="bookingForm">
    <h1>Reservar Pista</h1>
    <form @submit.prevent="submitReservation">
      <div>
        <label for="field_id">Pista: </label>

        <!-- He puesto que maximo hayan 5 pistas x ahora -->

        <input type="number" v-model="reservation.field_id" required max=5>
      </div>
      <div>
        <label for="date">Fecha: </label>
        <input type="date" v-model="reservation.date" required>
      </div>
      <div>
        <label for="hour">Hora: </label>
        <input type="time" v-model="reservation.hour" required>
      </div>
      <div>
        <label for="hour">DNI/NIE: </label>
        <input type="type" v-model="reservation.member_id" required>
        <span class="tooltip" title="Por motivos de seguridad, necessitamos que introduzca su DNI/NIE aún estando logado en la web. Muchas gracias.">
          ?
        </span>
      </div>
    
      <button type="submit">Reservar</button>
    </form>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
import NavCmp from '@/components/NavCmp.vue'
export default {
  name: 'ClubCmp',
  components: {
    NavCmp
    },
  data() {
    return {
      reservation: {
        field_id: '',
        date: '',
        hour: '',
        member_id: ''
      },
      message: '',
      existsToken: false
    };
  },
  methods: {
    async submitReservation() {
      const today = new Date();
      const reservationDate = new Date(this.reservation.date);
      const oneDayInMillis = 24 * 60 * 60 * 1000; // Milisegundos en un día

      if (reservationDate - today <= oneDayInMillis) {
        this.message = 'La fecha de la reserva debe ser al menos con un día de antelación';
        return;
      }

      try {
        const response = await fetch('http://localhost/spicepadel_api/api/reserve.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.reservation)
        });
        const result = await response.json();
        if (result.success) {
          this.message = 'Reserva realizada con éxito';
        } else {
          this.message = 'Error al realizar la reserva: ' + result.message;
        }
      } catch (error) {
        this.message = 'Error al conectar con el servidor';
      }
    },
    checkToken() {
      this.existsToken = localStorage.getItem('spicetoken') !== null;
    }
  },
  mounted() {
    this.checkToken();
  }
};
</script>

<style scoped>

form {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid black;
    align-items:baseline;
    width: 20%;
    justify-content:center;
    border-radius: 5rem;
}

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
