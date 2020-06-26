<script>
import { BTable } from "bootstrap-vue";
import moment from "moment";
export default {
    name: "Table",
    props: {
        dataset: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            items: null,
            fields: [
                {
                    key: "date",
                    label: "Date"
                },
                {
                    key: "value",
                    label: "Percent of Baseline Offset"
                }
            ]
        };
    },
    methods: {
        formatTable() {
            if (this.dataset) {
                const data = [
                    {
                        date: moment(this.dataset[0].date).format(
                            "MMMM Do, YYYY"
                        ),
                        value: `${this.dataset[0].value}%`,
                        _rowVariant: "warning"
                    }
                ];

                for (let i = 1; i < this.dataset.length; i++) {
                    const datum = this.dataset[i];
                    let color;
                    if (datum.value > this.dataset[i - 1].value) {
                        color = "success";
                    } else if (datum.value < this.dataset[i - 1].value) {
                        color = "danger";
                    } else {
                        color = "warning";
                    }
                    data.push({
                        date: moment(datum.date).format("MMMM Do, YYYY"),
                        value: `${datum.value}%`,
                        _rowVariant: color
                    });
                }
                return data;
            } else {
                return null;
            }
        }
    },
    created() {
        this.items = this.formatTable();
    },
    updated() {
        this.items = this.formatTable();
    },
    render() {
        return this.dataset ? (
            <BTable
                hover
                head-variant="light"
                sticky-header="100%"
                items={this.items}
                fields={this.fields}
                style="margin-bottom: 0;"
            />
        ) : null;
    }
};
</script>

<style lang="scss">
.b-table-sticky-header > .table.b-table > thead > tr > th {
    border-top: 0;
}
</style>
