import { createRouter, createWebHistory } from 'vue-router'
import RessourcesView from '../views/RessourcesView.vue'
import RessourceView from '../views/RessourceView.vue'
import LoginView from '../views/Login.vue'
// import RessourceForm from '../views/RessourceForm.vue'
import MainForm from '../views/MainForm.vue'
// import TestView from '../views/TestView.vue'
import tokenManager from '@/security/tokenManager'

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
    component: MainForm
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

router.beforeEach((to, from, next) => {
  // Middleware pour vérifier la présence du token
  if (!tokenManager.getToken() && to.name !== 'login') {
    // Redirection vers la page de login si le token est absent
    next({ name: 'login' });
  } else {
    // Continuer vers la route demandée
    next();
  }
});

export default router
