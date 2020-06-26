<script>
import GridLoader from "vue-spinner/src/GridLoader.vue";

export default {
    name: "LoadingSpinner",
    props: {
        size: {
            type: Number,
            default: 48
        },
        color: {
            type: String,
            default: "dark"
        }
    },
    render() {
        return (
            <section class="loading-spinner-container">
                <GridLoader
                    color={`var(--${this.color})`}
                    size={`${this.size}px`}
                />
            </section>
        );
    }
};
</script>

<style lang="scss">
.loading-spinner-container {
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
}
</style>