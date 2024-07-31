<script setup lang="ts">
import TextInput from "@/components/TextInput.vue";
import { useAuthStore } from "@/store";
import AuthContainer from "@/views/auth/AuthContainer.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const input = ref({ username: "", password: "", remember: false });
const err = ref("");
const router = useRouter();
const store = useAuthStore();

function login(event: Event) {
  event.preventDefault();
  if (input.value.username.length == 0) {
    err.value = "用户名不能为空";
    return;
  }
  if (input.value.password.length == 0) {
    err.value = "密码不能为空";
    return;
  }
  axios
    .post("/starlight/user/login", {
      username: input.value.username,
      password: input.value.password,
    })
    .then((resp) => {
      store.token = resp.data;
      store.authenticated = true;

      if (input.value.remember) {
        store.rememberedPassword = true;
        store.username = input.value.username;
        store.password = input.value.password;
      } else {
        store.rememberedPassword = false;
        store.username = null;
        store.password = null;
      }

      router.push("/dash");
    })
    .catch((errorResponse) => {
      err.value = errorResponse.response.data;
    });
}

function register(event: Event) {
  event.preventDefault();
  router.push("/auth/register");
}

onMounted(() => {
  if (store.rememberedPassword) {
    input.value.remember = true;
    input.value.username = store.username!!;
    input.value.password = store.password!!;
  }
});
</script>

<template>
  <AuthContainer>
    <form class="w-full">
      <div class="mb-10 flex justify-center items-center">
        <h1 class="text-4xl">登录</h1>
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="username" class="inline-block text-lg min-w-24">用户名</label>
        <TextInput id="username" type="text" required v-model="input.username" />
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="password" class="inline-block text-lg min-w-24">密码</label>
        <TextInput id="password" type="password" required v-model="input.password" />
      </div>
      <div class="mb-5 flex items-center gap-2">
        <input
          id="remember"
          type="checkbox"
          v-model="input.remember"
          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 transition"
        />
        <label for="remember" class="inline-block">记住密码</label>
      </div>
      <div v-if="err.length != 0" class="mb-5 flex items-center">
        <span class="text-red-500">{{ err }}</span>
      </div>
      <div class="flex justify-between items-center gap-3">
        <button
          @click="login"
          class="flex-1 rounded-lg p-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-300"
        >
          登录
        </button>
        <button
          @click="register"
          class="flex-1 border border-gray-300 rounded-lg p-2.5 hover:bg-gray-100 active:bg-gray-200 transition duration-300"
        >
          注册
        </button>
      </div>
    </form>
  </AuthContainer>
</template>

<style scoped></style>
