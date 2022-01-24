<template>
  <pre
    v-if="dataset"
    class="raw-data-container"
  >
    <code
ref="code"
class="language-json"
/>
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
  mounted () {
    this.$refs.code.innerHTML = this.formatRawData()
  },
  updated () {
    this.$refs.code.innerHTML = this.formatRawData()
  },
  methods: {
    formatRawData () {
      return JSON.stringify(this.dataset, null, 4)
    }
  }
}
</script>

<style>
.raw-data-container {
  margin-bottom: 0;
  padding: 12px;
}
</style>
