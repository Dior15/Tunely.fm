import { createApp } from 'vue'
import "bulma/css/bulma.css"
import App from './App.vue'

// FontAwesome setup
import {library} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import {fas} from "@fortawesome/free-solid-svg-icons"
library.add(fas)

let app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
