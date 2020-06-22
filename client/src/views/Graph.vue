<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Spinner from "../components/Spinner";

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
            <div class="graph">{JSON.stringify(this.dataset)}</div>
        ) : (
            <Spinner />
        );
    }
};
</script>