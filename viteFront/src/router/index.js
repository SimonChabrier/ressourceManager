import { createRouter, createWebHistory } from 'vue-router'
import { useRessourcesStore } from '@/stores/ressources'
import tokenManager from '@/security/tokenManager'

import HomeView from '../views/HomeView.vue'
import RessourceView from '../views/RessourceView.vue'
import LoginView from '../views/Login.vue'
import MainForm from '../views/MainForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ressources',
      component: HomeView
    },
    {
      path: '/ressource/:id',
      name: 'ressource-view',
      beforeEnter: async (to, from, next) => {
        const ressourcesStore = useRessourcesStore(); // Obtenir une instance du store
        const connectedUser = ressourcesStore.getConnectedUser; // Accéder au getter getConnectedUser
        if (!tokenManager.getToken() || !connectedUser) {
        next({ name: 'login' });
      } else {
        next();
      }
    },
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
    // beforeEnter: async (to, from, next) => {
    //   const ressourcesStore = useRessourcesStore(); // Obtenir une instance du store
    //   const connectedUser = ressourcesStore.getConnectedUser; // Accéder au getter getConnectedUser
    //   if (tokenManager.getToken() && connectedUser) {
    //     next({ name: 'ressources' });
    //   } else {
    //     next();
    //   }
    // },
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
})

export default router
