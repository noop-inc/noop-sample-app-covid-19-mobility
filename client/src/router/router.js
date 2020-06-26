import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Data from "../views/Data.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/About",
        name: "About",
        component: About,
    },
    {
        path: "/:name/:type",
        name: "Data",
        component: Data,
    },
];

const router = new VueRouter({
    mode: process.env.NODE_ENV !== "production" ? "hash" : "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});

export default router;
