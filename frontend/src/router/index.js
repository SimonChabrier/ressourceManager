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
      // path: '/:offset?/:limit?',
      path: '/',
      name: 'ressources',
      component: HomeView,
      // utiliser les paramètres de navigation pour passer des données à la route
      props: (route) => ({ 
        offset: parseInt(route.query.offset) || 0, 
        limit: parseInt(route.query.limit) || 5 
      }),
        beforeEnter: async (to, from, next) => {
            const store = ressourcesStore(); // Obtenir une instance du store
            const connectedUser = store.getConnectedUser; // Accéder au getter getConnectedUser
        if (!tokenManager.getToken() || !connectedUser) {
          next({ name: 'login' });
        } else {
          console.log('ressources route', to.params.offset, to.params.limit);
          const offset = parseInt(to.query.offset) || 0;
          const limit = parseInt(to.query.limit) || 10;
          store.getRessources(offset, limit);
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
              await store.deleteRessource(to.params.id, to.query.offset, to.query.limit);
              next({ name: 'ressources', query: { offset: to.query.offset, limit: to.query.limit } });
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
