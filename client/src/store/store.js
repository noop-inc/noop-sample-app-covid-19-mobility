import Vue from "vue";
import Vuex from "vuex";
import meta from "./modules/meta";
import mobility from "./modules/moblity";

Vue.use(Vuex);

const dev = process.env.NODE_ENV !== "production";

let createLogger;

if (dev) {
    createLogger = require("vuex/dist/logger");
}

export default new Vuex.Store({
    modules: {
        meta,
        mobility,
    },
    plugins: dev ? [createLogger()] : [],
    strict: dev,
});
