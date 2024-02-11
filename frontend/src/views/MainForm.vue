<template>
  <section class="mainForm_container">
    <h1>{{ pageTitre }}</h1>
    
    <!-- Formulaire de création de ressource -->
    <form class="resource-form" @submit.prevent="handleSubmit">
        <Textinput 
          v-model="title" 
          :ressourceTitle="title" 
          @change="handleTitleChange" 
        />
        <TextEditor 
          v-model="content" 
          />
        <TagSelect 
          v-model="tag" 
          />
        <TechSelect 
          v-model="tech" 
          />
      <input 
        type="submit" 
        :value="btnText" 
        />
    </form>
  </section>
</template>

<script setup> // setup() est une fonctionnalité de Vue 3 qui permet de simplifier le code des composants
// il permet de déclarer des variables et des fonctions sans avoir à les déclarer dans le data() et methods: {}
// https://v3.vuejs.org/guide/composition-api-setup.html#usage-inside-option-api

import { ref, nextTick, watch } from 'vue'
import { useRessourcesStore } from '@/stores/ressources';
import router from '@/router';

import TagSelect from '@/components/forms/TagSelect.vue';
import TechSelect from '@/components/forms/TechSelect.vue';
import TextEditor from '@/components/forms/TextEditor.vue';
import Textinput from '@/components/forms/Textinput.vue';

// Mes refs et variables locales
const ressourcesStore = useRessourcesStore();
const ressourceId = ref('');
const userId = ref('');
const title = ref('');
const content = ref('');
const tag = ref('');
const tech = ref('');
const pageTitre = ref('Créer une ressource');
const btnText = ref('créer');

if(ressourcesStore.getConnectedUser) {
  userId.value = ressourcesStore.getConnectedUser.id;
} else {
  router.push({ name: 'login' });
}

// écoute les changements du titre. Si je change le titre, je le passe à la ref title
const handleTitleChange = (newTitle) => {
  title.value = newTitle;
};

// jécoute les changements de route pour vider l'éditeur si je ne suis pas en mode édition
watch(() => router.currentRoute.value, (to) => {
  // si je vais sur une route sans id, je vide l'éditeur et les champs
  // c'est que je suis en mode création
  console.log(to);
  if (!to.params.id) {
    nextTick(() => {
      title.value = '';
      content.value = '';
      tag.value = '';
      tech.value = '';
      btnText.value = 'Créer';
      pageTitre.value = 'Créer une ressource';
      userId.value = ressourcesStore.getConnectedUser.id;
    });
  }
});

// Fonction pour charger une ressource si je suis en mode édition
const fetchPost = async () => {
  try {
    const ressourceId = router.currentRoute.value.params.id;
    const post = await ressourcesStore.getRessource(ressourceId);
    nextTick(() => {
      title.value = post.title;
      content.value = post.content;
      tag.value = post.tag;
      tech.value = post.tech;
      userId.value = post.userId;
    });
  } catch (error) {
    console.log(error);
  }
};

// si j'ai un id dans l'url, je le passe à la ref ressourceId
if (router.currentRoute.value.params.id) {
    fetchPost();
    ressourceId.value = router.currentRoute.value.params.id;
    btnText.value = 'Modifier';
    pageTitre.value = 'Modifier une ressource';
}

// Centralisation de la gestion du formulaire
const handleSubmit = async () => {
  const formData = {
      title: title.value,
      content: content.value,
      tag: tag.value,
      tech: tech.value,
      userId: userId.value,
  };

  console.log(formData);

  if (!formData.title || !formData.content || !formData.tag || !formData.tech) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  if (!ressourceId.value) {
    await ressourcesStore.createRessource(formData);
  } else {
    await ressourcesStore.patchRessource(ressourceId.value, formData);
  }

  router.push({ name: 'ressources' });
};

</script>

<style lang="scss">

.form-group {
    margin-bottom: $margin-small;
  }

</style>
