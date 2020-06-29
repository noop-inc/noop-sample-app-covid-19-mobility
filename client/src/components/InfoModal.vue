<script>
import { BModal } from "bootstrap-vue";

export default {
    name: "InfoModal",
    mounted() {
        this.$refs.infoModal.show();
    },
    render() {
        return (
            <BModal
                id="info-modal"
                ref="infoModal"
                title="Information About Noop"
                hide-footer
                no-fade
            ></BModal>
        );
    }
};
</script>

<style lang="scss">
</style>