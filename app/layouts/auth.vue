<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <span class="font-bold text-2xl text-indigo-600">Konban</span>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <slot />
      </div>
    </div>
  </div>
</template>
