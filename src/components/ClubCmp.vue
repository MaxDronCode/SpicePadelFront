<template>
    <NavCmp></NavCmp>
    <h1>Tarifas</h1>
    <div class="quo-general-container">
        <div class="quo-banner-container">Cuotas de entrada 2024</div>
        <div class="quo-tarifa2">
            <p>Cuota de entrada general</p>
            <p>2000€</p>
        </div>
        <div class="quo-tarifa2">
            <p>Cuota de entrada sin pareja, hasta los 30 años</p>
            <p>1000€</p>
        </div>
    </div>
    <div class="quo-general-container">
        <div class="quo-banner-container">Cuotas mensuales</div>
        <div class="quo-tarifa2">
            <p>CUOTA FAMILIAR</p>
            <p>129€</p>
        </div>
        <div class="quo-tarifa2">
            <p>Cuota hijos/as de 3-13 años</p>
            <p>22€</p>
        </div>
        <div class="quo-tarifa2">
            <p>Cuota hijos/as de 14-29 años</p>
            <p>39€</p>
        </div>
        <div class="quo-tarifa2">
            <p>Cuota Solteros/as 16-29 años e hijos de socios de 30 a 39 años</p>
            <p>60€</p>
        </div>
        <div class="quo-tarifa2">
            <p>Cuota hijos/as de socios solteros/as y socios separados/as o viudos/as sin beneficiario</p>
            <p>79€</p>
        </div>
        <div class="quo-tarifa2">
            <p>Cuota familiar socios +75 años</p>
            <p>45€</p>
        </div>
    </div>
    <h1>Instalaciones</h1>
    <div class="inst-general-container">
        <article class="art-installations">
            <p><span>El Club Spice Padel</span> se encuentra en un entorno natural privilegiado, situado en las proximidades de un
                parque natural, lo que ofrece un paisaje inigualable y una atmósfera tranquila. Las extensas
                instalaciones ocupan más de <span>35.000 m²</span> de terreno forestal, proporcionando un espacio amplio para el
                disfrute de los visitantes.</p>

                <p>La entrada principal al Club Spice Padel conduce directamente al edificio de la Casa Club, donde se
                encuentran las oficinas administrativas y la recepción. Este edificio alberga <span>varias salas de uso
                social</span>, así como las instalaciones del <span>bar</span> y el <span>restaurante</span> del club, perfectos para relajarse después
                de un partido o para socializar con otros miembros.</p>

                <p>El área de <span>Wellness Fitness</span> del club ofrece una variedad de actividades dirigidas que se llevan a cabo
                en distintas salas polivalentes. También dispone de un <span>Centro de Fitness</span> equipado con la maquinaria más
                moderna para la práctica de ejercicio físico, asegurando una experiencia completa de salud y bienestar.</p>

                <p>Además, el club destaca por su zona de aguas con spa, incluyendo una piscina cubierta de 15 metros ideal
                para la relajación y la recuperación muscular.</p>

                <p>Las instalaciones exteriores del Club Spice Padel son especialmente notables, con piscinas al aire libre
                y numerosas pistas de tenis y pádel que ocupan una gran parte del terreno. Estas áreas están diseñadas
                para proporcionar el máximo disfrute y comodidad a los jugadores de todos los niveles.

            </p>
        </article>
        <img :src="InstImgRoute" alt="Instalaciones" class="img-installations">
    </div>
    <p class="contacto">¿Tienes alguna duda? <a href="contact">Contáctanos</a></p>
    <FooterCmp class="footer"></FooterCmp>
</template>

<script>
import NavCmp from './NavCmp.vue';
import FooterCmp from './FooterCmp.vue';
import InstImg from '@/assets/instalacionesSpice.png';

export default {
    name: 'ClubCmp',
    components: {
        NavCmp,
        FooterCmp,
    },
    data() {
        return {
            InstImgRoute: InstImg
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
}

h1 {
    text-align: center;
    background-color: #fc0;
    line-height: 100px;
    height: 100px;
    margin: 0 0 50px 0;
    font-size: 60px;
    color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    padding: 20px 40px 10px 40px;
    color: #fc0;
    margin-bottom: 20px;
    font-size: 36px;
}

.quo-general-container {
    margin: 20px auto;
    border: 1px solid #333;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
}

.quo-banner-container {
    background-color: #fc0;
    height: 100%;
    margin: 0;
    padding: 20px;
    font-size: 24px;
    text-align: center;
    color: #333;
    font-weight: bold;
    border-radius: 10px 10px 0 0;
}

.quo-tarifa2 {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    padding: 10px 20px;
    font-size: 18px;
}

.footer {
    margin-top: 60px;
}

.quo-tarifa2 p:last-child {
    margin-left: 30px;
    font-weight: bold;
}

.img-installations {
    width: 100%;
    height: auto;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.inst-general-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin: 40px 0;
}

.art-installations {
    max-width: 600px;
    padding: 20px;
    font-size: 18px;
    line-height: 1.6;
    color: #333;
}

.art-installations p span {
    font-weight: bold;
    color: #fc0;
}

.contacto {
    text-align: center;
    padding: 40px;
    font-size: 18px;
    color: #333;
}

.contacto a {
    color: #fc0;
    text-decoration: none;
    font-weight: bold;
}

.contacto a:hover {
    text-decoration: underline;
}

@media (max-width: 950px) {
    .inst-general-container {
        flex-direction: column;
        align-items: center;
    }
    .art-installations {
        width: 90%;
    }
    .img-installations {
        width: 90%;
        margin-top: 20px;
    }
}
</style>
