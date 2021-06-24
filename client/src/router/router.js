import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Data from '../views/Data.vue'
import PageNotFound from '../views/PageNotFound.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:name/:type',
      name: 'Data',
      component: Data
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { left: 0, top: 0 }
  }
})
