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

</style>
