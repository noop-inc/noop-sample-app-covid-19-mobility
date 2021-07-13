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

<style>
.raw-data-container {
  margin-bottom: 0;
  padding: 12px;
}

.language-json .token {
  text-shadow: 0 -0.1em 0.2em white;
  background: none;
}

.language-json .token.punctuation, .language-json .token.operator {
  color: var(--secondary);
}

.language-json .token.property {
  color: var(--cyan);
}

.language-json .token.string {
  color: var(--orange);
}

.language-json .token.number {
  color: var(--green);
}
</style>
