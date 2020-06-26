import Prism from "prismjs";
import "prismjs/components/prism-json.min";
export default {
    name: "RawData",
    props: {
        dataset: {
            type: Object,
            default: null,
        },
    },
    methods: {
        formatRawData() {
            return Prism.highlight(
                JSON.stringify(this.dataset, null, 4),
                Prism.languages.json
            );
        },
    },
    mounted() {
        this.$refs.code.innerHTML = this.formatRawData();
    },
    updated() {
        this.$refs.code.innerHTML = this.formatRawData();
    },
    render() {
        return this.dataset ? (
            <pre>
                <code class="language-json" ref="code" />
            </pre>
        ) : null;
    },
};
