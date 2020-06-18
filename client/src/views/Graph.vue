<script>
import { mapActions, mapState } from "vuex";
import Spinner from "../components/Spinner";

export default {
    computed: {
        ...mapState(["isLoading"])
    },
    methods: {
        ...mapActions(["fetchData"])
    },
    data() {
        return {
            dataset: null
        };
    },

    created() {
        this.$store.subscribe((mutation, state) => {
            if (
                mutation.type === "setData" &&
                mutation.payload.kind === "mobility"
            ) {
                const { name, type } = mutation.payload.data;
                if (
                    name === this.$route.params.name &&
                    type === this.$route.params.type
                ) {
                    this.dataset = mutation.payload.data;
                }
            }
        });
        this.fetchData({ kind: "mobility", ...this.$route.params });
    },

    updated() {
        if (this.dataset === null) {
            this.fetchData({ kind: "mobility", ...this.$route.params });
        }
        if (
            this.dataset.name !== this.$route.params.name ||
            this.dataset.type !== this.$route.params.type
        ) {
            this.dataset = null;
            this.fetchData({ kind: "mobility", ...this.$route.params });
        }
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