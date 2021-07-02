<template>
  <BModal
    id="select-data-modal"
    ref="selectDataModal"
    title="Select COVID-19 Mobility Data"
    :ok-disabled="!selectedLocaton || !selectedData"
    @ok="handleOk"
    no-fade
    ok-only
  >
    <section class="selected-data-form">
      <BFormGroup label="Select a Data Source:">
        <BFormRadioGroup
          id="select-source-radio-group"
          v-model="selectedSource"
          :options="sourceOptions"
          :disabled="!!loading"
        />
      </BFormGroup>
      <BFormGroup label="Select a Region Type:">
        <BFormRadioGroup
          id="select-geo-type-radio-group"
          v-model="selectedGeoType"
          :options="geoTypeOptions"
          :disabled="!!loading"
        />
      </BFormGroup>
      <BFormGroup>
        <BFormSelect
          v-model="selectedLocaton"
          :options="locationOptions()"
          :disabled="!dataset"
        />
      </BFormGroup>
      <BFormGroup>
        <BFormSelect
          v-model="selectedData"
          :options="dataOptions()"
          :disabled="!dataset || !selectedLocaton"
        />
      </BFormGroup>
    </section>
  </BModal>
</template>

<script>
import { BModal, BFormGroup, BFormRadioGroup, BFormSelect } from 'bootstrap-vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'SelectDataModal',
  components: {
    BModal,
    BFormGroup,
    BFormRadioGroup,
    BFormSelect
  },
  computed: {
    ...mapState('home', {
      homeSource: state => state.source,
      homeGeo: state => state.geo,
      homeLocation: state => state.location,
      homeData: state => state.data
    }),
    ...mapState('meta', ['loading', 'error']),
    ...mapGetters('meta', ['getMetaData']),
    dataset () {
      return this.selectedSource && this.selectedGeoType
        ? this.getMetaData({
            name: this.selectedSource,
            type: this.selectedGeoType
          })
        : null
    },
    ...mapGetters('mobility', ['getMobilityData']),
    currentMobility () {
      return this.$route.name === 'Data'
        ? this.getMobilityData(this.$route.params)
        : null
    }
  },
  data () {
    return {
      // sourceOptions: ['Apple', 'Google'],
      sourceOptions: ['Apple'],
      selectedSource: null,
      geoTypeOptions: ['Countries', { value: 'States', text: 'United States' }],
      selectedGeoType: null,
      selectedLocaton: null,
      selectedData: null
    }
  },
  methods: {
    ...mapActions('meta', ['fetchMetaData']),
    checkForMetaData () {
      const source = this.dataset ? this.dataset.name : null
      const geo = this.dataset ? this.dataset.type : null
      if (!this.loading) {
        if (
          this.selectedSource &&
          this.selectedGeoType &&
          (this.selectedSource !== source || this.selectedGeoType !== geo)
        ) {
          this.fetchMetaData({
            name: this.selectedSource,
            type: this.selectedGeoType
          })
        }
      }
    },
    locationOptions () {
      const locationDefault = {
        value: this.dataset ? null : this.selectedLocaton,
        text: 'Select a Location',
        disabled: true
      }
      if (this.dataset) {
        return [
          locationDefault,
          ...Array.from(Object.keys(this.dataset.data)).sort()
        ]
      } else {
        return [locationDefault]
      }
    },
    dataOptions () {
      const dataDefault = {
        value: this.dataset ? null : this.selectedData,
        text: 'Select a Data Type',
        disabled: true
      }
      if (this.dataset && this.selectedLocaton in this.dataset.data) {
        return [
          dataDefault,
          ...Array.from(this.dataset.data[this.selectedLocaton]).sort()
        ]
      } else {
        return [dataDefault]
      }
    },
    formatSelectedLocation () {
      if (!this.dataset) {
        return null
      }
      return this.selectedLocaton
    },
    formatSelectedData () {
      if (!this.dataset) {
        return null
      }
      return this.selectedData
    },
    handleOk () {
      if (this.selectedLocaton && this.selectedData) {
        this.$router.push({
          name: 'Data',
          params: {
            name: this.selectedLocaton,
            type: this.selectedData
          }
        })
      }
    }
  },
  created () {
    this.checkForMetaData()
  },
  mounted () {
    this.$refs.selectDataModal.$on('show', () => {
      this.$emit('modal-visible')
    })
    this.$on('modal-visible', () => {
      if (this.$route.name === 'Home') {
        ;[
          this.selectedSource,
          this.selectedGeoType,
          this.selectedLocaton,
          this.selectedData
        ] = [this.homeSource, this.homeGeo, this.homeLocation, this.homeData]
      } else if (this.currentMobility) {
        const { source, geo, name, type } = this.currentMobility
        ;[
          this.selectedSource,
          this.selectedGeoType,
          this.selectedLocaton,
          this.selectedData
        ] = [source, geo, name, type]
      } else {
        ;[
          this.selectedSource,
          this.selectedGeoType,
          this.selectedLocaton,
          this.selectedData
        ] = [null, null, null, null]
      }
    })
  },
  updated () {
    if (this.dataset) {
      if (!(this.selectedLocaton in this.dataset.data)) {
        this.selectedLocaton = null
        this.selectedData = null
      } else if (
        !this.dataset.data[this.selectedLocaton].includes(this.selectedData)
      ) {
        this.selectedData = null
      }
    }

    this.checkForMetaData()
  }
}
</script>
