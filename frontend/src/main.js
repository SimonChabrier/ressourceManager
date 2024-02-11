
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import fontawsome icons and styles
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas) // add all free solid icons to the library

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon) // add the component to the app
app.use(createPinia())
app.use(router)
app.mount('#app')
