<script>
import NavBar from "./components/NavBar";
export default {
    name: "App",
    components: {
        NavBar
    },
    render() {
        return (
            <div id="app">
                <NavBar />
                <router-view />
            </div>
        );
    }
};
</script>

<style lang="scss">
@import "~bootstrap";
@import "~bootstrap-vue";
</style>
