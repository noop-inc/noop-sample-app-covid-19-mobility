import { Line, mixins } from "vue-chartjs";
import moment from "moment";
export default {
    name: "Graph",
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: {
        chartData: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            options: {
                maintainAspectRatio: false,
                responsive: true,
                animation: false,
                scales: {
                    xAxes: [
                        {
                            type: "time",
                            time: {
                                unit: "month",
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 8,
                                stepSize: 10,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Percent of Baseline Offset",
                                fontSize: 14,
                            },
                        },
                    ],
                },
                legend: false,
                tooltips: {
                    xPadding: 8,
                    yPadding: 8,
                    bodyFontSize: 14,
                    titleFontSize: 14,
                    callbacks: {
                        title: (tooltipItem) =>
                            moment(tooltipItem[0].xLabel).format("ll"),
                        label: (tooltipItem) => `${tooltipItem.yLabel}%`,
                    },
                },
            },
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    },
    updated() {
        this.renderChart(this.chartData, this.options);
    },
};
