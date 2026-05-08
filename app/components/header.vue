<template>
  <header class="bg-white shadow">
    <div
      class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between"
    >
      <h1 class="text-lg font-semibold text-gray-900">Konban Desk</h1>
      <nav class="space-x-4">
        <NuxtLink
          to="/boards"
          class="text-gray-700 hover:text-gray-900 transition-colors"
          active-class="text-indigo-600 font-medium"
        >
          Boards
        </NuxtLink>
        <!-- Weitere Navigationslinks können hier hinzugefügt werden -->
      </nav>
    </div>
  </header>
  <main class="py-6">
    <NuxtPage />
  </main>
</template>
