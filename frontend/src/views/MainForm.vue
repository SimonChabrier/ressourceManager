<template>
    <div>
        <h1>Créer une ressource</h1>
        <!-- bouton pou rfetcher un post-->
        <button @click="fetchPosts">Get posts</button>
      <!-- Formulaire de création de ressource -->
      <form class="resource-form" @submit.prevent="createRessource">
        <div class="form-group">
          <label for="title">Titre de la ressource</label>
          <input type="text" v-model="title" id="title" placeholder="Saisissez le titre" />
        </div>
  
        <div class="form-group">
          <label for="editor">Contenu</label>
 
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
  
  <script setup>
  import BlotFormatter from 'quill-blot-formatter'
  import axios from 'axios'
  import { ref, nextTick } from 'vue'
  import { useRessourcesStore } from '@/store/ressources';
  import router from '@/router';

  const ressourcesStore = useRessourcesStore();
    if (ressourcesStore.connectedUser === null) {
    router.push({ name: 'login' });
    } 

  const title = ref('');
  const content = ref('');
//   const test = ref('');
  const tag = ref('');
  const tech = ref('');
  
  const quill = ref(null);
  const modules = {
    module: BlotFormatter,
  };
  
  const toolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ['small', false, 'large', 'huge'] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  ['link', 'image', 'video'],
  ['clean'],
  ];

  
  const createRessource = async () => {

      // on créer un objet ressource avec les données du formulaire et l'id de l'utilisateur
      // les données sont récupérées grâce au v-model sur les inputs
        const ressource = {
            title: title.value,
            content: content.value,
            tag: tag.value,
            tech: tech.value,
            userId: ressourcesStore.connectedUser.id
        };

      await ressourcesStore.createRessource(ressource);
      //router.push({ name: 'ressources' });
    };
  
  // Fonction pour charger les posts (à ajuster selon votre API)
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/ressources');
        
        console.log(response.data);
      
        let post = response.data.ressources;  
        post.reverse();
        post = post[0];
        // Mettre à jour le contenu de Quill avec le contenu du post
      // Utiliser nextTick pour s'assurer que Quill a bien rendu avant de mettre à jour le contenu
      nextTick(() => {
        quill.value.setHTML(post.content);
      });
  
    } catch (error) {
      console.warn(error);
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .resource-form {
    max-width: 90%;
    margin: auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  textarea {
    height: 400px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }

.custom-quill-editor .ql-editor {
  background-color: #ffffff!important; /* Blanc */
}
  </style>
  