export default defineNuxtConfig({
  // SPA mode — required for GitHub Pages (static hosting) and localStorage/cookie auth.
  // Do NOT remove: without this, nuxt generate fails on auth-protected pages.
  // ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    baseURL: "/kanban_desk/",
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || "change-me-in-production",
    dbPath: process.env.DB_PATH || "./konban.db",
  },
});
