import IconGitHub from "./icons/IconGitHub";
import IconRearc from "./icons/IconRearc";
import IconInfo from "./icons/IconInfo";
import SelectDataModal from "./SelectDataModal.vue";
import InfoModal from "./InfoModal.vue";
import {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavbarNav,
    BNavItem,
    VBModal,
} from "bootstrap-vue";

export default {
    name: "NavBar",
    directives: {
        BModal: VBModal,
    },
    render() {
        return (
            <div class="navbar-container">
                <BNavbar
                    fixed="top"
                    toggleable="sm"
                    type="dark"
                    variant="primary"
                >
                    <BNavbarBrand to="/">Mobility Data Dashboard</BNavbarBrand>
                    <BNavbarToggle target="nav-collapse" />
                    <BCollapse id="nav-collapse" is-nav>
                        <BNavbarNav>
                            <BNavItem align="center" VBModal_select-data-modal>
                                Select Data
                            </BNavItem>
                        </BNavbarNav>
                        <BNavbarNav class="ml-auto">
                            <BNavItem
                                align="center"
                                href="https://www.rearc.io"
                                target="_blank"
                            >
                                <IconRearc class="d-inline-block align-top" />
                            </BNavItem>
                            <BNavItem
                                align="center"
                                href="https://github.com/noop-cloud/mobility-dashboard"
                                target="_blank"
                            >
                                <IconGitHub class="d-inline-block align-top" />
                            </BNavItem>
                            <BNavItem align="center" VBModal_info-modal>
                                <IconInfo class="d-inline-block align-top" />
                            </BNavItem>
                        </BNavbarNav>
                    </BCollapse>
                </BNavbar>
                <SelectDataModal />
                <InfoModal />
            </div>
        );
    },
};
