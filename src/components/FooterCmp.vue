<template>
    <div class="ftr-general-container">
      <p>SpicePadel © 2024</p>
      <p>Privacidad y Legal</p>
      <p>Contacto</p>
      <p>Noticias</p>
      <p>Localización</p>
      <p>Política de Cookies</p>
      <p>Política de Privacidad</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FooterCmp',
    data() {
      return {}
    }
  }
  </script>
  
  <style scoped>
  .ftr-general-container {
    background-color: #333;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  
  @media (max-width: 1000px) {
    .ftr-general-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      text-align: center;
      overflow: auto;
    }
  }
  
  @media (max-width: 768px) {
    .ftr-general-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  
  * {
    color: #fff;
    font-size: 0.9rem;
  }
  </style>
  