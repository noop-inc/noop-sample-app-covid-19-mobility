<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
    computed: {
        ...mapState(["isLoading"]),
        ...mapGetters(["getData"]),
        getDataByParams() {
            return this.getData({ kind: "mobility", ...this.$route.params })
        }
    },
    methods: {
        ...mapActions(["fetchData"])
    },
    data() {
        return {
            dataset: null
        }
    },

    created() {
        console.log(this.$route.params);
        console.log(this.$store);
        this.fetchData({ kind: "mobility", ...this.$route.params });
    },

    render() {
        return (
            <div class="graph">
                { JSON.stringify(this.getDataByParams) }
            </div>
        )
    }
};
</script>