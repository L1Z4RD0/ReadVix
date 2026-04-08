import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { IonicVue } from '@ionic/vue'

/* Core CSS required for Ionic components to work properly */
// @ts-ignore
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
// @ts-ignore
import '@ionic/vue/css/normalize.css'
// @ts-ignore
import '@ionic/vue/css/structure.css'
// @ts-ignore
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
// @ts-ignore
import '@ionic/vue/css/padding.css'
// @ts-ignore
import '@ionic/vue/css/float-elements.css'
// @ts-ignore
import '@ionic/vue/css/text-alignment.css'
// @ts-ignore
import '@ionic/vue/css/text-transformation.css'
// @ts-ignore
import '@ionic/vue/css/flex-utils.css'
// @ts-ignore
import '@ionic/vue/css/display.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router)

router.isReady().then(() => {
  app.mount('#app')
})