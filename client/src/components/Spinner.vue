<template>
  <section
    v-if="mobilityLoading || metaLoading"
    class="loading-spinner-container"
  >
    <div class="spinner-backdrop" />
    <div class="spinner-position">
      <GridLoader :color="`var(--${color})`" :size="`${size}px`" />
    </div>
  </section>
</template>

<script>
import GridLoader from 'vue-spinner/src/GridLoader.vue'
import { mapState } from 'vuex'

export default {
  name: 'LoadingSpinner',
  components: {
    GridLoader
  },
  props: {
    size: {
      type: Number,
      default: 48
    },
    color: {
      type: String,
      default: 'light'
    }
  },
  computed: {
    ...mapState('mobility', { mobilityLoading: state => state.loading }),
    ...mapState('meta', { metaLoading: state => state.loading })
  }
}
</script>

<style>
.loading-spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
}

.loading-spinner-container .spinner-backdrop {
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
.loading-spinner-container > .spinner-position {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
