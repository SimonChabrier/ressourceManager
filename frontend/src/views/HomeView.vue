<template>
  <div>
    <h1>Page</h1>
      <p class="ressources_count">{{ count }} - {{ server_message }}</p>
    <div v-for="ressource in ressources" :key="ressource.id" class="">
      <h2>{{ ressource.title }}</h2>
      <p v-html=formattedContent(ressource.content)></p>
      <div class="tags">
        <span v-if="ressource.tag"  class="tag">{{ ressource.tag }}</span>
        <span v-if="ressource.tech"  class="tag">{{ ressource.tech }}</span>
      </div>
            <p class="date">{{ formatedDate(ressource.createdAt) }}</p>
          
          <div class="ressource_links">
            <p><router-link :to="{ name: 'ressource-edit', params: { id: ressource.id } }">Modifier</router-link></p>
            <p><router-link :to="{ name: 'ressource-view', params: { id: ressource.id } }">Voir</router-link></p>
          </div>
    </div>
  </div>
</template>

<script>
import { useRessourcesStore } from '@/store/ressources';
import { onMounted, ref } from 'vue';

export default {
  name: 'HomeView',

  setup() {
    const ressourcesStore = useRessourcesStore();
    const ressources = ref([]); // on ajoute les références au store
    const server_message = ref(''); 
    const count = ref(0);

    onMounted(async () => {
      await ressourcesStore.getRessources();
      ressources.value = ressourcesStore.ressources;
      server_message.value = ressourcesStore.message;
      count.value = ressourcesStore.ressources?.length || 0;

      console.log('ressources', ressources.value);
    });

    // Propriété calculée pour formater le contenu avec HTML interprété et limite de 250 caractères
    const formattedContent = (content) => {
      if (content) {
        // enlever toutes les balises html sans contenu
        content = content.replace(/<[^>]*>([\s]?)*<\/[^>]*>/g, '');
        // en lever tous les espaces blancs en début et fin de chaine
        content = content.trim();
        // enlever tous les espaces blancs entre deux balises HTML
        content = content.replace(/>\s+</g, '><');

        const limitedContent = content.substring(0, 500) + '...';
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

    // retourner les références locales pour les utiliser dans le template
    return {
      ressources,
      server_message,
      formattedContent,
      formatedDate,
      count,
    };
  },
};
</script>

<style lang="scss" scoped>
  .tags {
    display: flex;
    gap: 10px;
    margin: 15px 0 5px 0;
  }

  .tags span {
    background-color: $color-info;
    padding: 5px 10px;
    color: white;
    font-size: 12px;
  }

  .ressources_count {
    font-size: .9rem;
  }
</style>
