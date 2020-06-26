<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Spinner from "../components/Spinner.vue";
import Graph from "../components/Graph";
import RawData from "../components/RawData";
import colors from "../util/colors";
import { BTab, BTabs, BCard, BContainer } from "bootstrap-vue";

export default {
    name: "DataContainer",
    computed: {
        ...mapState("mobility", ["loading", "error"]),
        ...mapGetters("mobility", ["getMobilityData"]),
        dataset() {
            return this.getMobilityData(this.$route.params);
        }
    },
    data() {
        return {
            headerHeight: 19
        };
    },
    methods: {
        ...mapActions("mobility", ["fetchMobilityData"]),
        checkForMobilityData() {
            const { name, type } = this.$route.params;
            if (!this.loading) {
                if (
                    !this.dataset ||
                    this.dataset.name !== name ||
                    this.dataset.type !== type
                ) {
                    this.fetchMobilityData(this.$route.params);
                }
            }
        },
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
                            borderColor: colors.primary + "80",
                            pointBorderColor: pointColor,
                            pointHoverBorderColor: pointHover,
                            pointBackgroundColor: pointColor,
                            fill: false
                        }
                    ]
                };
            } else {
                return null;
            }
        },
        setHeaderHeight() {
            if (this.$refs.chartHeader.clientHeight) {
                this.headerHeight = this.$refs.chartHeader.clientHeight;
            } else if (this.$refs.rawDataHeader.clientHeight) {
                this.headerHeight = this.$refs.rawDataHeader.clientHeight;
            } else {
                this.headerHeight = 19;
            }
        }
    },
    created() {
        this.checkForMobilityData();
    },
    mounted() {
        window.addEventListener("resize", this.setHeaderHeight);
    },
    updated() {
        this.checkForMobilityData();
        this.setHeaderHeight();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setHeaderHeight);
    },
    render() {
        return (
            <BCard no-body>
                <BTabs card vertical pills active-nav-item-class="bg-dark">
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
                            {this.dataset ? (
                                <Graph
                                    styles={{ height: `100%` }}
                                    chartData={this.formatData()}
                                    options={{
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
                                                    }
                                                }
                                            ]
                                        },
                                        legend: false
                                    }}
                                />
                            ) : (
                                <Spinner />
                            )}
                        </section>
                    </BTab>
                    <BTab title="Data">
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