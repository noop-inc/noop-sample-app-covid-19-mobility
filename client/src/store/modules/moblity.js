import { getData } from "../../util/api";
import Vue from "vue";
import {
    START_MOBILITY_LOADING,
    RECEIVE_MOBILITY_DATA,
    SET_MOBILITY_ERROR,
} from "../../util/types";

const dev = process.env.NODE_ENV !== "production";

const state = () => ({
    data: {},
    loading: false,
    error: null,
});

const getters = {
    getMobilityData: (state) => ({ name, type }) => {
        if (name in state.data && type in state.data[name]) {
            return state.data[name][type];
        }
        return null;
    },
    getRandomData: (state) => () => {
        if (Object.keys(state.data).length) {
            const randomLocation = Object.keys(state.data)[
                Math.floor(Math.random() * Object.keys(state.data).length)
            ];
            const randomData = Object.keys(state.data[randomLocation])[
                Math.floor(
                    Math.random() *
                        Object.keys(state.data[randomLocation]).length
                )
            ];
            const { name, type, source, geo } = state.data[randomLocation][
                randomData
            ];
            return { source, geo, location: name, data: type };
        } else {
            return null;
        }
    },
};

const actions = {
    fetchMobilityData({ commit }, { name, type }) {
        commit(START_MOBILITY_LOADING);
        getData(name, type)
            .then((res) =>
                setTimeout(
                    () => commit(RECEIVE_MOBILITY_DATA, res.data),
                    dev ? 200 : 0
                )
            )
            .catch((err) =>
                setTimeout(
                    () => commit(SET_MOBILITY_ERROR, err.response.data),
                    dev ? 200 : 0
                )
            );
    },
};

const mutations = {
    [START_MOBILITY_LOADING](state) {
        state.loading = true;
    },
    [RECEIVE_MOBILITY_DATA](state, data) {
        if (!(data.name in state.data)) {
            Vue.set(state.data, data.name, { [data.type]: data });
        } else if (!(data.type in state.data[data.name])) {
            Vue.set(state.data[data.name], data.type, data);
        }
        state.loading = false;
        state.error = null;
    },
    [SET_MOBILITY_ERROR](state, data) {
        state.error = data.error;
        state.loading = false;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
