<template>
    <NavCmp/>
    <h1>HOME</h1>
    <TestApiCmp/>

</template>

<script>
import NavCmp from './NavCmp.vue';
import TestApiCmp from './TestApiCmp.vue';

export default {
    name: "HomeCmp",
    components: { 
        NavCmp,
        TestApiCmp,
    }
}
</script>

<style scoped>

</style>
