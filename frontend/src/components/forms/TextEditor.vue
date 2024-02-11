<template>
      <QuillEditor 
            ref="textEditor"
            :modules="modules"
            :toolbar="toolbar"
            v-model:content="content"
            contentType="html"
            placeholder="Saisissez le contenu"
        />
  </template>
  
  <script setup>

    import BlotFormatter from 'quill-blot-formatter';
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css'
    import { defineModel, ref, watch } from 'vue';
    import router from '@/router';

    const content = defineModel({
        prop: 'content',
        event: 'change',
    });

    // référence locale à l'éditeur 
    const textEditor = ref(null);

    // je regarde si je change de route pour vider l'éditeur si je ne suis pas en mode édition
    watch(() => router.currentRoute.value.name, () => {
        if (!router.currentRoute.value.params.id) {
            textEditor.value.setHTML('');
        }
    });

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

  </script>
  
  <style scoped>
  /* Ajoutez du style au besoin */
  </style>
  