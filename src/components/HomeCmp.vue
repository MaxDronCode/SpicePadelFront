<template>
    <NavCmp/>
    <h1>HOME</h1>
    <TestApiCmp/>
    <FooterCmp/>
</template>

<script>
import NavCmp from './NavCmp.vue';
import TestApiCmp from './TestApiCmp.vue';
import FooterCmp from './FooterCmp.vue'

export default {
    name: "HomeCmp",
    components: { 
        NavCmp,
        TestApiCmp,
        FooterCmp
    }
}
</script>

<style scoped>

</style>
