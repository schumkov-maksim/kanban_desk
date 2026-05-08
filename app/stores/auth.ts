export const useAuthStore = defineStore('auth', () => {
  const tokenCookie = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
    path: '/',
  })

  const user = ref<{ id: number; email: string; name: string } | null>(null)

  const isLoggedIn = computed(() => !!tokenCookie.value)
  const token = computed(() => tokenCookie.value ?? null)

  async function login(email: string, password: string) {
    const data = await $fetch<{ token: string; user: typeof user.value }>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    tokenCookie.value = data.token
    user.value = data.user
  }

  async function register(email: string, password: string, name: string) {
    const data = await $fetch<{ token: string; user: typeof user.value }>('/api/auth/register', {
      method: 'POST',
      body: { email, password, name },
    })
    tokenCookie.value = data.token
    user.value = data.user
  }

  async function logout() {
    tokenCookie.value = null
    user.value = null
  }

  async function restore() {
    if (!tokenCookie.value) return
    try {
      const data = await $fetch<{ user: typeof user.value }>('/api/auth/me', {
        headers: { Authorization: `Bearer ${tokenCookie.value}` },
      })
      user.value = data.user
    } catch {
      tokenCookie.value = null
    }
  }

  return { token, user, isLoggedIn, login, register, logout, restore }
})
