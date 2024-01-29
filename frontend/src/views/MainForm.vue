<template>
  <div>
    <h1>Créer une ressource</h1>
    
    <!-- Formulaire de création de ressource -->
    <form class="resource-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Titre de la ressource</label>
        <input type="text" v-model="title" id="title" placeholder="Saisissez le titre" />
      </div>

      <div class="form-group">
        <label for="tag">Contenu</label>
        <quill-editor ref="quill" :modules="modules" :toolbar="toolbar" v-model:content="content" contentType="html" />
      </div>

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
          <!-- ... autres options ... -->
        </select>
      </div>

      <input type="submit" value="Créer" />
    </form>
  </div>
</template>

<script setup> // setup() est une fonctionnalité de Vue 3 qui permet de simplifier le code des composants
// il permet de déclarer des variables et des fonctions sans avoir à les déclarer dans le data() et methods: {}
// https://v3.vuejs.org/guide/composition-api-setup.html#usage-inside-option-api

import BlotFormatter from 'quill-blot-formatter'
import axios from 'axios'
import { ref, nextTick, onBeforeMount } from 'vue'
import { useRessourcesStore } from '@/store/ressources';
import router from '@/router';
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { QuillEditor } from '@vueup/vue-quill'

// avant de monter le composant, je vérifie si l'utilisateur est connecté
// si ce n'est pas le cas, je le redirige vers la page de login même si c'est déjà aussi fait dans le router
// c'est une sécurité supplémentaire
onBeforeMount(() => {
  console.log('onBeforeMount');
  if (!ressourcesStore.connectedUser) {
    router.push({ name: 'login' });
  }
});

// reférences locales au store et aux variables
// avant c'était dans le data() et methods: {} mais c'est plus simple avec setup()
// nouveau dans Vue 3 : https://v3.vuejs.org/guide/composition-api-setup.html#usage-inside-option-api
const ressourcesStore = useRessourcesStore();
const ressourceId = ref('');
const userId = ref('');
const title = ref('');
const content = ref('');
const tag = ref('');
const tech = ref('');
const quill = ref(null);

const modules = {
  module: BlotFormatter,
};

// si j'ai un id dans l'url, je le passe à la ref ressourceId
if (router.currentRoute.value.params.id) {
  ressourceId.value = router.currentRoute.value.params.id;
} else {
  console.log('pas de paramètre de route');
}
// si j'ai un id dans le store, je le passe à la ref userId
if (ressourcesStore.connectedUser) {
  userId.value = ressourcesStore.connectedUser.id;
  console.log('userId', userId.value);
} else {
  router.push({ name: 'login' });
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

// Centralisation de la gestion du formulaire
const handleSubmit = async () => {
  const formData = {
    title: title.value,
    content: content.value,
    tag: tag.value,
    tech: tech.value,
    userId: userId.value,
  };

  if (!router.currentRoute.value.params.id) {
    await ressourcesStore.createRessource(formData);
  } else {
    await ressourcesStore.patchRessource(ressourceId, formData);
  }
  // resetForm();
  router.push({ name: 'ressources' });
};

// Fonction pour charger les posts (à ajuster selon votre API)
const fetchPost = async () => {
  try {
    const id = router.currentRoute.value.params.id;
    const response = await axios.get('http://localhost:3000/api/ressources/' + id);
    let post = response.data.ressource;

    nextTick(() => {
      title.value = post.title;
      quill.value.setHTML(post.content);
      tag.value = post.tag;
      tech.value = post.tech;
    });
  } catch (error) {
    console.log(error);
  }
};

if (router.currentRoute.value.params.id) {
  console.log('fetch');
  fetchPost();
}
</script>

<style lang="scss" scoped>
/* Styles ici */
.resource-form {
  max-width: 90%;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}


</style>
