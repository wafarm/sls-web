<script setup lang="ts">
import TextInput from "@/components/TextInput.vue";
import { useAuthStore } from "@/store";
import AuthContainer from "@/views/auth/AuthContainer.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const input = ref({ email: "", password: "", remember: false });
const router = useRouter();
const store = useAuthStore();

function login(event: Event) {
  event.preventDefault();

  store.authenticated = true;
  router.push("/dash");
}

function register(event: Event) {
  event.preventDefault();
  router.push("/auth/register");
}
</script>

<template>
  <AuthContainer>
    <form class="w-full">
      <div class="mb-10 flex justify-center items-center">
        <h1 class="text-4xl">Login</h1>
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="email" class="inline-block text-lg min-w-24">Email</label>
        <TextInput id="email" type="email" required v-model="input.email" />
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="password" class="inline-block text-lg min-w-24">Password</label>
        <TextInput id="password" type="password" required v-model="input.password" />
      </div>
      <div class="mb-5 flex items-center gap-2">
        <input
          id="remember"
          type="checkbox"
          v-model="input.remember"
          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 transition"
        />
        <label for="remember" class="inline-block">Remember me</label>
      </div>
      <div class="flex justify-between items-center gap-3">
        <button
          @click="login"
          class="flex-1 rounded-lg p-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-300"
        >
          Login
        </button>
        <button
          @click="register"
          class="flex-1 border border-gray-300 rounded-lg p-2.5 hover:bg-gray-100 active:bg-gray-200 transition duration-300"
        >
          Register
        </button>
      </div>
    </form>
  </AuthContainer>
</template>

<style scoped></style>
