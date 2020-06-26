<script>
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
            <pre class="raw-data-container">
                <code class="language-json" ref="code" />
            </pre>
        ) : null;
    },
};
</script>

<style lang="scss">
    .raw-data-container {
        background-color: var(--dark);
        margin-bottom: 0;
        padding: 12px;
    }

    .language-json {
        .token {
            text-shadow: 0 -0.1em 0.2em black;
            background: none;
        }
        .token.punctuation, .token.operator {
            color: var(--light);
        }
        .token.property {
            color: #86c1b9;
        }
        .token.string {
            color: #dc9656;
        }
        .token.number {
            color: #a1b56c;
        }
    }
</style>