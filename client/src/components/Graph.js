import { Line, mixins } from "vue-chartjs";
export default {
    name: "Graph",
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: {
        chartData: {
            type: Object,
            default: null,
        },
        chartOptions: {
            type: Object,
            default: null,
        },
    },
    mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    },
};
