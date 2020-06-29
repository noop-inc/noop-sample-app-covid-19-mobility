<script>
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";
import Spinner from "./Spinner.vue";
import Graph from "./Graph";
import Table from "./Table.vue";
import RawData from "./RawData.vue";
import colors from "../util/colors";
import { BTab, BTabs, BCard, BContainer } from "bootstrap-vue";

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
    data() {
        return {
            headerHeight: 19
        };
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
        setHeaderHeight() {
            if (this.$refs.chartHeader.clientHeight) {
                this.headerHeight = this.$refs.chartHeader.clientHeight;
            } else if (this.$refs.rawDataHeader.clientHeight) {
                this.headerHeight = this.$refs.rawDataHeader.clientHeight;
            } else if (this.$refs.tableHeader.clientHeight) {
                this.headerHeight = this.$refs.tableHeader.clientHeight;
            } else if (this.headerHeight !== 19) {
                this.headerHeight = 19;
            }
        }
    },
    mounted() {
        window.addEventListener("resize", this.setHeaderHeight);
    },
    updated() {
        this.setHeaderHeight();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setHeaderHeight);
    },
    render() {
        return (
            <BCard no-body>
                <BTabs card vertical pills no-fade>
                    <BTab title="Chart" active>
                        <h6 ref="chartHeader" class="data-content-header">
                            {this.dataset
                                ? `${this.dataset.type} data for ${this.dataset.name} during the COVID-19 Pandemic`
                                : null}
                        </h6>
                        <section
                            style={`height: calc(100vh - ${136 +
                                this.headerHeight}px);`}
                            class="data-content-container border rounded"
                        >
                            {this.dataset ? null : (
                                <div class="spinner-backdrop" />
                            )}
                            {this.dataset ? (
                                <Graph
                                    styles={{ height: `100%` }}
                                    chartData={this.formatData()}
                                    chartOptions={this.formatOptions()}
                                />
                            ) : (
                                <Spinner />
                            )}
                        </section>
                    </BTab>
                    <BTab title="Table">
                        <h6 ref="tableHeader" class="data-content-header">
                            {this.dataset
                                ? `${this.dataset.type} data for ${this.dataset.name} during the COVID-19 Pandemic`
                                : null}
                        </h6>
                        <section
                            class="data-content-container border rounded"
                            style={`height: calc(100vh - ${136 +
                                this.headerHeight}px);`}
                        >
                            {this.dataset ? null : (
                                <div class="spinner-backdrop" />
                            )}
                            {this.dataset ? (
                                <Table dataset={this.dataset} />
                            ) : (
                                <Spinner />
                            )}
                        </section>
                    </BTab>
                    <BTab title="JSON">
                        <h6 ref="rawDataHeader" class="data-content-header">
                            {this.dataset
                                ? `${this.dataset.type} data for ${this.dataset.name} during the COVID-19 Pandemic`
                                : null}
                        </h6>
                        <section
                            class="data-content-container border rounded"
                            style={`height: calc(100vh - ${136 +
                                this.headerHeight}px);`}
                        >
                            {this.dataset ? null : (
                                <div class="spinner-backdrop" />
                            )}
                            {this.dataset ? (
                                <RawData dataset={this.dataset} />
                            ) : (
                                <Spinner />
                            )}
                        </section>
                    </BTab>
                </BTabs>
            </BCard>
        );
    }
};
</script>

<style lang="scss">
.card-header {
    padding: 12px;
}
.data-content-header {
    min-height: 19px;
}
.data-content-container {
    overflow-y: scroll;
}
</style>