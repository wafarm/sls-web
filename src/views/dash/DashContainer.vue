<!--suppress HtmlUnknownTarget -->
<script setup lang="ts">
import { router } from "@/router";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

function logout(event: Event) {
  event.preventDefault();
  authStore.$reset();
  router.push("/auth/login");
}
</script>

<template>
  <nav class="bg-gray-700 w-full p-3 select-none">
    <div class="flex items-center justify-between">
      <div class="flex gap-3">
        <span class="text-white text-xl mc-font">StarLight</span>
        <RouterLink to="/dash" class="inline-block text-gray-400 text-lg">Home</RouterLink>
        <RouterLink to="/dash/profiles" class="inline-block text-gray-400 text-lg"
          >Profiles
        </RouterLink>
        <RouterLink to="/admin" class="inline-block text-gray-400 text-lg">Admin</RouterLink>
      </div>
      <div>
        <button class="text-gray-400 text-lg" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
