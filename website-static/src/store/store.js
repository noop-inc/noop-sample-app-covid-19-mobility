import Vue from 'vue'
import Vuex from 'vuex'
import meta from './modules/meta'
import mobility from './modules/moblity'
import home from './modules/home'
import { getRandom } from '../util/api'
import {
  START_MOBILITY_LOADING,
  START_META_LOADING,
  RECEIVE_MOBILITY_DATA,
  RECEIVE_META_DATA,
  SET_MOBILITY_ERROR,
  SET_META_ERROR,
  SET_HOME_DATA
} from '../util/types'

Vue.use(Vuex)

const actions = {
  async fetchRandomData ({ commit }) {
    commit('mobility/' + START_MOBILITY_LOADING, null, { root: true })
    commit('meta/' + START_META_LOADING, null, { root: true })
    try {
      const data = await getRandom()
      commit('mobility/' + RECEIVE_MOBILITY_DATA, data.mobility, {
        root: true
      })
      commit('meta/' + RECEIVE_META_DATA, data.meta, {
        root: true
      })
      commit(
        'home/' + SET_HOME_DATA,
        {
          source: data.mobility.source,
          geo: data.mobility.geo,
          location: data.mobility.name,
          data: data.mobility.type
        },
        { root: true }
      )
    } catch (err) {
      commit('mobility/' + SET_MOBILITY_ERROR, err.response.data, {
        root: true
      })
      commit('meta/' + SET_META_ERROR, err.response.data, {
        root: true
      })
    }
  }
}

export default new Vuex.Store({
  modules: {
    home,
    meta,
    mobility
  },
  actions
})
