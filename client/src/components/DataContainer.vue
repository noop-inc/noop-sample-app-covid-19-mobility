<template>
  <BCard no-body>
    <BTabs card vertical pills no-fade>
      <BTab title="Chart" active :disabled="!!error">
        <section v-if="dataset" class="tab-content-container">
          <BLink
            v-if="$route.name !== 'Data'"
            class="data-content-link"
            :to="{
              name: 'Data',
              params: { name: dataset.name, type: dataset.type }
            }"
          >
            <h6 class="data-content-header">{{ headerText }}</h6>
          </BLink>
          <h6 v-else class="data-content-header">{{ headerText }}</h6>
          <section class="data-content-container border rounded">
            <Graph
              :styles="{ height: '100%' }"
              :chartData="formatData()"
              :chartOptions="formatOptions()"
            />
          </section>
        </section>
      </BTab>
      <BTab title="Table" :disabled="!!error">
        <section v-if="dataset" class="tab-content-container">
          <BLink
            v-if="$route.name !== 'Data'"
            class="data-content-link"
            :to="{
              name: 'Data',
              params: { name: dataset.name, type: dataset.type }
            }"
          >
            <h6 class="data-content-header">{{ headerText }}</h6>
          </BLink>
          <h6 v-else class="data-content-header">{{ headerText }}</h6>
          <section class="data-content-container border rounded">
            <Table :dataset="dataset" />
          </section>
        </section>
      </BTab>
      <BTab title="JSON" :disabled="!!error">
        <section v-if="dataset" class="tab-content-container">
          <BLink
            v-if="$route.name !== 'Data'"
            class="data-content-link"
            :to="{
              name: 'Data',
              params: { name: dataset.name, type: dataset.type }
            }"
          >
            <h6 class="data-content-header">{{ headerText }}</h6>
          </BLink>
          <h6 v-else class="data-content-header">{{ headerText }}</h6>
          <section class="data-content-container border rounded">
            <RawData :dataset="dataset" />
          </section>
        </section>
      </BTab>
      <ErrorMessage v-if="error && !dateset" />
    </BTabs>
  </BCard>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Graph from './Graph.js'
import Table from './Table.vue'
import RawData from './RawData.vue'
import ErrorMessage from './ErrorMessage.vue'
import colors from '../util/colors.js'
import { BTab, BTabs, BCard, BLink } from 'bootstrap-vue'

export default {
  name: 'DataContainer',
  components: {
    Graph,
    Table,
    RawData,
    ErrorMessage,
    BTab,
    BTabs,
    BCard,
    BLink
  },
  props: {
    dataset: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState('mobility', ['loading', 'error']),
    ...mapGetters('mobility', ['getMobilityData']),
    headerText () {
      return this.dataset
        ? `${this.dataset.type} mobility data for ${this.dataset.name} during the COVID-19 Pandemic`
        : null
    }
  },
  methods: {
    createdGradient () {
      return gradient
    },
    formatData () {
      if (this.dataset) {
        const data = [
          {
            x: this.dataset.data[0].date,
            y: this.dataset.data[0].value
          }
        ]
        const pointColor = [colors.yellow + '80']
        const pointHover = [colors.yellow + 'FF']
        for (let i = 1; i < this.dataset.data.length; i++) {
          const datum = this.dataset.data[i]
          data.push({ x: datum.date, y: datum.value })
          let color
          if (datum.value > data[i - 1].y) {
            color = colors.green
          } else if (datum.value < data[i - 1].y) {
            color = colors.red
          } else {
            color = colors.yellow
          }
          pointColor.push(color + '80')
          pointHover.push(color + 'FF')
        }
        return {
          datasets: [
            {
              data,
              borderColor: colors.primary + '40',
              backgroundColor: colors.primary + '40',
              pointBorderColor: pointColor,
              pointRadius: 3,
              pointHoverRadius: 6,
              pointHoverBorderColor: pointHover,
              pointBackgroundColor: pointColor,
              fill: 'start'
            }
          ]
        }
      } else {
        return null
      }
    },
    formatOptions () {
      return {
        maintainAspectRatio: false,
        responsive: true,
        animation: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                maxTicksLimit: 8,
                stepSize: 10
              },
              scaleLabel: {
                display: true,
                labelString: `Percent of Offset from Baseline (${
                  this.dataset.source === 'Apple' ? '10' : ''
                }0%)`,
                fontSize: 14
              }
            }
          ]
        },
        legend: false,
        tooltips: {
          xPadding: 8,
          yPadding: 8,
          bodyFontSize: 14,
          titleFontSize: 14,
          callbacks: {
            title: tooltipItem =>
              new Date(tooltipItem[0].xLabel).toLocaleDateString([], {
                dateStyle: 'medium'
              }),
            label: tooltipItem => `${tooltipItem.yLabel}%`
          }
        }
      }
    }
  }
}
</script>

<style>
.tab-content {
  overflow: hidden;
  height: calc(100vh - 103px);
}
.card {
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25),
    inset 0 -1px 5px rgba(0, 0, 0, 0.25);
}
.card .nav-link.active {
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25),
    inset 0 -1px 5px rgba(0, 0, 0, 0.25);
}
.card-header {
  padding: 12px 8px;
}
.tab-content-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 143px);
}
.data-content-link {
  color: var(--dark);
}
.data-content-header {
  min-height: 19px;
}
.data-content-container {
  overflow-y: scroll;
  background-color: var(--light);
  flex: 1;
}
</style>
