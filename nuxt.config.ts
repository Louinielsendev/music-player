// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
supabase:{
  redirect: false
},
  modules: ["@nuxt/image", "@nuxtjs/supabase", 'nuxt-icon', ['@pinia/nuxt', {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  }], '@nuxt/ui'],
  imports: {
    dirs: ['stores']
  }
})