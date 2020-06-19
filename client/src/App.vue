<script>
import NavBar from "./components/NavBar";
import { BContainer } from "bootstrap-vue";
export default {
    name: "App",
    render() {
        console.log(this.$store)
        return (
            <div id="app">
                <NavBar />
                <BContainer class="router-container" fluid>
                    <router-view />
                </BContainer>
            </div>
        );
    }
};
</script>

<style lang="scss">
@import "~bootstrap";
@import "~bootstrap-vue";

.custom-select{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

#app {
    background-color: var(--light);
    height: calc(100vh);
    width: 100vw;
}

.router-container {
    padding-top: 56px;
    height: calc(100vh);
}
</style>
