<template>
    <NavCmp/>
    <h1>HOME</h1>
    <TestCmp/>
</template>

<script>
import NavCmp from './NavCmp.vue';
import TestCmp from './TestApiCmp.vue';

export default {
    name: "HomeCmp",
    components: { 
        NavCmp,
        TestCmp
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
*{
    font-family: "Montserrat", sans-serif;
}
</style>
