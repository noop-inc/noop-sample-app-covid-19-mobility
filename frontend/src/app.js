import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.config.productionTip = process.env.NODE_ENV === "production" ? true : false;
Vue.config.devtools = process.env.NODE_ENV === "production" ? false : true;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
