<!--suppress HtmlUnknownTarget -->
<script setup lang="ts">
import type { User } from "@/models";
import { router } from "@/router";
import { useAuthStore } from "@/store";
import axios from "axios";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const user = ref(null as null | User);

function logout(event: Event) {
  event.preventDefault();
  authStore.authenticated = false;
  authStore.token = null;
  router.push("/auth/login");
}

onMounted(async () => {
  user.value = await axios.get("/starlight/user/info").then((resp) => resp.data);
});
</script>

<template>
  <nav class="bg-gray-700 w-full p-3 select-none">
    <div class="flex items-center justify-between">
      <div class="flex gap-3">
        <span class="text-white text-xl mc-font">StarLight</span>
        <RouterLink to="/dash" class="inline-block text-gray-400 text-lg">主页</RouterLink>
        <RouterLink to="/dash/profiles" class="inline-block text-gray-400 text-lg"
          >角色
        </RouterLink>
        <RouterLink v-if="user?.admin" to="/admin" class="inline-block text-gray-400 text-lg"
          >管理</RouterLink
        >
      </div>
      <div class="flex gap-3">
        <span class="text-white text-lg mc-font">{{ user?.name }}</span>
        <button class="text-gray-400 text-lg" @click="logout">登出</button>
      </div>
    </div>
  </nav>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
