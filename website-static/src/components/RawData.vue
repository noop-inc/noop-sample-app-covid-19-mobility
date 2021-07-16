<template>
  <pre v-if="dataset" class="raw-data-container">
    <code class="language-json" ref="code" />
  </pre>
</template>

<script>
export default {
  name: 'RawData',
  props: {
    dataset: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatRawData () {
      return JSON.stringify(this.dataset, null, 4)
    }
  },
  mounted () {
    this.$refs.code.innerHTML = this.formatRawData()
  },
  updated () {
    this.$refs.code.innerHTML = this.formatRawData()
  }
}
</script>

<style>
.raw-data-container {
  margin-bottom: 0;
  padding: 12px;
}
</style>
