<template>
  <header class="navbar-container">
    <BNavbar fixed="top" toggleable="sm" type="dark" variant="primary">
      <BNavbarBrand
        :to="$route.name !== 'Home' ? { name: 'Home' } : null"
        :style="$route.name === 'Home' ? { cursor: 'default' } : null"
      >
        COVID-19 Mobility
      </BNavbarBrand>
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav>
          <BNavItem align="center" v-b-modal.select-data-modal>
            Select Data
          </BNavItem>
        </BNavbarNav>
        <BNavbarNav class="ml-auto">
          <BNavItem
            align="center"
            href="https://noop.app/"
            target="_blank"
            v-b-tooltip.hover.noFade
            title="Visit Noop Cloud"
            class="navbar-icons"
          >
            <IconNoop class="d-inline-block align-top" />
          </BNavItem>
          <BNavItem
            align="center"
            href="https://github.com/noop-cloud/noop-sample-app-covid-19-mobility"
            target="_blank"
            v-b-tooltip.hover.noFade
            title="View source code on GitHub"
            class="navbar-icons"
          >
            <IconGitHub class="d-inline-block align-top" />
          </BNavItem>
        </BNavbarNav>
      </BCollapse>
    </BNavbar>
    <SelectDataModal />
  </header>
</template>

<script>
import IconGitHub from './icons/IconGitHub.vue'
import IconNoop from './icons/IconNoop.vue'
import SelectDataModal from './SelectDataModal.vue'
import {
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse,
  BNavbarNav,
  BNavItem,
  VBModal,
  VBTooltip
} from 'bootstrap-vue'

export default {
  name: 'NavBar',
  components: {
    IconGitHub,
    IconNoop,
    SelectDataModal,
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavbarNav,
    BNavItem
  },
  directives: {
    BModal: VBModal,
    BTooltip: VBTooltip
  }
}
</script>

<style>
.navbar,
.modal-content {
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25),
    inset 0 -1px 5px rgba(0, 0, 0, 0.25);
}
.navbar-dark .navbar-nav .nav-link {
  color: rgb(127, 189, 255) !important;
}

.navbar-dark .navbar-nav .nav-link:hover {
  color: rgb(255, 255, 255) !important;
}
</style>
