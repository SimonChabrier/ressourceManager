<template>
  <div>
    <h1>Test View</h1>
    <p>{{ message }}</p>

    <div v-for="ressource in ressources" :key="ressource.id">
      <h2>{{ ressource.title }}</h2>
      <!-- Utilisation de la propriété calculée formattedContent -->
      <p v-html="formattedContent(ressource.content)"></p>
      <!-- au clic on pourra utiliser l'id de la ressource dans le router pour faire un lien -->
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

    // Propriété calculée pour formater le contenu avec HTML interprété et limite de 250 caractères
    const formattedContent = (content) => {
      if (content) {
        // Limitez le contenu à 250 caractères
        const limitedContent = content.substring(0, 250);
        // Retournez le contenu traité avec les balises HTML interprétées
        return limitedContent;
      }
      return '';
    };

    return {
      ressources,
      message,
      formattedContent,
    };
  },
};
</script>

<style>
  /* styles ici */
</style>
