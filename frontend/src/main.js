import './registerServiceWorker';
import './assets/styles/app.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// import SpinerComponent from '@/components/Spiner.vue';

createApp(App)
    // .component('SpinerComponent', SpinerComponent)
    .use(createPinia()) // on crée une instance de Pinia et on l'ajoute à Vue
    .use(router)
    .mount('#app');
