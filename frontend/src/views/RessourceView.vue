<template>
  <div>
    <div id="ressource-view">
      <h1>Test View</h1>
      <h2>{{ ressource.title }}</h2>
      <p>{{ ressource.content }}</p>
      <!-- revenir en arr!ere -->
      <router-link :to="{ name: 'ressources' }">
        Retour aux ressources
      </router-link>
      <button @click="deleteRessource(ressource.id)">Supprimer</button>
    </div>
    <div id="spinnerContainer">
      <SpinerComponent text="loading"></SpinerComponent>
    </div>
  </div>
</template>

<script>
import { useRessourcesStore } from '@/store/ressources';
import { onMounted, ref } from 'vue';
import SpinerComponent from '@/components/Spiner.vue';
import router from '@/router';


export default {
  components: { 
    SpinerComponent 
  },
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
      document.getElementById('spiner').classList.remove('hide');
      // on redirige vers la page ressources ne simulant un temps de chargement
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
</style>
