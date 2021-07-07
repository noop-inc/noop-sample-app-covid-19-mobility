<template>
  <footer class="footer-container">
    <div>
      Developed by{{ ' ' }}
      <BLink href="https://noop.app/" target="_blank">
        Noop Inc.
      </BLink>
    </div>
    <div class="divider" />
    <div>
      Leveraging the{{ ' ' }}
      <BLink href="https://noop.app/" target="_blank"> Noop </BLink>{{ ' ' }}
      Platform
    </div>
  </footer>
</template>

<script>
import { BLink } from 'bootstrap-vue'
export default {
  name: 'Footer',
  components: {
    BLink
  }
}
</script>

<style>
.footer-container {
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 12px;
  line-height: 12px;
  margin: 9px 0;
}

.footer-container div {
  display: inline-block;
  font-weight: 400;
  color: var(--light);
  text-shadow: 1px 1px var(--dark);
}

.footer-container div:first-of-type {
  padding-right: 16px;
}

.footer-container div:last-of-type {
  padding-left: 16px;
}

.footer-container .divider {
  height: 12px;
  vertical-align: top;
  border-right: var(--light) solid 1px;
}

.footer-container a {
  color: var(--light);
  text-shadow: 1px 1px var(--dark);
  font-weight: 600;
}

.footer-container a:hover {
  color: white;
}
</style>
