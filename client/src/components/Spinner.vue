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
            default: "light"
        }
    },
    render() {
        return (
            <section class="loading-spinner-container">
                <div class="spinner-backdrop" />
                <div class="spinner-position">
                    <GridLoader
                        color={`var(--${this.color})`}
                        size={`${this.size}px`}
                    />
                </div>
            </section>
        );
    }
};
</script>

<style lang="scss">
.loading-spinner-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .spinner-backdrop {
        opacity: 0.5;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        z-index: 2000;
    }
    > .spinner-position {
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        > * {
            z-index: 3000;
        }
    }
}
</style>