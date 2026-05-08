<template>
  <div class="min-h-screen bg-gray-100 flex">
    <aside class="w-60 bg-white border-r border-gray-200 flex flex-col">
      <div class="h-14 flex items-center px-4 border-b border-gray-200">
        <span class="font-bold text-lg text-indigo-600">Konban</span>
      </div>
      <nav class="flex-1 p-3 space-y-1">
        <NuxtLink
          to="/boards"
          class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          active-class="bg-indigo-50 text-indigo-700"
        >
          Boards
        </NuxtLink>
      </nav>
      <div class="p-3 border-t border-gray-200">
        <button
          class="w-full text-left px-3 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          @click="logout"
        >
          Abmelden
        </button>
      </div>
    </aside>
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()

async function logout() {
  await auth.logout()
  navigateTo('/auth/login')
}
</script>
