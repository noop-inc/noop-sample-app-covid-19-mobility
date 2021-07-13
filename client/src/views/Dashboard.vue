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
      return this.getMobilityData(
        this.$route.name === 'Home'
          ? {
            name: this.location,
            type: this.data
          }
          : this.$route.params
      )
    }
  },
  methods: {
    ...mapActions('home', ['assignHomeData', 'removeHomeData']),
    ...mapActions(['fetchRandomData']),
    ...mapActions('mobility', ['fetchMobilityData']),
    checkForRandomData () {
      if (!this.loading && this.$route.name === 'Home') {
        if (!this.source || !this.geo || !this.location || !this.data) {
          const homeDataParams = this.getRandomData()
          if (homeDataParams !== null) {
            this.assignHomeData(homeDataParams)
          } else {
            this.fetchRandomData()
          }
        }
      }
    },
    checkForMobilityData () {
      const { name, type } = this.$route.params
      if (!this.loading && this.$route.name === 'Data') {
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
    this.$route.name === 'Home'
      ? this.checkForRandomData()
      : this.checkForMobilityData()
  },
  updated () {
    this.$route.name === 'Home'
      ? this.checkForRandomData()
      : this.checkForMobilityData()
  },
  watch: {
    $route (to){
      if (to.name !== 'Home') this.removeHomeData()
    }
  }
}
</script>
