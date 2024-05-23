<template>
    <div id="card">
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <p class="heading_8264">BRUCE WAYNE</p>
                    <img :src=logo alt="Logo">
                    <svg class="chip" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 256 256"><path fill="#d9d9d9" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24M74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0M96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32m97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0"/></svg>
                    <p class="number">(poner dni member)</p>
                    <p class="valid_thru">VALID THRU</p>
                    <p class="date_8264">1 2 / 2 4</p>
                </div>
                <div class="flip-card-back">
                    <div class="strip"><p></p></div>
                    <div class="mstrip"><p>{{ usuMail }}</p></div>
                    <div class="sstrip">
                        <p class="code">***</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '@/assets/LogoSpiceGirls.png';
export default {
    name: 'AccountCard',
    data() {
        return {
            usuMail: "",
            logo : Logo,
        };
    },
    methods: {
        obtainName() {
            const spiceTokenString = localStorage.getItem('spicetoken');
            const spiceToken = JSON.parse(spiceTokenString);
            this.usuMail = spiceToken.user_mail;
        },
    },
    mounted() {
        this.obtainName();
    }
};
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 240px;
  height: 154px;
  perspective: 1000px;
  color: white;
}
.heading_8264 {
  position: absolute;
  letter-spacing: 0.2em;
  font-size: 0.5em;
  top: 2em;
  left: 18.6em;
}
img {
    height: 60px;
    width: 60px;
    margin-left:180px;
    margin-top:90px;
}
.chip {
  position: absolute;
  top: 2.3em;
  left: 1.5em;
}
.contactless {
  position: absolute;
  top: 3.5em;
  left: 12.4em;
}
.number {
  position: absolute;
  font-weight: bold;
  font-size: 0.6em;
  top: 8.3em;
  left: 1.6em;
}
.valid_thru {
  position: absolute;
  font-weight: bold;
  top: 635.8em;
  font-size: 0.01em;
  left: 140.3em;
}
.date_8264 {
  position: absolute;
  font-weight: bold;
  font-size: 0.5em;
  top: 13.6em;
  left: 3.2em;
}
.name {
  position: absolute;
  font-weight: bold;
  font-size: 0.5em;
  top: 16.1em;
  left: 2em;
}
.strip {
  position: absolute;
  background-color: black;
  width: 15em;
  height: 1.5em;
  top: 2.4em;
  background: repeating-linear-gradient(
    45deg,
    #303030,
    #303030 10px,
    #202020 10px,
    #202020 20px
  );
}
.mstrip {
  position: absolute;
  background-color: rgb(255, 255, 255);
  width: 8em;
  height: 0.8em;
  top: 5em;
  left: 0.8em;
  border-radius: 2.5px;
}
.mstrip p{
    margin-top:-.5px;
    color:black;
    font-size:10px;
}
.sstrip {
  position: absolute;
  background-color: rgb(255, 255, 255);
  width: 4.1em;
  height: 0.8em;
  top: 5em;
  left: 10em;
  border-radius: 2.5px;
}
.code {
  font-weight: bold;
  text-align: center;
  margin: 0.2em;
  color: black;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 1rem;
}
.flip-card-front {
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
  background-color: #171717;
}
.flip-card-back {
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
  background-color: #171717;
  transform: rotateY(180deg);
}
</style>