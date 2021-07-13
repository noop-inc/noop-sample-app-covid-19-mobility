import { Line, mixins } from 'vue-chartjs'
export default {
  name: 'Graph',
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartOptions: {
      type: Object
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
