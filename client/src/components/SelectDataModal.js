import {
    BModal,
    BFormGroup,
    BFormRadioGroup,
    BFormSelect,
} from "bootstrap-vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
    name: "SelectDataModal",
    computed: {
        ...mapState(["isLoading"]),
        ...mapGetters(["getData"])
    },
    data() {
        return {
            sourceOptions: ["Apple", "Google"],
            selectedSource: null,
            geoTypeOptions: [
                { value: "countries", text: "Countries" },
                { value: "states", text: "United States" },
            ],
            selectedGeoType: null,
            locationOptions: [
                { value: null, text: "Select a Location", disabled: true },
            ],
            selectedLocaton: null,
            dataOptions: [
                { value: null, text: "Select a Data Type", disabled: true },
            ],
            selectedData: null,
            dataset: null,
        };
    },
    methods: {
        ...mapActions(["fetchData"]),
        checkStoreForData() {
            const dataAttr = {
                kind: "meta",
                name: this.selectedSource,
                type: this.selectedGeoType,
            };
            const dataset = this.getData(dataAttr);
            if (dataset) {
                this.dataset = dataset;
            } else {
                this.fetchData(dataAttr);
            }
        },
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === "setData" && mutation.payload.kind === "meta") {
                const { name, type } = mutation.payload.data;
                if (
                    name === this.selectedSource &&
                    type === this.selectedGeoType
                ) {
                    this.dataset = mutation.payload.data;
                }
            }
        });
        if (this.selectedSource && this.selectedGeoType) {
            if (!this.dataset) {
                this.checkStoreForData();
            }
            if (
                this.dataset.name !== this.selectedSource ||
                this.dataset.type !== this.selectedGeoType
            ) {
                this.checkStoreForData();
            }
        }
    },
    updated() {
        if (this.selectedSource && this.selectedGeoType) {
            if (this.selectedSource in this.$store.state.meta) {
                if (
                    this.selectedGeoType in
                    this.$store.state.meta[this.selectedSource]
                ) {
                    this.dataset = this.$store.state.meta[this.selectedSource][
                        this.selectedGeoType
                    ];
                } else {
                    this.fetchData({
                        kind: "meta",
                        name: this.selectedSource,
                        type: this.selectedGeoType,
                    });
                }
            } else {
                this.fetchData({
                    kind: "meta",
                    name: this.selectedSource,
                    type: this.selectedGeoType,
                });
            }
        }
    },
    render() {
        return (
            <BModal
                id="select-data-modal"
                title="Select Parameters for Mobility Data"
            >
                <BFormGroup label="Select a Data Source:">
                    <BFormRadioGroup
                        id="select-source-radio-group"
                        vModel={this.selectedSource}
                        options={this.sourceOptions}
                    ></BFormRadioGroup>
                </BFormGroup>
                <BFormGroup label="Select a Region Type:">
                    <BFormRadioGroup
                        id="select-geo-type-radio-group"
                        vModel={this.selectedGeoType}
                        options={this.geoTypeOptions}
                    ></BFormRadioGroup>
                </BFormGroup>
                <BFormGroup>
                    <BFormSelect
                        vModel={this.selectedLocaton}
                        options={this.locationOptions}
                        disabled={this.locationOptions.length <= 1}
                    />
                </BFormGroup>

                <BFormGroup>
                    <BFormSelect
                        vModel={this.selectedData}
                        options={this.dataOptions}
                        disabled={this.dataOptions.length <= 1}
                    />
                </BFormGroup>
            </BModal>
        );
    },
};
