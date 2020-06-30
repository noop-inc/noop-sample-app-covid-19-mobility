<script>
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";
import Graph from "./Graph";
import Table from "./Table.vue";
import RawData from "./RawData.vue";
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
    name: "DataContainer",
    props: {
        dataset: {
            type: Object,
            default: null
        }
    },
    computed: {
        ...mapState("mobility", ["loading", "error"]),
        ...mapGetters("mobility", ["getMobilityData"])
    },
    methods: {
        formatData() {
            if (this.dataset) {
                const data = [
                    {
                        x: this.dataset.data[0].date,
                        y: this.dataset.data[0].value
                    }
                ];
                const pointColor = [colors.yellow + "80"];
                const pointHover = [colors.yellow + "FF"];
                for (let i = 1; i < this.dataset.data.length; i++) {
                    const datum = this.dataset.data[i];
                    data.push({ x: datum.date, y: datum.value });
                    let color;
                    if (datum.value > data[i - 1].y) {
                        color = colors.green;
                    } else if (datum.value < data[i - 1].y) {
                        color = colors.red;
                    } else {
                        color = colors.yellow;
                    }
                    pointColor.push(color + "80");
                    pointHover.push(color + "FF");
                }
                return {
                    datasets: [
                        {
                            data,
                            borderColor: colors.primary + "40",
                            backgroundColor: colors.primary + "40",
                            pointBorderColor: pointColor,
                            pointRadius: 3,
                            pointHoverRadius: 6,
                            pointHoverBorderColor: pointHover,
                            pointBackgroundColor: pointColor,
                            fill: "start"
                        }
                    ]
                };
            } else {
                return null;
            }
        },
        formatOptions() {
            return {
                maintainAspectRatio: false,
                responsive: true,
                animation: false,
                scales: {
                    xAxes: [
                        {
                            type: "time",
                            time: {
                                unit: "month"
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 8,
                                stepSize: 10
                            },
                            scaleLabel: {
                                display: true,
                                labelString: `Percent of Offset from Baseline (${
                                    this.dataset.source === "Apple" ? "10" : ""
                                }0%)`,
                                fontSize: 14
                            }
                        }
                    ]
                },
                legend: false,
                tooltips: {
                    xPadding: 8,
                    yPadding: 8,
                    bodyFontSize: 14,
                    titleFontSize: 14,
                    callbacks: {
                        title: tooltipItem =>
                            moment(tooltipItem[0].xLabel).format("ll"),
                        label: tooltipItem => `${tooltipItem.yLabel}%`
                    }
                }
            };
        },
        createTabHeader() {
            const headerText = `${this.dataset.type} mobility data for ${this.dataset.name} during the COVID-19 Pandemic`;
            return this.$route.name !== "Data" ? (
                <BLink
                    class="data-content-link"
                    to={{
                        name: "Data",
                        params: {
                            name: this.dataset.name,
                            type: this.dataset.type
                        }
                    }}
                >
                    <h6 class="data-content-header">{headerText}</h6>
                </BLink>
            ) : (
                <h6 class="data-content-header">{headerText}</h6>
            );
        },
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
                    <BTab title="Chart" active>
                        {this.dataset ? (
                            <section class="tab-content-container">
                                {this.createTabHeader()}
                                <section class="data-content-container border rounded">
                                    <Graph
                                        styles={{ height: "100%" }}
                                        chartData={this.formatData()}
                                        chartOptions={this.formatOptions()}
                                    />
                                </section>
                            </section>
                        ) : null}
                    </BTab>
                    <BTab title="Table">
                        {this.dataset ? (
                            <section class="tab-content-container">
                                {this.createTabHeader()}
                                <section class="data-content-container border rounded">
                                    <Table dataset={this.dataset} />
                                </section>
                            </section>
                        ) : null}
                    </BTab>
                    <BTab title="JSON">
                        {this.dataset ? (
                            <section class="tab-content-container">
                                {this.createTabHeader()}
                                <section class="data-content-container border rounded">
                                    <RawData dataset={this.dataset} />
                                </section>
                            </section>
                        ) : null}
                    </BTab>
                    {this.error && !this.dateset ? this.errorMessage() : null}
                </BTabs>
            </BCard>
        );
    }
};
</script>

<style lang="scss">
.tab-content,
.data-error-container {
    height: calc(100vh - 88px);
}
.data-error-container {
    overflow-y: scroll;

    > .jumbotron {
        width: 100%;
        padding-bottom: 20px;
        margin: 0;
    }
}
.card {
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25),
        inset 0 -1px 5px rgba(0, 0, 0, 0.25);
}
.card-header {
    padding: 12px;
}
.tab-content-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 128px);
}
.data-content-header {
    min-height: 19px;
}
.data-content-container {
    overflow-y: scroll;
    background-color: var(--light);
    flex: 1;
}
</style>