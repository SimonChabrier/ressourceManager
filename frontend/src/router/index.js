import { createRouter, createWebHistory } from 'vue-router'
import tokenManager from '@/security/tokenManager'
import { useRessourcesStore } from '@/store/ressources'

import HomeView from '../views/HomeView.vue'
import RessourceView from '../views/RessourceView.vue'
import LoginView from '../views/Login.vue'
import MainForm from '../views/MainForm.vue'

const routes = [
  {
    path: '/',
    name: 'ressources',
    component: HomeView
  },
  {
    path: '/ressource/:id',
    name: 'ressource-view',
    component: RessourceView
  },
  {
    path: '/ressource',
    name: 'ressource-create',
    beforeEnter: async (to, from, next) => {
    // utiliser from pour revenir à la page précédente
    // utiliser next pour aller à la page suivante
    // utiliser to pour aller à la page demandée
    const ressourcesStore = useRessourcesStore(); // Obtenir une instance du store
    const connectedUser = ressourcesStore.getConnectedUser; // Accéder au getter getConnectedUser
      if (!tokenManager.getToken() || !connectedUser) {
        next({ name: 'login' });
      } else {
        next();
      }
    },
    component: MainForm
  },
  {
    path: '/ressource-edit/:id',
    name: 'ressource-edit',
    beforeEnter: async (to, from, next) => {
        const ressourcesStore = useRessourcesStore(); // Obtenir une instance du store
        const connectedUser = ressourcesStore.getConnectedUser; // Accéder au getter getConnectedUser
        if (!tokenManager.getToken() || !connectedUser) {
        next({ name: 'login' });
      } else {
        next();
      }
    },
    component: MainForm,
  },
  // delete ressource
  {
    path: '/ressource-delete/:id',
    name: 'ressource-delete',
    beforeEnter: async (to, from, next) => {
        const ressourcesStore = useRessourcesStore(); // Obtenir une instance du store
        const connectedUser = ressourcesStore.getConnectedUser; // Accéder au getter getConnectedUser
        if (!tokenManager.getToken() || !connectedUser) {
        next({ name: 'login' });
      } else {
        await ressourcesStore.deleteRessource(to.params.id);
        next({ name: 'ressources' });
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: async (to, from, next) => {
      await useRessourcesStore().logout(); // logout store
      next({ name: 'login' });
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



// PROTEGE TOUTES LES ROUTES SAUF LOGIN POUR POURVOIR SE CONNECTER
// router.beforeEach((to, from, next) => {
//   // Middleware pour vérifier la présence du token
//   if (!tokenManager.getToken() && to.name !== 'login') {
//     // Redirection vers la page de login si le token est absent
//     next({ name: 'login' });
//   } else {
//     // Continuer vers la route demandée 
//     next();
//   }
// });

export default router
