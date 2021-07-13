import { getData } from '../../util/api'
import Vue from 'vue'
import {
  START_META_LOADING,
  RECEIVE_META_DATA,
  SET_META_ERROR
} from '../../util/types'

const state = () => ({
  data: {},
  loading: false,
  error: null
})

const getters = {
  getMetaData: state => ({ name, type }) => {
    if (name in state.data && type in state.data[name]) {
      return state.data[name][type]
    }
    return null
  }
}

const actions = {
  async fetchMetaData ({ commit }, { name, type }) {
    commit(START_META_LOADING)
    try {
      const data = await getData(name, type)
      commit(RECEIVE_META_DATA, data)
    } catch (err) {
      commit(SET_META_ERROR, err.response.data)
    }
  }
}

const mutations = {
  [START_META_LOADING] (state) {
    state.loading = true
  },
  [RECEIVE_META_DATA] (state, data) {
    if (!(data.name in state.data)) {
      Vue.set(state.data, data.name, { [data.type]: data })
    } else if (!(data.type in state.data[data.name])) {
      Vue.set(state.data[data.name], data.type, data)
    }
    state.loading = false
    state.error = null
  },
  [SET_META_ERROR] (state, error) {
    state.error = error
    state.loading = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
