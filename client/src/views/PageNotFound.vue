<script>
import moment from "moment";
import colors from "../util/colors";
import {
    BTab,
    BTabs,
    BCard,
    BContainer,
    BLink,
    BJumbotron,
    BButton
} from "bootstrap-vue";

export default {
    name: "DataNotFound",
    methods: {
        errorMessage() {
            return (
                <section class="data-error-container">
                    <BJumbotron
                        bg-variant="white"
                        header="Page Not Found"
                        lead="Content for this page is unavailable."
                        fluid
                    >
                        {this.$route.name !== "Home" ? (
                            <BButton variant="primary" to={{ name: "Home" }}>
                                Return to Home Page
                            </BButton>
                        ) : null}
                    </BJumbotron>
                </section>
            );
        }
    },
    render() {
        return (
            <BCard no-body>
                <BTabs card vertical pills no-fade>
                    <BTab
                        title="Chart"
                        disabled
                    >
                        <section class="tab-content-container">
                            
                        </section>
                    </BTab>
                    <BTab
                        title="Table"
                        disabled
                    >
                        <section class="tab-content-container">
                            
                        </section>
                    </BTab>
                    <BTab title="JSON" disabled>
                        <section class="tab-content-container">
                           
                        </section>
                    </BTab>
                    {this.errorMessage()}
                </BTabs>
            </BCard>
        );
    }
};
</script>