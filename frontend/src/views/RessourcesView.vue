<template>
  <div>
    <h1>Test View</h1>
    <p>{{ message }}</p>

    <div v-for="ressource in ressources" :key="ressource.id">
      <h2>{{ ressource.title }}</h2>
      <p>{{ ressource.content }}</p>
      <!-- au clic on pourr l'i de la ressource dans le router pour faire un lien -->
      <router-link :to="{ name: 'ressource', params: { id: ressource.id } }">
        Voir la ressource
      </router-link>
    </div>
  
  </div>
</template>

<script>
import { useRessourcesStore } from '@/store/ressources';
import { onMounted, ref } from 'vue';

export default {
  name: 'RessourcesView',

  setup() {
    const ressourcesStore = useRessourcesStore();
    const ressources = ref([]); // on ajoute les références au store
    const message = ref(''); 

    onMounted(async () => {
      await ressourcesStore.fetchRessources();
      ressources.value = ressourcesStore.ressources;
      message.value = ressourcesStore.message;
    });

    return {
      ressources,
      message,
    };
  },
};
</script>

<style>
  /* styles ici */
</style>
