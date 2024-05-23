<template>
    <NavCmp/>
    <h1>HOME</h1>
    <TestApiCmp/>
    <AccountCardCmp></AccountCardCmp>
</template>

<script>
import NavCmp from './NavCmp.vue';
import TestApiCmp from './TestApiCmp.vue';
import AccountCardCmp from './AccountCardCmp.vue';
export default {
    name: "HomeCmp",
    components: { 
        NavCmp,
        TestApiCmp,
        AccountCardCmp,
    }
}
</script>

<style scoped>

</style>
