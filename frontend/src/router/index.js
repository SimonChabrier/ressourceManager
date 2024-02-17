import { createRouter, createWebHistory } from 'vue-router'
import { ressourcesStore } from '@/stores/ressources'
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
      component: HomeView,
        beforeEnter: async (to, from, next) => {
            const store = ressourcesStore(); // Obtenir une instance du store
            const connectedUser = store.getConnectedUser; // Accéder au getter getConnectedUser
        if (!tokenManager.getToken() || !connectedUser) {
          next({ name: 'login' });
        } else {
            store.getRessources();
          next();
        }
      },
    },
    {
      path: '/ressource/:id',
      name: 'ressource-view',
      component: RessourceView,
        beforeEnter: async (to, from, next) => {
          const store = ressourcesStore(); // Obtenir une instance du store
          const connectedUser = store.getConnectedUser; // Accéder au getter getConnectedUser
          console.log('ressource id route', connectedUser);
          if (!tokenManager.getToken() || !connectedUser) {
          next({ name: 'login' });
        } else {
          next();
        }
      },
    },
    {
      path: '/ressource',
      name: 'ressource-create',
      component: MainForm,
        beforeEnter: async (to, from, next) => {
        const store = ressourcesStore(); // Obtenir une instance du store
        const connectedUser = store.getConnectedUser; // Accéder au getter getConnectedUser
          if (!tokenManager.getToken() || !connectedUser) {
            next({ name: 'login' });
          } else {
            next();
          }
        },
    },
    {
      path: '/ressource-edit/:id',
      name: 'ressource-edit',
      component: MainForm,
        beforeEnter: async (to, from, next) => {
            const store = ressourcesStore(); // Obtenir une instance du store
            const connectedUser = store.getConnectedUser; // Accéder au getter getConnectedUser
            console.log('ressource edit route', connectedUser);
            if (!tokenManager.getToken() || !connectedUser) {
            next({ name: 'login' });
          } else {
            next();
          }
        },
    },
    {
    path: '/ressource-delete/:id',
    name: 'ressource-delete',
    beforeEnter: async (to, from, next) => {
        const store = ressourcesStore(); // Obtenir une instance du store
        const connectedUser = store.getConnectedUser; // Accéder au getter getConnectedUser
        if (!tokenManager.getToken() || !connectedUser) {
        next({ name: 'login' });
      } else {
        await store.deleteRessource(to.params.id);
        next({ name: 'ressources' });
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    // beforeEnter: async (to, from, next) => {
    //   const ressourcesStore =  ressourcesStore(); // Obtenir une instance du store
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
      await ressourcesStore().logout(); // logout store
      next({ name: 'login' });
    }
  },
  {
    path: '/:pathMatch(.*)*',  
    name: 'not-found',
    redirect: { name: 'login' }
  }
  // pour chaque route sauf login et logout vérifier si l'utilisateur est connecté sinon le rediriger vers la page de login
  
  ]
})

export default router
