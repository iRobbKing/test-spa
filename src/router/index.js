import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/home-view.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/edit-view.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
