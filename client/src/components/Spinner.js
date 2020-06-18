import GridLoader from "vue-spinner/src/GridLoader.vue";
import { BRow } from "bootstrap-vue";

export default {
    render() {
        return (
            <BRow align-h="center" align-v="center" class="h-100">
                <GridLoader color="var(--dark)" size="48px" />
            </BRow>
        );
    }
}