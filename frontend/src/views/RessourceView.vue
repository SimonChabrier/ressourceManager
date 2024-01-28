<template>
    <div id="ressource-view">
      <h1>Test View</h1>
      <p>{{ message }}</p>
      <h2>{{ ressource.title }}</h2>
      <p>{{ ressource.content }}</p>
      <!-- revenir en arr!ere -->
      <router-link :to="{ name: 'ressources' }">
        Retour aux ressources
      </router-link>
      <button @click="deleteRessource(ressource.id)">Supprimer</button>
    </div>
</template>

<script>
import { useRessourcesStore } from '@/store/ressources';
import { onMounted, ref } from 'vue';
import router from '@/router';


export default {
  name: 'RessourceView',

  setup() {

    //* déclarer toutes les reférences au store ici
    const ressourcesStore = useRessourcesStore();
    const ressource = ref('');
    const message = ref('');
    const deleteRessource = async (id) => {
      await ressourcesStore.deleteRessource(id);
      // on vide la div ressource-view et on affiche le spinner au centre de la page
      document.getElementById('ressource-view').innerHTML = '';
      const spinner = '<span class="loader"></span>';
      document.getElementById('ressource-view').innerHTML = spinner;
      // on redirige vers la page ressources
      setTimeout(() => {
        router.push({ name: 'ressources' });
      }, 1000);
    };

    //* utiliser les rférences ici pour récupérer les données du store
    onMounted(async () => {
      const id = router.currentRoute.value.params.id;
      await ressourcesStore.fetchRessource(id);
      // Affectez les valeurs du store aux références locales (on utilise plus this avec Vue 3)
      ressource.value = ressourcesStore.ressource;
      message.value = ressourcesStore.message;      
    });

    return {
      ressource,
      message,
      deleteRessource,
    };
  },
  
};
</script>

<style>
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>
