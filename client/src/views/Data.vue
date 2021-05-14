<template>
  <DataContainer :dataset="dataset" />
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import DataContainer from '../components/DataContainer.vue'

export default {
  name: 'Data',
  components: {
    DataContainer
  },
  computed: {
    ...mapState('mobility', ['loading', 'error']),
    ...mapGetters('mobility', ['getMobilityData']),
    dataset () {
      return this.getMobilityData(this.$route.params)
    }
  },
  methods: {
    ...mapActions('mobility', ['fetchMobilityData']),
    checkForMobilityData () {
      const { name, type } = this.$route.params
      if (!this.loading) {
        if (
          !this.dataset ||
          this.dataset.name !== name ||
          this.dataset.type !== type
        ) {
          this.fetchMobilityData(this.$route.params)
        }
      }
    }
  },
  created () {
    this.checkForMobilityData()
  },
  updated () {
    this.checkForMobilityData()
  }
}
</script>
