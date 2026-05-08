export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<{ id: number; email: string; name: string } | null>(null)

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  async function login(email: string, password: string) {
    const data = await $fetch<{ token: string; user: typeof user.value }>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    token.value = data.token
    user.value = data.user
    if (import.meta.client) {
      localStorage.setItem('auth_token', data.token)
    }
  }

  async function register(email: string, password: string, name: string) {
    const data = await $fetch<{ token: string; user: typeof user.value }>('/api/auth/register', {
      method: 'POST',
      body: { email, password, name },
    })
    token.value = data.token
    user.value = data.user
    if (import.meta.client) {
      localStorage.setItem('auth_token', data.token)
    }
  }

  async function logout() {
    token.value = null
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
    }
  }

  async function restore() {
    if (!import.meta.client) return
    const stored = localStorage.getItem('auth_token')
    if (!stored) return
    try {
      const data = await $fetch<{ user: typeof user.value }>('/api/auth/me', {
        headers: { Authorization: `Bearer ${stored}` },
      })
      token.value = stored
      user.value = data.user
    } catch {
      localStorage.removeItem('auth_token')
    }
  }

  return { token, user, isLoggedIn, login, register, logout, restore }
})
