import ErrorMessage from "../components/ErrorMessage.vue";
import { BTab, BTabs, BCard } from "bootstrap-vue";

export default {
    name: "DataNotFound",
    render() {
        return (
            <BCard no-body>
                <BTabs card vertical pills no-fade>
                    <BTab title="Chart" disabled>
                        <section class="tab-content-container" />
                    </BTab>
                    <BTab title="Table" disabled>
                        <section class="tab-content-container" />
                    </BTab>
                    <BTab title="JSON" disabled>
                        <section class="tab-content-container" />
                    </BTab>
                    <ErrorMessage />
                </BTabs>
            </BCard>
        );
    },
};
