import IconGitHub from "./icons/IconGitHub";
import IconRearc from "./icons/IconRearc";
import SelectDataModal from "./SelectDataModal";
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
    directives: {
        BModal: VBModal,
    },
    render() {
        return (
            <div class="navbar-container">
                <BNavbar toggleable="sm" type="dark" variant="dark">
                    <BNavbarBrand href="#">Mobility Dashboard</BNavbarBrand>
                    <BNavbarToggle target="nav-collapse" />
                    <BCollapse id="nav-collapse" is-nav>
                        <BNavbarNav>
                            <BNavItem align="center" VBModal_select-data-modal>
                                Select Data
                            </BNavItem>
                            <BNavItem align="center" href="#">
                                About
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
                                href="https://github.com/rearc-data/mobility-dashboard"
                                target="_blank"
                            >
                                <IconGitHub class="d-inline-block align-top" />
                            </BNavItem>
                        </BNavbarNav>
                    </BCollapse>
                </BNavbar>
                <SelectDataModal />
            </div>
        );
    },
};
