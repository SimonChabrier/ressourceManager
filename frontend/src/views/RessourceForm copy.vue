<template>
  <div>
    <!-- Formulaire de création de ressource -->
    <form class="resource-form" @submit.prevent="createRessource">
      <div class="form-group">
        <label for="title">Titre de la ressource</label>
        <input type="text" v-model="title" id="title" placeholder="Saisissez le titre" />
      </div>

      <div class="form-group">
        <label for="editor">Contenu</label>
        <QuillEditor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
      ></QuillEditor>
      </div>

      <div>
        <h2 v-html="test"></h2>
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

<script>
import { useRessourcesStore } from '@/store/ressources';
import router from '@/router';

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  data() {
    return {
      title: '',
      content: '',
      htmlContent: '',
      tag: '',
      tech: '',
      editorOption: {
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': ['white'] }],
            ['clean'],
          ],
        },
        placeholder: 'Saisissez votre contenu...',
        theme: 'snow',
        content: '',
      },
    };
  },

  name: 'RessourceForm',

  components: {
    QuillEditor,
  },

  setup() {
    const ressourcesStore = useRessourcesStore();
    if (ressourcesStore.connectedUser === null) {
      router.push({ name: 'login' });
    } else {
      const userId = ressourcesStore.connectedUser.id;
      console.log(userId);
      return { ressourcesStore, userId };
    }
  },

  methods: {
    async createRessource() {
      // Log pour le débogage
      console.log('Données à envoyer au serveur :', {
        title: this.title,
        content: this.htmlContent,
        tag: this.tag,
        tech: this.tech,
        userId: this.userId,
      });

      const ressource = {
        title: this.title,
        content: this.htmlContent,
        tag: this.tag,
        tech: this.tech,
        userId: 1,
      };

      await this.ressourcesStore.createRessource(ressource);
      //router.push({ name: 'ressources' });
    },

    onEditorBlur(quill) {
      console.log('editor blur!', quill);
      this.htmlContent = document.querySelector('.ql-editor').innerHTML
      console.log(this.htmlContent)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill);
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text);
      this.test = html; // Utilisez this.test
    },
  },

  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted() {
    console.log('this is current quill instance object', this.editor);
    console.log('this is html of quill', this.content);
  },
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
</style>
