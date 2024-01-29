import './registerServiceWorker';
import './assets/styles/app.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// import { QuillEditor } from '@vueup/vue-quill'


// import SpinerComponent from '@/components/Spiner.vue';

createApp(App) 
    // .component('QuillEditor', QuillEditor)
    // .component('SpinerComponent', SpinerComponent)
    .use(createPinia()) // on crée une instance de Pinia et on l'ajoute à Vue
    .use(router)
   
    .mount('#app');
