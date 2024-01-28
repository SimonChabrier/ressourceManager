<template>
    <div>
      <!-- Formulaire de création de ressource -->
      <form class="resource-form" @submit.prevent="createRessource">
        <QuillEditor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
        ></QuillEditor>
  
        <input type="submit" value="Créer" />
      </form>
    </div>
  </template>
  
  <script>
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  
  export default {
    name: 'TestView',
  
    components: {
      QuillEditor,
    },
    data() {
      return {
        content: '',
        html:'',
        editorOption: { /* quill options */ },
      };
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
        this.content = quill.getHTML;
        console.log(this.content)
        this.html = document.querySelector('.ql-editor').innerHTML
        console.log(this.html)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .resource-form {
    max-width: 90%;
    margin: auto;
  }
  </style>
  