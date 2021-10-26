import { Line, mixins } from 'vue-chartjs'
import 'chartjs-adapter-moment'
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
