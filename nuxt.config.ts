export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
    dbPath: process.env.DB_PATH || './konban.db',
  },
})
