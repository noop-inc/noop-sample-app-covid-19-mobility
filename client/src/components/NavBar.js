import IconGitHub from "./icons/IconGitHub";
import IconRearc from "./icons/IconRearc";
import SelectDataModal from "./SelectDataModal.vue";
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
        console.log(this.$router);
        return (
            <div class="navbar-container">
                <BNavbar fixed="top" toggleable="sm" type="dark" variant="dark">
                    <BNavbarBrand
                        href="#"
                        onClick={() =>
                            this.$router.history.current.name !== "Home"
                                ? this.$router.push("/")
                                : null
                        }
                    >
                        Mobility Data Dashboard
                    </BNavbarBrand>
                    <BNavbarToggle target="nav-collapse" />
                    <BCollapse id="nav-collapse" is-nav>
                        <BNavbarNav>
                            <BNavItem align="center" VBModal_select-data-modal>
                                Select Data
                            </BNavItem>
                            <BNavItem
                                align="center"
                                onClick={() =>
                                    this.$router.history.current.name !== "About"
                                        ? this.$router.push("/about")
                                        : null
                                }
                                href="#"
                            >
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
