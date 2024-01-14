import { createRouter, createWebHistory } from 'vue-router'
import TestView from '../views/TestView.vue'
import LoginView from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TestView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
