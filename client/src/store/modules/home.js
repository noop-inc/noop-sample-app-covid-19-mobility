import {
  SET_HOME_DATA,
  CLEAR_HOME_DATA,
  CLEAR_MOBILITY_ERROR
} from '../../util/types'

const state = () => ({
  source: null,
  geo: null,
  location: null,
  data: null
})

const actions = {
  assignHomeData ({ commit }, data) {
    commit(SET_HOME_DATA, data)
    commit('mobility/' + CLEAR_MOBILITY_ERROR, null, { root: true })
  },
  removeHomeData ({ commit }) {
    commit(CLEAR_HOME_DATA)
  }
}

const mutations = {
  [SET_HOME_DATA] (state, { source, geo, location, data }) {
    state.source = source
    state.geo = geo
    state.location = location
    state.data = data
  },
  [CLEAR_HOME_DATA] (state) {
    state.source = null
    state.geo = null
    state.location = null
    state.data = null
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
