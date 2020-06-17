import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

const getApiUtil = (name, type) => Axios.get(`/api/${name}/${type}`);

const state = {
    meta: {},
    mobility: {},
    isLoading: false,
    error: null,
};

const getters = {
    isLoading: (state) => state.isLoading,
    getData: (state) => ({ kind, name, type }) => {
        if (name in state[kind]) {
            if (type in state[kind][name]) {
                return state[kind][name][type];
            }
        }
        return null;
    },
};

const actions = {
    fetchData({ commit, state }, { kind, name, type }) {
        commit("setLoading");
        getApiUtil(name, type)
            .then((res) => {
                commit("setData", { kind, data: res.data });
            })
            .catch((err) => {
                commit("setError", err.response.data);
            });
    },
};

const mutations = {
    setLoading(state) {
        state.isLoading = true;
    },
    setData(state, { kind, data }) {
        state.isLoading = false;

        if (data.name in state[kind]) {
            if (!(data.type in state[kind][data.name])) {
                state[kind][data.name] = Object.assign(state[kind][data.name], {
                    [data.type]: data,
                });
            }
        } else {
            state[kind][data.name] = { [data.type]: data };
        }
        state.error = null;
    },
    setError(state, data) {
        state.error = data.error;
        state.isLoading = false;
    },
};

const dev = process.env.NODE_ENV !== "production";

let createLogger;

if (dev) {
    createLogger = require("vuex/dist/logger");
}

export default new Vuex.Store({
    plugins: dev ? [createLogger()] : [],
    strict: dev,
    state,
    getters,
    mutations,
    actions,
});
