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
        ...mapState("meta", ["loading", "error"]),
        ...mapGetters("meta", ["getMetaData"]),
        dataset() {
            return this.selectedSource && this.selectedGeoType
                ? this.getMetaData({
                      name: this.selectedSource,
                      type: this.selectedGeoType,
                  })
                : null;
        },
        ...mapGetters("mobility", ["getMobilityData"]),
        currentMobility() {
            return this.$route.name === "Graph"
                ? this.getMobilityData(this.$route.params)
                : null;
        },
    },
    data() {
        return {
            sourceOptions: ["Apple", "Google"],
            selectedSource: null,
            geoTypeOptions: [
                "Countries",
                { value: "States", text: "United States" },
            ],
            selectedGeoType: null,
            locationDefault: [
                { value: null, text: "Select a Location", disabled: true },
            ],
            selectedLocaton: null,
            dataDefault: [
                { value: null, text: "Select a Data Type", disabled: true },
            ],
            selectedData: null,
        };
    },
    methods: {
        ...mapActions("meta", ["fetchMetaData"]),
        checkForMetaData() {
            const source = this.dataset ? this.dataset.name : null;
            const geo = this.dataset ? this.dataset.type : null;
            if (
                this.selectedSource &&
                this.selectedGeoType &&
                (this.selectedSource !== source || this.selectedGeoType !== geo)
            ) {
                // this.locationOptions = [this.locationOptions[0]];
                // this.dataOptions = [this.dataOptions.slice[0]];
                Object.assign(this.selectedLocaton, null);
                Object.assign(this.selectedData, null);
                this.fetchMetaData({
                    name: this.selectedSource,
                    type: this.selectedGeoType,
                });
            }
        },
    },
    created() {
        this.$root.$on("bv::modal::show", () => {
            if (this.currentMobility) {
                const { source, geo, name, type } = this.currentMobility;
                this.selectedSource = source;
                this.selectedGeoType = geo;
                this.selectedLocaton = name;
                this.selectedData = type;
            }
        });
        this.checkForMetaData();
    },
    updated() {

        this.checkForMetaData();
        
    },
    render() {
        debugger
        if (this.dataset) {
            console.log(this.dataset);
        }
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
                        options={this.dataset ? [...this.locationDefault, ...Array.from(Object.keys(this.dataset.data)).sort()] : this.locationDefault}
                        disabled={!this.dataset}
                    />
                </BFormGroup>

                <BFormGroup>
                    <BFormSelect
                        vModel={this.selectedData}
                        options={this.dataset && this.selectedLocaton ? [...this.dataDefault, ...Array.from(this.dataset.data[this.selectedLocaton]).sort()] : this.dataDefault}
                        disabled={!this.dataset || !this.selectedLocaton}
                    />
                </BFormGroup>
            </BModal>
        );
    },
};
