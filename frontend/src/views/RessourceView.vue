<template>
  <div>
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
      router.push({ name: 'ressources' });
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
  /* styles ici */
</style>
