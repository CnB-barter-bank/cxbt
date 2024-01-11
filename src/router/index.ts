import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue' 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', 
    component: Home,
  }, 
]

// https://vitejs.dev/guide/env-and-mode.html
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
