<template>
  <DataContainer :dataset="dataset" />
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import DataContainer from '../components/DataContainer.vue'

export default {
  name: 'Home',
  components: {
    DataContainer
  },
  computed: {
    ...mapState('home', ['source', 'geo', 'location', 'data']),
    ...mapState('mobility', ['loading', 'error']),
    ...mapGetters('mobility', ['getMobilityData', 'getRandomData']),
    dataset () {
      return this.getMobilityData({
        name: this.location,
        type: this.data
      })
    }
  },
  methods: {
    ...mapActions('home', ['assignHomeData', 'removeHomeData']),
    ...mapActions(['fetchRandomData']),
    checkForRandomData () {
      if (!this.loading) {
        if (!this.source || !this.geo || !this.location || !this.data) {
          const homeDataParams = this.getRandomData()
          if (homeDataParams !== null) {
            this.assignHomeData(homeDataParams)
          } else {
            this.fetchRandomData()
          }
        }
      }
    }
  },
  created () {
    this.checkForRandomData()
  },
  updated () {
    this.checkForRandomData()
  },
  beforeDestroy () {
    this.removeHomeData()
  }
}
</script>
