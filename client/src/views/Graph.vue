<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Spinner from "../components/Spinner";

export default {
    computed: {
        ...mapState(["isLoading"]),
        ...mapGetters(["getDataByParams"]),
        dataset() {
            return this.getDataByParams({
                kind: "mobility",
                ...this.$route.params
            });
        }
    },
    methods: {
        ...mapActions(["fetchData"]),
        checkDataset() {
            const { name, type } = this.$route.params;
            if (
                !this.dataset ||
                this.dataset.name !== name ||
                this.dataset.type !== type
            ) {
                this.fetchData({ kind: "mobility", ...this.$route.params });
            }
        }
    },

    created() {
        this.checkDataset();
    },

    updated() {
        this.checkDataset();
    },

    render() {
        console.log(this.dataset);
        return this.dataset ? (
            <div class="graph">{JSON.stringify(this.dataset)}</div>
        ) : (
            <Spinner />
        );
    }
};
</script>