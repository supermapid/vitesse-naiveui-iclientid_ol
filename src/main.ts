import { createRouter, createWebHistory } from "vue-router"
import { routes } from "vue-router/auto/routes"
import { createHead } from "@vueuse/head"
import { createPinia } from "pinia"
import { setupLayouts } from "virtual:generated-layouts"

import App from "./App.vue"
import "~/styles/main.css"
import "uno.css"

const app = createApp(App)
const head = createHead()
const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes)
})

app.use(pinia).use(router).use(head)

app.mount("#app")
