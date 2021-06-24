import { createStore, createLogger } from 'vuex'
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

const dev = process.env.NODE_ENV !== 'production'

const actions = {
  fetchRandomData ({ commit }) {
    commit('mobility/' + START_MOBILITY_LOADING, null, { root: true })
    commit('meta/' + START_META_LOADING, null, { root: true })
    getRandom()
      .then(res =>
        setTimeout(
          () => {
            commit('mobility/' + RECEIVE_MOBILITY_DATA, res.data.mobility, {
              root: true
            })
            commit('meta/' + RECEIVE_META_DATA, res.data.meta, {
              root: true
            })
            commit(
              'home/' + SET_HOME_DATA,
              {
                source: res.data.mobility.source,
                geo: res.data.mobility.geo,
                location: res.data.mobility.name,
                data: res.data.mobility.type
              },
              { root: true }
            )
          },
          dev ? 200 : 0
        )
      )
      .catch(err =>
        setTimeout(
          () => {
            commit('mobility/' + SET_MOBILITY_ERROR, err.response.data, {
              root: true
            })
            commit('meta/' + SET_META_ERROR, err.response.data, {
              root: true
            })
          },
          dev ? 200 : 0
        )
      )
  }
}

export default createStore({
  modules: {
    home,
    meta,
    mobility
  },
  actions,
  plugins: dev ? [createLogger()] : [],
  strict: dev
})
