<script setup lang="ts">
const model = defineModel();
</script>

<template>
  <input
    v-model="model"
    class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-base p-2.5 w-full transition"
  />
</template>

<style scoped></style>
