<template>
    <NavCmp/>
    <h1>HOME</h1>
    <TestApiCmp/>
    <!-- <VueCalComponent /> -->

    <FooterCmp/>
</template>

<script>
import NavCmp from './NavCmp.vue';
import TestApiCmp from './TestApiCmp.vue';
import FooterCmp from './FooterCmp.vue'
// import VueCalComponent from '@/components/VueCalComponent.vue'

export default {
    name: "HomeCmp",
    components: { 
        NavCmp,
        TestApiCmp,
        FooterCmp,
        // VueCalComponent
    }
}
</script>

<style scoped>

</style>
