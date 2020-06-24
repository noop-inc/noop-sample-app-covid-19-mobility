<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Spinner from "../components/Spinner.vue";
import Graph from "../components/Graph.vue";

export default {
    computed: {
        ...mapState("mobility", ["loading", "error"]),
        ...mapGetters("mobility", ["getMobilityData"]),
        dataset() {
            return this.getMobilityData(this.$route.params);
        }
    },
    methods: {
        ...mapActions("mobility", ["fetchMobilityData"]),
        checkForMobilityData() {
            const { name, type } = this.$route.params;
            if (
                !this.dataset ||
                this.dataset.name !== name ||
                this.dataset.type !== type
            ) {
                this.fetchMobilityData(this.$route.params);
            }
        },
        formatData() {
            if (this.dataset) {
                const data = [];
                for (const datum of this.dataset.data) {
                    data.push({ x: datum.date, y: datum.value });
                }
                return {datasets: [{ data, fill: false }]};
            } else {
                return null;
            }
        }
    },

    created() {
        this.checkForMobilityData();
    },

    updated() {
        this.checkForMobilityData();
    },

    render() {
        return this.dataset ? (
            <section class="graph-container">
                <Graph chartData={this.formatData()} options={{maintainAspectRatio: false, responsive: true, scales: {xAxes: [{type: "time"}]}, legend: false}}/>
            </section>
        ) : (
            <Spinner />
        );
    }
};
</script>

<style lang="scss">
.graph-container {
    height: 100%;
    position: relative;
}
</style>

// <div class="graph">{JSON.stringify(this.dataset)}</div>