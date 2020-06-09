<template>
    <div class="navbar-container">
        <b-navbar toggleable="sm" type="dark" variant="info">
            <b-navbar-brand href="#">Mobility Dashboard</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item align="center" href="#">Search</b-nav-item>
                    <b-nav-item align="center" href="#">About</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item
                        align="center"
                        href="https://www.rearc.io"
                        target="_blank"
                    >
                        <icon-rearc class="d-inline-block align-top" />
                    </b-nav-item>
                    <b-nav-item
                        align="center"
                        href="https://github.com/rearc-data/mobility-dashboard"
                        target="_blank"
                    >
                        <icon-git-hub class="d-inline-block align-top" />
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import IconGitHub from "./icons/IconGitHub.vue";
import IconRearc from "./icons/IconRearc.vue";

export default {
    name: "NavBar",
    components: {
        IconGitHub,
        IconRearc
    }
};
</script>