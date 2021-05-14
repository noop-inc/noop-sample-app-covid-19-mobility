<template>
  <pre v-if="dataset" class="raw-data-container">
    <code class="language-json" ref="code" />
  </pre>
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/components/prism-json.min'

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
      return Prism.highlight(
        JSON.stringify(this.dataset, null, 4),
        Prism.languages.json
      )
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

<style lang="scss">
.raw-data-container {
  margin-bottom: 0;
  padding: 12px;
}

.language-json {
  .token {
    text-shadow: 0 -0.1em 0.2em white;
    background: none;
  }
  .token.punctuation,
  .token.operator {
    color: var(--secondary);
  }
  .token.property {
    color: var(--cyan);
  }
  .token.string {
    color: var(--orange);
  }
  .token.number {
    color: var(--green);
  }
}
</style>
