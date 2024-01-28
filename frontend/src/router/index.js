import { createRouter, createWebHistory } from 'vue-router'
import RessourcesView from '../views/RessourcesView.vue'
import RessourceView from '../views/RessourceView.vue'
import LoginView from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'ressources',
    component: RessourcesView
  },
  {
    path: '/ressource/:id',
    name: 'ressource',
    component: RessourceView
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
