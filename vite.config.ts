import path from "node:path"
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import Unocss from "unocss/vite"
import VueMacros from "unplugin-vue-macros/vite"
import VueRouter from "unplugin-vue-router/vite"
import { VueRouterAutoImports } from "unplugin-vue-router"
import VueDevTools from "vite-plugin-vue-devtools"

// @ts-expect-error actually it's there
import Layouts from "vite-plugin-vue-layouts"

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          ol: ["ol"]
        }
      }
    }
  },
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`
    }
  },
  plugins: [
    VueDevTools(),
    VueMacros({
      defineOptions: false,
      defineModels: true,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true
          }
        })
      }
    }),

    VueRouter({
      dts: "./src/typed-router.d.ts"
    }),

    Layouts({
      layoutsDirs: "./src/layouts"
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", VueRouterAutoImports, "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      dirs: ["./src/composables"],
      vueTemplate: true
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [NaiveUiResolver()],
      dts: "src/components.d.ts",
      dirs: ["./src/components/"],
      deep: true
    }),
    Unocss()
  ],

  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
    exclude: ["vue-demi"]
  }
})
