<template>
  <BTable
    v-if="dataset"
    hover
    head-variant="light"
    sticky-header="100%"
    :items="items"
    :fields="fields"
    :style="{ marginBottom: 0 }"
  />
</template>

<script>
import { BTable } from 'bootstrap-vue'
import moment from 'moment'

export default {
  name: 'Table',
  components: {
    BTable
  },
  props: {
    dataset: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      items: null,
      fields: [
        {
          key: 'date',
          label: 'Date'
        },
        {
          key: 'value',
          label: this.dataset
            ? `Percent of Offset from Baseline (${
                this.dataset.source === 'Apple' ? '10' : ''
              }0%)`
            : null
        }
      ]
    }
  },
  methods: {
    formatTable () {
      if (this.dataset) {
        const data = [
          {
            date: moment(this.dataset.data[0].date).format('MMMM Do, YYYY'),
            value: `${this.dataset.data[0].value}%`,
            _rowVariant: 'warning'
          }
        ]

        for (let i = 1; i < this.dataset.data.length; i++) {
          const datum = this.dataset.data[i]
          let color
          if (datum.value > this.dataset.data[i - 1].value) {
            color = 'success'
          } else if (datum.value < this.dataset.data[i - 1].value) {
            color = 'danger'
          } else {
            color = 'warning'
          }
          data.push({
            date: moment(datum.date).format('MMMM Do, YYYY'),
            value: `${datum.value}%`,
            _rowVariant: color
          })
        }
        return data
      } else {
        return null
      }
    }
  },
  created () {
    this.items = this.formatTable()
  },
  updated () {
    this.items = this.formatTable()
  }
}
</script>

<style lang="scss">
.b-table-sticky-header > .table.b-table > thead > tr > th {
  border-top: 0;
}
</style>
