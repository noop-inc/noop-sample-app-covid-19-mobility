import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";

Vue.config.productionTip = process.env.NODE_ENV === "production" ? true : false;
Vue.config.devtools = process.env.NODE_ENV === "production" ? false : true;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#root");
