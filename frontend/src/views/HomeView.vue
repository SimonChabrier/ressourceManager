<template>
  <div>
    <p v-if="count > 0" class="message">{{ count }} ressources</p>
    <p class="ressources_count"> {{ servermessage }}</p>
      <div id="ressourcesList" class="ressourcesList">
          <div v-for="ressource in ressources" :key="ressource.id" class="resourceItem">
            <h2>{{ ressource.title }}</h2>
              <p class="mainText" v-html=formattedContent(ressource.content)></p>
              <div class="tags">
                <span v-if="ressource.tag" class="tag">{{ ressource.tag }}</span>
                <span v-if="ressource.tech" class="tag">{{ ressource.tech }}</span>
              </div>
              <p class="date">{{ formatedDate(ressource.createdAt) }}</p>
              <div class="ressource_links">
                <p><router-link :to="{ name: 'ressource-edit', params: { id: ressource.id } }">Modifier</router-link></p>
                <p><router-link :to="{ name: 'ressource-view', params: { id: ressource.id } }">Voir</router-link></p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import { useRessourcesStore } from '@/stores/ressources';
import { onMounted, ref } from 'vue';

export default {

  name: 'HomeView',

  setup() { // Composition API : https://v3.vuejs.org/guide/composition-api-setup.html#usage-inside-option-api
    
    const ressourcesStore = useRessourcesStore();
    const ressources = ref([]); // on ajoute les références au store
    const count = ref(0);
    const servermessage = ref('');

    // au montage du composant, on récupère les ressources
    onMounted( async () => {
      await ressourcesStore.getRessources();
      ressources.value = ressourcesStore.ressources;
      count.value = ressourcesStore.ressources?.length || 0;
      servermessage.value = ressourcesStore.message;
    });

    // Propriété calculée pour formater le contenu avec HTML interprété et limite de 250 caractères
    const formattedContent = (content) => {
      if (content) {
        content = content.replace(/<[^>]*>([\s]?)*<\/[^>]*>/g, ''); // enlever toutes les balises html sans contenu
        content = content.trim(); // enlever les espaces au début et à la fin
        content = content.replace(/>\s+</g, '><'); // enlever tous les espaces blancs entre deux balises HTML
        return content.substring(0, 1500) + '...';
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
    // setUp retourne un objet avec les propriétés et méthodes que je veux rendre accessibles dans le template
    return { ressources, formattedContent, formatedDate, count , servermessage};
  },

  mounted() {
    console.log('mouted HomeView', this.count) // 0
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

  .ressourcesList {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .resourceItem {
    width: calc(25% - 60px);
    background-color: $color-light;
    padding: 20px;
    border-radius: $border-radius;
    box-shadow: $shadow-light;
  }

  .mainText {
    margin: 10px 0;
  }


</style>
