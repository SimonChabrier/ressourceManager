import { createRouter, createWebHistory } from 'vue-router'
import RessourcesView from '../views/RessourcesView.vue'
import RessourceView from '../views/RessourceView.vue'
import LoginView from '../views/Login.vue'
import RessourceForm from '../views/RessourceForm.vue'

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
  // créer une ressource (formulaire)
  {
    path: '/ressource',
    name: 'ressource-create',
    component: RessourceForm
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
