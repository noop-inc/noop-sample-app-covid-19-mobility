import Vue from "vue";
import Vuex from "vuex";
import meta from "./modules/meta";
import mobility from "./modules/moblity";

const dev = process.env.NODE_ENV !== "production";

let createLogger;

if (dev) {
    createLogger = require("vuex/dist/logger");
}

Vue.use(Vuex);

// const APIUtil = (name, type) => Axios.get(`/api/${name}/${type}`);

// const state = {
//     meta: {},
//     mobility: {},
//     isLoading: false,
//     error: null,
// };

// const getters = {
//     getDataByParams: (state) => ({ kind, name, type }) => {
//         if (name in state[kind]) {
//             if (type in state[kind][name]) {
//                 return state[kind][name][type];
//             }
//         }
//         return null;
//     },
// };

// const actions = {
//     fetchData({ commit }, { kind, name, type }) {
//         commit("setLoading");
//         APIUtil(name, type)
//             .then((res) => {
//                 dev
//                     ? setTimeout(
//                           () => commit("setData", { kind, data: res.data }),
//                           1500
//                       )
//                     : commit("setData", { kind, data: res.data });
//             })
//             .catch((err) => {
//                 dev
//                     ? setTimeout(
//                           () => commit("setError", err.response.data),
//                           1500
//                       )
//                     : commit("setError", err.response.data);
//             });
//     },
// };

// const mutations = {
//     setLoading(state) {
//         state.isLoading = true;
//     },
//     setData(state, { kind, data }) {
//         state.isLoading = false;

//         if (data.name in state[kind]) {
//             if (!(data.type in state[kind][data.name])) {
//                 Vue.set(state[kind][data.name], data.type, data);
//             }
//         } else {
//             Vue.set(state[kind], data.name, { [data.type]: data });
//         }
//         state.error = null;
//     },
//     setError(state, data) {
//         state.error = data.error;
//         state.isLoading = false;
//     },
// };

export default new Vuex.Store({
    modules: {
        meta,
        mobility,
    },
    plugins: dev ? [createLogger()] : [],
    strict: dev,
});
