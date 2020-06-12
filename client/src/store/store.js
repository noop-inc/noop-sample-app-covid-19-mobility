import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

const getApiUtil = (name, type) => Axios.get(`/api/${name}/${type}`);

const state = {
    meta: {},
    mobility: {},
    isLoading: false,
};

const getters = {
    isLoading(state) {
        return state.isLoading;
    },
};

const mutations = {
    FETCH_START(state) {
        state.isLoading = true;
    },
    FETCH_END(state, type, data) {
        state.isLoading = false;
        state[type][data.name][data.type] = data;
    },
};

const actions = {
    FETCH_DATA({ commit }, type, params) {
        commit(FETCH_START);
        return getApiUtil(params.name, params.type)
            .then((data) => {
                commit(FETCH_END, type, data);
            })
            .catch((error) => {
                throw new Error(error);
            });
    },
};

const createStore = () => {
    if (process.env.NODE_ENV !== "production") {
        const createLogger = require("vuex/dist/logger");
        return {
            plugins: [createLogger()],
            state,
            getters,
            mutations,
            actions,
        };
    } else {
        return {
            state,
            getters,
            mutations,
            actions,
        };
    }
};

export default new Vuex.Store(createStore());
