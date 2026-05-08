<template>
  <div>
    <h1 class="text-xl font-semibold text-gray-900 mb-6">Anmelden</h1>
    <form class="space-y-4" @submit.prevent="submit">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
        <input
          v-model="email"
          type="email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
        <input
          v-model="password"
          type="password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {{ loading ? 'Lädt…' : 'Anmelden' }}
      </button>
    </form>
    <p class="mt-4 text-center text-sm text-gray-500">
      Noch kein Konto?
      <NuxtLink to="/auth/register" class="text-indigo-600 hover:underline">Registrieren</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    navigateTo('/boards')
  } catch (e: any) {
    error.value = e?.data?.message ?? 'Anmeldung fehlgeschlagen'
  } finally {
    loading.value = false
  }
}
</script>
