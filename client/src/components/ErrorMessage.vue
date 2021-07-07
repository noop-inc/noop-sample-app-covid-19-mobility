<template>
  <section class="data-error-container">
    <BJumbotron
      bg-variant="white"
      header="Page Not Found"
      lead="Content for this page is unavailable."
      fluid
      container-fluid
    >
      <BButton
        v-if="$route.name !== 'Home'"
        variant="primary"
        :to="{ name: 'Home' }"
      >
        Return to Home Page
      </BButton>
    </BJumbotron>
  </section>
</template>

<script>
import { BJumbotron, BButton } from 'bootstrap-vue'
export default {
  name: 'ErrorMessage',
  components: {
    BJumbotron,
    BButton
  }
}
</script>

<style>
.data-error-container {
  height: calc(100vh - 88px);
  overflow-y: scroll;

  
}
.data-error-container > .jumbotron {
  padding-bottom: 20px;
  margin: 0;
}

.data-error-container > .jumbotron  > .container-fluid {
  padding: 0 20px;
}
</style>
