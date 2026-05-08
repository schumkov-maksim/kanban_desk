<template>
  <Header />
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-gray-900">Boards</h1>
      <button
        class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
        @click="showCreate = true"
      >
        + Neues Board
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="board in boards"
        :key="board.id"
        :to="`/boards/${board.id}`"
        class="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
      >
        <h2 class="font-medium text-gray-900">{{ board.name }}</h2>
        <p v-if="board.description" class="text-sm text-gray-500 mt-1">
          {{ board.description }}
        </p>
      </NuxtLink>
    </div>

    <div
      v-if="showCreate"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h2 class="font-semibold text-gray-900 mb-4">Neues Board</h2>
        <form class="space-y-3" @submit.prevent="createBoard">
          <input
            v-model="newName"
            placeholder="Board-Name"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            v-model="newDesc"
            placeholder="Beschreibung (optional)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div class="flex gap-2 pt-1">
            <button
              type="submit"
              class="flex-1 bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Erstellen
            </button>
            <button
              type="button"
              class="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              @click="showCreate = false"
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const boards = ref<{ id: number; name: string; description: string }[]>([]);
const showCreate = ref(false);
const newName = ref("");
const newDesc = ref("");

const { data } = await useFetch("/api/boards");
if (data.value) boards.value = data.value as typeof boards.value;

async function createBoard() {
  const board = await $fetch("/api/boards", {
    method: "POST",
    body: { name: newName.value, description: newDesc.value },
  });
  boards.value.push(board as any);
  showCreate.value = false;
  newName.value = "";
  newDesc.value = "";
}
</script>
