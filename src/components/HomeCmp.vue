<template>
  <div class="wrapper">
    <NavCmp/>
    <div class="home-page">
      <section class="welcome-section">
        <div class="overlay">
          <h1>¡Bienvenido a Spice Pádel!</h1>
          <p>La mejor plataforma para reservar tus pistas de pádel.</p>
        </div>
      </section>
      <section class="offer-section">
        <div class="overlay">
          <h2>¿Qué Ofrecemos?</h2>
          <p>
            Ofrecemos una plataforma sencilla y rápida para encontrar y reservar las mejores pistas de pádel.
            Además, te brindamos información detallada sobre cada pista para que elijas la que mejor se adapte a tus necesidades.
          </p>
        </div>
      </section>
      <section class="reservation-section">
        <div class="overlay">
          <h2>Reserva Tu Pista</h2>
          <p>
            Con nuestro sistema de reservas en línea, puedes seleccionar la fecha, la hora y la pista que prefieras. <a href="reserve">¡Reserva aquí!</a>
          </p>
        </div>
      </section>
      <section class="contact-section">
        <div class="overlay">
          <h2>Contáctanos</h2>
          <p>
            ¿Tienes preguntas o necesitas ayuda? Ponte en <a href="contact">contacto</a> con nuestro equipo de soporte y estaremos encantados de asistirte.
          </p>
        </div>
      </section>
    </div>
    <FooterCmp/>
  </div>
</template>

<script>
import NavCmp from '@/components/NavCmp.vue';
import FooterCmp from './FooterCmp.vue';

export default {
  name: 'HomePage',
  components: {
    NavCmp,
    FooterCmp
  }
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.home-page {
  color: #fff;
  flex: 1;
}

section {
  position: relative;
  width: 100%;
  height: 50vh;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2em;
}

.welcome-section {
  height: 100vh;
  background-image: url('@/assets/reserve.webp');
}

.welcome-section h1 {
  font-size: 5em;
  margin-bottom: 0.5em;
  color: #fc0;
}

.welcome-section p {
  font-size: 1.5em;
}

.offer-section {
  background-image: url('@/assets/fields.webp');
}

.offer-section h2 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
  color: #fc0;
}

.offer-section p {
  font-size: 1.5em;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.reservation-section {
  background-image: url('@/assets/homeImg.webp');
}

.reservation-section h2 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
  color: #fc0;
}

.reservation-section p {
  font-size: 1.5em;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.contact-section {
  background-image: url('@/assets/joinUs.webp');
}

.contact-section h2 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
  color: #fc0;
}

.contact-section p {
  font-size: 1.5em;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

a {
  color: #fc0; /* Cambia el color del enlace a amarillo */
  text-decoration: none; /* Elimina el subrayado del enlace */
}
</style>
