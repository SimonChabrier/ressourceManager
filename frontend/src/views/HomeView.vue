<template>
  <section class="home_container">
      
    <div v-if="ressources.length > 0" id="ressourcesList" class="ressourcesList">
          <div v-for="ressource in ressources" :key="ressource.id" class="resourceItem">
            <h2>{{ ressource.title }}</h2>
              <p class="mainText" v-html=formattedContent(ressource.content)></p>
              <div class="tags">
                <span v-if="ressource.tag" class="tag"><font-awesome-icon :icon="['fas', 'hashtag']" /> {{ ressource.tag }}</span>
                <span v-if="ressource.tech" class="tag"><font-awesome-icon :icon="['fas', 'code']" /> {{ ressource.tech }}</span>
              </div>
              <p class="date"><font-awesome-icon :icon="['fas', 'calendar-days']" /> {{ formatedDate(ressource.createdAt) }}</p>
         
              <div v-if="connectedUser.id" class="ressource_links">
                <p><router-link :to="{ name: 'ressource-view', params: { id: ressource.id } }"><font-awesome-icon :icon="['fas', 'eye']" /></router-link></p>
                <p><router-link :to="{ name: 'ressource-edit', params: { id: ressource.id } }"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></router-link></p>
                <p><router-link :to="{ name: 'ressource-delete', params: { id: ressource.id } }"><font-awesome-icon :icon="['fas', 'trash']" /></router-link></p >
              </div>
              <div v-else class="ressource_links">
                <p><router-link to="/login"><font-awesome-icon :icon="['fas', 'sign-in-alt']" title="login"/></router-link></p>
              </div>
          </div>
      </div>
      <div v-else  class="emptyList">
        <p>{{ servermessage }}</p>
      </div>

    </section>
</template>

<script>

import { useRessourcesStore } from '@/stores/ressources';
import { onMounted, ref, watch } from 'vue';

export default {

  name: 'HomeView',

  setup() { // Composition API : https://v3.vuejs.org/guide/composition-api-setup.html#usage-inside-option-api
    
    const ressourcesStore = useRessourcesStore();
    const ressources = ref([]); // on ajoute les références au store
    const count = ref(0);
    const servermessage = ref('');
    let connectedUser = ref({'value': ''});
    // mettre à jour la liste des ressources après la suppression d'une ressource

    watch(() => ressourcesStore.ressources, (newVal) => {
      ressources.value = newVal;
      count.value = newVal.length;
    }, { immediate: true });
   
    watch(() => ressourcesStore.message, (newVal) => {
      servermessage.value = newVal;
    }, { immediate: true });

    watch(() => ressourcesStore.connectedUser, (newVal) => {
      connectedUser.value = newVal;
    }, { immediate: true });

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
        // content = content.replace(/<[^>]*>([\s]?)*<\/[^>]*>/g, ''); // enlever toutes les balises html sans contenu
        // content = content.trim(); // enlever les espaces au début et à la fin
        // content = content.replace(/>\s+</g, '><'); // enlever tous les espaces blancs entre deux balises HTML
        return content.trim().substring(0, 15000) + '...';
        // supprimer les espaces blancs au début et à la fin
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
    return { ressources, formattedContent, formatedDate, count , servermessage, connectedUser};
  },


  mounted() {
    console.log('mouted HomeView', this.count) // 0
  },

};

</script>

<style lang="scss">

.emptyList {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 176px);
  p {
    color: $color-primary;
    font-size: 1.5rem;
  }
}

.ressourcesList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  // justify-content: center;
}

.resourceItem {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  width: calc(25% - 15px);

  h2 {
    color:$color-primary;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
}

.mainText {
  width: 100%;
  max-height: 300px;
  overflow: auto;
  margin-bottom: 15px;
  overflow-x: hidden;
}



.tags {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  border-top: 1px solid #ccc;
  .tag {
    padding-top: 10px;
    color: $color-info;
    border-radius: 5px;
  }
}

.date {
  color: $color-info;
  font-size: 0.8rem;
  width: 100%;
  // border-bottom: 1px solid #272727;
  // padding-bottom: 10px;
} 
.ressource_links {
  display: flex;
  flex-direction: row;
  width: 100%;

  
  a {
    padding: 10px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-decoration: none;
    color: $color-primary!important;
    transition: all 0.3s;
    &:hover {
      background-color: $color-grey-light-1;
      color: white;
    }
  }
}

@media screen and (max-width: 1200px) {
  .resourceItem {
    width: calc(50% - 10px);
  }
}

@media screen and (max-width: 700px) {
  .resourceItem {
    width: 100%;
  }
}
</style>
