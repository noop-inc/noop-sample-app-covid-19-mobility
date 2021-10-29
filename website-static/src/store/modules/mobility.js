import { getData } from '../../util/api'
import Vue from 'vue'
import {
  START_MOBILITY_LOADING,
  RECEIVE_MOBILITY_DATA,
  SET_MOBILITY_ERROR,
  CLEAR_MOBILITY_ERROR
} from '../../util/types'

const state = () => ({
  data: {},
  loading: false,
  error: null
})

const getters = {
  getMobilityData: state => ({ name, type }) => {
    if (name in state.data && type in state.data[name]) {
      return state.data[name][type]
    }
    return null
  },
  getRandomData: state => () => {
    if (Object.keys(state.data).length) {
      const randomLocation = Object.keys(state.data)[
        Math.floor(Math.random() * Object.keys(state.data).length)
      ]
      const randomData = Object.keys(state.data[randomLocation])[
        Math.floor(
          Math.random() * Object.keys(state.data[randomLocation]).length
        )
      ]
      const { name, type, source, geo } = state.data[randomLocation][randomData]
      return { source, geo, location: name, data: type }
    } else {
      return null
    }
  }
}

const actions = {
  async fetchMobilityData ({ commit }, { name, type }) {
    commit(START_MOBILITY_LOADING)
    try {
      const data = await getData(name, type)
      commit(RECEIVE_MOBILITY_DATA, data)
    } catch (err) {
      commit(SET_MOBILITY_ERROR, err.response.data)
    }
  }
}

const mutations = {
  [START_MOBILITY_LOADING] (state) {
    state.loading = true
  },
  [RECEIVE_MOBILITY_DATA] (state, data) {
    if (!(data.name in state.data)) {
      Vue.set(state.data, data.name, { [data.type]: data })
    } else if (!(data.type in state.data[data.name])) {
      Vue.set(state.data[data.name], data.type, data)
    }
    state.loading = false
    state.error = null
  },
  [SET_MOBILITY_ERROR] (state, error) {
    state.error = error
    state.loading = false
  },
  [CLEAR_MOBILITY_ERROR] (state) {
    state.error = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
