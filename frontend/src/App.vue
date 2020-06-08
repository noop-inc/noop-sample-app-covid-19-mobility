<template>
    <div id="app">
        <NavBar />
        <h1>Hello World!</h1>
        <router-view />
    </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
    name: "App",
    components: {
        NavBar
    }
};
</script>

<style lang="scss">
@import '~bootstrap';
@import '~bootstrap-vue';

#app {
    color: black;
}
</style>
