<script setup lang="ts">
const auth = useAuthStore()
await auth.restore()
navigateTo(auth.isLoggedIn ? '/boards' : '/auth/login', { replace: true })
</script>
