<script setup lang="ts">
import TextInput from "@/components/TextInput.vue";
import AuthContainer from "@/views/auth/AuthContainer.vue";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const input = ref({
  username: "",
  qq: "",
  password: "",
  repeatPassword: "",
});
const err = ref("");
const router = useRouter();

function register(event: Event) {
  event.preventDefault();
  if (!input.value.username.match(/^[a-zA-Z0-9_]{3,20}$/)) {
    err.value = "用户名必须由 3 至 20 位字母或数字或下划线组成";
    return;
  }

  if (!input.value.qq.match(/^[0-9]{5,}$/)) {
    err.value = "QQ 不合法";
    return;
  }

  if (input.value.password.length < 6) {
    err.value = "密码至少要有 6 位";
    return;
  }

  if (input.value.password != input.value.repeatPassword) {
    err.value = "重复密码与密码不匹配";
    return;
  }

  axios
    .post("/starlight/user/register", {
      username: input.value.username,
      qq: parseInt(input.value.qq),
      password: input.value.password,
    })
    .then(() => {
      router.push("/auth/login");
    })
    .catch((errorResponse) => {
      err.value = errorResponse.response.data;
    });
}
</script>

<template>
  <AuthContainer>
    <form class="w-full">
      <div class="mb-10 flex justify-center items-center">
        <h1 class="text-4xl">注册</h1>
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="username" class="inline-block text-lg min-w-24">用户名</label>
        <TextInput id="username" type="text" required v-model="input.username" />
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="qq" class="inline-block text-lg min-w-24">QQ</label>
        <TextInput id="qq" type="text" required v-model="input.qq" />
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="password" class="inline-block text-lg min-w-24">密码</label>
        <TextInput id="password" type="password" required v-model="input.password" />
      </div>
      <div class="mb-5 flex justify-between items-center gap-3">
        <label for="repeatPassword" class="inline-block text-lg min-w-24">重复密码</label>
        <TextInput id="repeatPassword" type="password" required v-model="input.repeatPassword" />
      </div>
      <div v-if="err.length != 0" class="mb-5 flex items-center">
        <span class="text-red-500">{{ err }}</span>
      </div>
      <div class="flex items-center">
        <button
          @click="register"
          class="rounded-lg p-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-300 w-1/3"
        >
          注册
        </button>
      </div>
    </form>
  </AuthContainer>
</template>

<style scoped></style>
