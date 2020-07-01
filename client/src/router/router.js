import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Data from "../views/Data";
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/:name/:type",
        name: "Data",
        component: Data,
    },
    {
        path: "*",
        name: "PageNotFound",
        component: PageNotFound,
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
