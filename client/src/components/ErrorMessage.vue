<script>
import { BJumbotron, BButton } from "bootstrap-vue";
export default {
    name: "ErrorMessage",
    render() {
        return (
            <section class="data-error-container">
                <BJumbotron
                    bg-variant="white"
                    header="Page Not Found"
                    lead="Content for this page is unavailable."
                    fluid
                    container-fluid
                >
                    {this.$route.name !== "Home" ? (
                        <BButton variant="danger" to={{ name: "Home" }}>
                            Return to Home Page
                        </BButton>
                    ) : null}
                </BJumbotron>
            </section>
        );
    }
};
</script>

<style lang="scss">
.data-error-container {
    height: calc(100vh - 88px);
    overflow-y: scroll;

    > .jumbotron {
        padding-bottom: 20px;
        margin: 0;
        > .container-fluid {
            padding: 0 20px;
        }
    }
}
</style>