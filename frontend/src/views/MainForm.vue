<template>
  <section class="mainForm_container">
    <h1>{{ pageTitre }}</h1>
    <!-- Formulaire de création de ressource -->
    <form class="resource-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Titre de la ressource</label>
        <input type="text" v-model="title" id="title" placeholder="Saisissez le titre" />
      </div>

      <div class="form-group">
        <label for="content">Contenu</label>
          <QuillEditor ref="quill" 
              :modules="modules" 
              :toolbar="toolbar" 
              v-model:content="content"
              contentType="html" 
              id="content"
              placeholder="Saisissez le contenu"
            />
      </div>
  <!-- ancienne syntaxe v-model:content="textContent" -->
      <div class="form-group">
        <label for="tag">Tag</label>
        <select v-model="tag" id="tag">
          <option value="" disabled selected hidden>Choisir un tag</option>
          <option value="doc">Documentation</option>
          <option value="tuto">Tutoriel</option>
          <option value="article">Article</option>
        </select>
      </div>

      <div class="form-group">
        <label for="tech">Technologie</label>
        <select v-model="tech" id="tech">
          <option value="" disabled selected hidden>Choisir une technologie</option>
          <option value="html">HTML</option>
        </select>
      </div>

      <input type="submit" :value="btnText" />
    </form>
  </section>
</template>

<script setup> // setup() est une fonctionnalité de Vue 3 qui permet de simplifier le code des composants
// il permet de déclarer des variables et des fonctions sans avoir à les déclarer dans le data() et methods: {}
// https://v3.vuejs.org/guide/composition-api-setup.html#usage-inside-option-api

import BlotFormatter from 'quill-blot-formatter'
import { ref, nextTick, watch } from 'vue'
import { useRessourcesStore } from '@/stores/ressources';
import router from '@/router';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// reférences locales au store et aux variables
// avant c'était dans le data() et methods: {} mais c'est plus simple avec setup()
// nouveau dans Vue 3 : https://v3.vuejs.org/guide/composition-api-setup.html#usage-inside-option-api
const ressourcesStore = useRessourcesStore();
const ressourceId = ref('');
const userId = ref('');
const title = ref('');
const content = defineModel(QuillEditor, { event: 'change', prop: 'content' });
const tag = ref('');
const tech = ref('');
const quill = ref(null);
const pageTitre = ref('Créer une ressource');
const btnText = ref('créer');

userId.value = ressourcesStore.getConnectedUser.id;

// jécoute les changements de route pour vider l'éditeur si je ne suis pas en mode édition
// quand je sitche de route, je récupère la route courante dans to (passer de la route A à la route B)
// sur le même composant...pour rafrachir le contenu de l'éditeur en fonciton de la route creation ou édition
watch(() => router.currentRoute.value, (to) => {
  // si je vais sur une route sans id, je vide l'éditeur et les champs
  // c'est que je suis en mode création
  if (!to.params.id) {
    nextTick(() => {
      title.value = '';
      quill.value.setHTML('');
      tag.value = '';
      tech.value = '';
      btnText.value = 'Créer';
      pageTitre.value = 'Créer une ressource';
      userId.value = ressourcesStore.getConnectedUser.id;
    });
  }
});



// Fonction pour charger les posts (à ajuster selon votre API)
const fetchPost = async () => {
  try {
    const ressourceId = router.currentRoute.value.params.id;
    const post = await ressourcesStore.getRessource(ressourceId);
    nextTick(() => {
      title.value = post.title;
      quill.value.setHTML(post.content);
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
    // ressourceId.value = router.currentRoute.value.params.id;
    fetchPost();
    // je chage la valeur de ressourceId
    ressourceId.value = router.currentRoute.value.params.id;
    btnText.value = 'Modifier';
    pageTitre.value = 'Modifier une ressource';
}

const toolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  ['link', 'image', 'video'],
  ['clean'],
];

const modules = {
  module: BlotFormatter,
};

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
  // validation du formulaire aucune donnée vide
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

<style lang="scss" scoped>

.form-group {
  margin-bottom: $margin-small;
}



</style>
