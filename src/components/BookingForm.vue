<template>
  <NavCmp />
  <div v-if="existsToken" id="bookingForm">
    <h1>Reservar Pista</h1>
    <div class="fields-container">
      <div v-for="field in availableFields" :key="field.id" class="field-card">
        <div class="field-details">
          <h2 class="pista">Pista {{ field.id }}</h2>
          <p>Características: {{ field.description }}</p>
          <div class="field-image" :style="{ backgroundImage: 'url(' + field.image + ')' }"></div>
          <button @click="reserveField(field.id)">Reservar</button>
        </div>
      </div>
    </div>
  </div>
  <FooterCmp />
</template>

<script>
import NavCmp from '@/components/NavCmp.vue';
import FooterCmp from './FooterCmp.vue';

export default {
  name: 'BookingForm',
  components: {
    NavCmp,
    FooterCmp
  },
  data() {
    return {
      availableFields: [],
      existsToken: false
    };
  },
  created() {
    this.checkToken();
    this.loadAvailableFields();
  },
  methods: {
    checkToken() {
      const spiceTokenString = localStorage.getItem('spicetoken');
      if (spiceTokenString) {
        this.existsToken = true;
      }
    },
    async loadAvailableFields() {
      try {
        const response = await fetch(`http://localhost/spicepadel_api/api/getFields.php`);
        const data = await response.json();
        this.availableFields = data;
      } catch (error) {
        console.error("Error en la conexión con el servidor", error);
      }
    },
    reserveField(fieldId) {
      this.$router.push(`/reserve/${fieldId}`);
    }
  }
};
</script>

<style scoped>
#bookingForm {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fields-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.field-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.field-details {
  padding: 1rem;
}

.field-image {
  height: 200px;
  background-size: cover;
  background-position: center;
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

.pista {
  text-align: center;
}
</style>
