<template>
  <div class="p-6 h-full flex flex-col">
    <div class="mb-6">
      <NuxtLink to="/boards" class="text-sm text-gray-500 hover:text-gray-700">← Boards</NuxtLink>
      <h1 class="text-xl font-semibold text-gray-900 mt-1">{{ board?.name }}</h1>
    </div>

    <div class="flex gap-4 overflow-x-auto flex-1 pb-4">
      <div
        v-for="column in columns"
        :key="column.id"
        class="w-72 flex-shrink-0 bg-gray-100 rounded-xl p-3 flex flex-col gap-2"
      >
        <h2 class="font-medium text-gray-700 px-1">{{ column.name }}</h2>
        <div class="flex flex-col gap-2 flex-1">
          <div
            v-for="task in column.tasks"
            :key="task.id"
            class="bg-white rounded-lg p-3 shadow-sm border border-gray-200 text-sm text-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          >
            {{ task.title }}
          </div>
        </div>
        <button
          class="text-sm text-gray-500 hover:text-gray-700 text-left px-1 py-1"
          @click="addTask(column)"
        >
          + Karte hinzufügen
        </button>
      </div>

      <button
        class="w-72 flex-shrink-0 bg-gray-100 hover:bg-gray-200 rounded-xl p-3 text-sm text-gray-500 hover:text-gray-700 text-left transition-colors"
        @click="addColumn"
      >
        + Liste hinzufügen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const boardId = route.params.id as string

type Task = { id: number; title: string }
type Column = { id: number; name: string; tasks: Task[] }
type Board = { id: number; name: string; description: string }

const board = ref<Board | null>(null)
const columns = ref<Column[]>([])

const { data } = await useFetch(`/api/boards/${boardId}`)
if (data.value) {
  const d = data.value as { board: Board; columns: Column[] }
  board.value = d.board
  columns.value = d.columns
}

async function addColumn() {
  const name = prompt('Spaltenname:')
  if (!name) return
  const col = await $fetch(`/api/boards/${boardId}/columns`, {
    method: 'POST',
    body: { name },
  })
  columns.value.push({ ...(col as any), tasks: [] })
}

async function addTask(column: Column) {
  const title = prompt('Kartentitel:')
  if (!title) return
  const task = await $fetch(`/api/columns/${column.id}/tasks`, {
    method: 'POST',
    body: { title },
  })
  column.tasks.push(task as Task)
}
</script>
