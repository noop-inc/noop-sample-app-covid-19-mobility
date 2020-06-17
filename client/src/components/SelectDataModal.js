import { BModal, BFormGroup, BFormRadioGroup, BFormSelect } from "bootstrap-vue";

export default {
    name: "SelectDataModal",
    data() {
        return {
            sourceOptions: ["Apple", "Google"],
            selectedSource: null,
            geoTypeOptions: ["Countries", "United States"],
            selectedGeoType: null,
            locationOptions: [
                { value: null, text: "Select a Location", disabled: true },
            ],
            selectedLocaton: null,
            dataOptions: [
                { value: null, text: "Select a Data Type", disabled: true },
            ],
            selectedData: null,
        };
    },
    methods: {},
    render() {
        console.log(this.$store)
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
