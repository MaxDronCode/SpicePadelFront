<template>
    <NavCmp/>
    <h1>HOME</h1>
    <TestCmp/>
    <AccountCardCmp></AccountCardCmp>
</template>

<script>
import NavCmp from './NavCmp.vue';
import TestCmp from './TestApiCmp.vue';
import AccountCardCmp from './AccountCardCmp.vue';
export default {
    name: "HomeCmp",
    components: { 
        NavCmp,
        TestCmp,
        AccountCardCmp,
    }
}
</script>

<style scoped>

</style>
