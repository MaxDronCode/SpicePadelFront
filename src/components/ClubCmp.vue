<template>
    <NavCmp></NavCmp>
    <h1>Tarifas</h1>
    <h2>Cuotas 2024</h2>
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
    <h2>Cuotas Mensuales 2024</h2>
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
    box-sizing: content-box;
}

h1 {
    padding: 40px;
    color: #333;
    margin-bottom: 20px;
}

h2 {
    padding: 0 40px;
    color: #fc2091;
    margin-bottom: 20px;
}

.quo-general-container {
    margin: 0 60px;
    border: 1px solid #333;
}

.quo-banner-container {
    background-color: #fc2091;
    height: 100%;
    margin: 0;
    padding: 20px;
}

.quo-tarifa2 {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #333;
    padding: 5px 20px;

}

.footer {
    margin-top: 60px;
}

.quo-tarifa2 p:last-child {
    margin-left: 30px;
}

.img-installations {
    width: 400px;
    height: 400px;
}
.inst-general-container{
    display: flex;
    justify-content: space-around;
}
.art-installations{
    width: 500px;
}
.art-installations p span{
    font-weight: bold;
}
@media (max-width:950px){
    .inst-general-container{
        flex-direction: column;
    }
    .art-installations{
        margin: auto;
    }
    .img-installations{
        margin: 30px auto auto auto;
    }
}
</style>