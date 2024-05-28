<template>
    <NavCmp></NavCmp>
    <h1>CONOCENOS</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, earum. At tempora consequuntur obcaecati. Tenetur velit deleniti suscipit mollitia, optio corporis inventore earum delectus ex, laudantium officia facilis illum esse.</p>
    <FooterCmp class="footer"></FooterCmp>
</template>

<script>
import NavCmp from './NavCmp.vue';
import FooterCmp from './FooterCmp.vue';
    export default {
        name: 'ClubCmp',
        components: {
        NavCmp,
        FooterCmp,
    },
        data(){
            return {
 
            }
        }
    }
</script>

<style scoped>
.footer{
    position: absolute;
    bottom: 0;
}
</style>