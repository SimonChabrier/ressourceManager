<template>
  <div>
    <h1>Test View</h1>
    <p>{{ message }}</p>

    <div v-for="ressource in ressources" :key="ressource.id" class="">
      <h2>{{ ressource.title }}</h2>
      <p v-html="formattedContent(ressource.content)"></p>
      <div class="tags">
        <span class="tag">{{ ressource.tag }}</span>
        <span class="tag">{{ ressource.tech }}</span>
      </div>
      <span class="date">{{ formatedDate(ressource.createdAt) }}</span>
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
        // on élève les balises HTML et on limite à 250 caractères
        content = content.replace(/<[^>]*>/g, '');
        const limitedContent = content.substring(0, 250);
        // Retournez le contenu traité avec les balises HTML interprétées
        return limitedContent;
      }
      return '';
    };

    const formatedDate = (date) => {
      if (date) {
        // Je veux obtenir le format suivant : "mercredi 21 juillet 2021 à 14h30"
        const options = { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };

        const formattedDate = new Date(date);
        let texDate = formattedDate.toLocaleDateString('fr-FR', options);
        // chercher : et remplacer par h
        texDate = texDate.replace(':', 'h');
        texDate = texDate.replace('à', '-');
        return texDate;
      }
      return '';
    };

    return {
      ressources,
      message,
      formattedContent,
      formatedDate,
    };
  },
};
</script>

<style>
  .tags {
    display: flex;
    gap: 10px;
  }

  .tags span {
    background-color: #0989f9;
    padding: 5px 10px;
    color: white;
    font-size: 12px;
  }
</style>
