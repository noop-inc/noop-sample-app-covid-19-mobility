<script>
import IconGitHub from './icons/IconGitHub'
import IconRearc from './icons/IconRearc'
import IconInfo from './icons/IconInfo'
import SelectDataModal from './SelectDataModal'
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
  directives: {
    BModal: VBModal,
    BTooltip: VBTooltip
  },
  render () {
    return (
      <header class='navbar-container'>
        <BNavbar fixed='top' toggleable='sm' type='dark' variant='danger'>
          <BNavbarBrand
            to={this.$route.name !== 'Home' ? { name: 'Home' } : null}
            style={this.$route.name === 'Home' ? 'cursor: default;' : null}
          >
            COVID-19 Mobility
          </BNavbarBrand>
          <BNavbarToggle target='nav-collapse' />
          <BCollapse id='nav-collapse' is-nav>
            <BNavbarNav>
              <BNavItem align='center' VBModal_select-data-modal>
                Select Data
              </BNavItem>
            </BNavbarNav>
            <BNavbarNav class='ml-auto'>
              <BNavItem
                align='center'
                href='https://www.rearc.io'
                target='_blank'
                VBTooltip_hover_noFade
                title="Visit Rearc's Website"
              >
                <IconRearc class='d-inline-block align-top' />
              </BNavItem>
              <BNavItem
                align='center'
                href='https://github.com/noop-cloud/noop-sample-app-covid-19-mobility'
                target='_blank'
                VBTooltip_hover_noFade
                title='View source code on GitHub'
              >
                <IconGitHub class='d-inline-block align-top' />
              </BNavItem>
            </BNavbarNav>
          </BCollapse>
        </BNavbar>
        <SelectDataModal />
      </header>
    )
  }
}
</script>

<style lang="scss">
.navbar,
.modal-content {
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25),
    inset 0 -1px 5px rgba(0, 0, 0, 0.25);
}
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: var(--danger) !important;
  background-color: var(--danger) !important;
}
</style>
