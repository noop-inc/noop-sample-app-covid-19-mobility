<script>
import NavBar from "./components/NavBar";
import { BContainer } from "bootstrap-vue";
export default {
    name: "App",
    render() {
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
@import "../node_modules/prismjs/themes/prism.css";

button:disabled, .custom-select:disabled {
    cursor: not-allowed;
}

.custom-select {
    appearance: none;
}

#app {
    background-color: var(--secondary);
    height: calc(100vh);
    width: 100vw;
}

.router-container {
    padding-top: 71px;
    padding-bottom: 15px;
    height: calc(100vh);
}
</style>
