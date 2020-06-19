import * as APIUtil from "../../util/api";
import Vue from "vue";
import {
    START_META_LOADING,
    RECEIVE_META_DATA,
    SET_META_ERROR,
} from "../../util/types";

const dev = process.env.NODE_ENV !== "production";

const state = () => ({
    data: {},
    loading: false,
    error: null,
});

const getters = {
    getMetaByParams: (state) => ({ name, type }) => {
        if (name in state.data && type in state.data[name]) {
            return state[data][name][type];
        }
        return null;
    },
};

const actions = {
    getMetaData({ commit }, { name, type }) {
        commit(START_META_LOADING);
        APIUtil.getData(name, type)
            .then((res) =>
                setTimeout(
                    () => commit(RECEIVE_META_DATA, res.data),
                    dev ? 0 : 1500
                )
            )
            .catch((err) =>
                setTimeout(
                    () => commit(SET_META_ERROR, err.response.data),
                    dev ? 0 : 1500
                )
            );
    },
};

const mutations = {
    [START_META_LOADING](state) {
        state.loading = true;
    },
    [RECEIVE_META_DATA](state, data) {
        if (!(data.name in state.data)) {
            Vue.set(state.data, data.name, { [data.type]: data });
        } else if (!(data.type in state.data[data.name])) {
            Vue.set(state.data[data.name], data.type, data);
        }
        if (state.loading) Vue.set(state, loading, false);
        if (state.error) Vue.set(state, error, null);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
