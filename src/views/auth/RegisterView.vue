<script setup lang="ts">
import TextInput from "@/components/TextInput.vue";
import AuthContainer from "@/views/auth/AuthContainer.vue";
import { ref } from "vue";

const input = ref({
  email: "",
  password: "",
  repeatPassword: "",
});

function register(event: Event) {
  event.preventDefault();
}
</script>

<template>
  <AuthContainer>
    <form class="w-full">
      <div class="mb-10 flex justify-center items-center">
        <h1 class="text-4xl">Register</h1>
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="email" class="inline-block text-lg min-w-24">Email</label>
        <TextInput id="email" type="email" required v-model="input.email" />
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="password" class="inline-block text-lg min-w-24">Password</label>
        <TextInput id="password" type="password" required v-model="input.password" />
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="repeatPassword" class="inline-block text-lg min-w-24">Repeat PW</label>
        <TextInput id="repeatPassword" type="password" required v-model="input.repeatPassword" />
      </div>
      <div class="flex items-center">
        <button
          @click="register"
          class="rounded-lg p-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-300 w-1/3"
        >
          Register
        </button>
      </div>
    </form>
  </AuthContainer>
</template>

<style scoped></style>
