import './registerServiceWorker';
import './assets/styles/app.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

createApp(App)
    .use(createPinia()) // on crée une instance de Pinia et on l'ajoute à Vue
    .use(router)
    .mount('#app');
