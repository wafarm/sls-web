<script setup lang="ts">
import ProfileCard from "@/components/ProfileCard.vue";
import TextInput from "@/components/TextInput.vue";
import type { Profile, User } from "@/models";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const user = ref(null as null | User);
const profiles = ref<Profile[]>([]);
const firstEmptySlot = computed(() => {
  // O(n^2) but it doesn't matter
  let slot: number = 1;
  let found = true;
  while (found) {
    found = false;
    for (const profile of profiles.value) {
      if (profile.slot == slot) {
        slot++;
        found = true;
        break;
      }
    }
  }

  if (user.value?.admin || slot <= 2) {
    return slot;
  }

  return null;
});

const addDialog = ref(false);
const newProfile = ref({
  name: "",
  msAuth: false,
});
const err = ref("");

async function loadData() {
  user.value = await axios.get("/starlight/user/info").then((resp) => resp.data);
  profiles.value = await axios.get("/starlight/profile/list").then((resp) => resp.data);
}

function addProfile(event: Event) {
  event.preventDefault();
  if (firstEmptySlot.value == null) {
    toast.error("没有更多空余槽位了！");
    return;
  }

  addDialog.value = true;
  newProfile.value.name = "";
  newProfile.value.msAuth = false;
}

function doAddProfile(event: Event) {
  event.preventDefault();
  if (!newProfile.value.name.match(/^[a-zA-Z0-9_]{3,16}$/)) {
    err.value = "名称必须由 3 至 16 位的字母、数字或下划线组成";
    return;
  }

  axios
    .put("/starlight/profile/add", {
      slot: firstEmptySlot.value,
      name: newProfile.value.name,
      ms_auth: newProfile.value.msAuth,
    })
    .then(() => {
      addDialog.value = false;
      loadData();
    })
    .catch((errorResponse) => {
      err.value = errorResponse.response.data;
    });
}

onMounted(async () => {
  await loadData();
});
</script>

<template>
  <div class="px-32 pt-5 select-none">
    <div class="flex items-center gap-5">
      <span class="text-4xl">我的角色</span>
      <button
        @click="addProfile"
        class="rounded-lg p-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-300"
      >
        添加
      </button>
    </div>
    <div class="flex flex-wrap gap-5 py-5">
      <span v-if="profiles.length == 0">空</span>
      <ProfileCard v-else v-for="profile in profiles" :key="profile.slot" :name="profile.name" />
    </div>
  </div>
  <div
    @click="addDialog = false"
    v-if="addDialog"
    class="select-none absolute top-0 left-0 min-h-screen w-screen grid items-center bg-gray-800 bg-opacity-50"
  >
    <dialog class="block p-10 rounded-2xl" @click.stop="">
      <form>
        <div class="mb-10 flex justify-center items-center">
          <h1 class="text-4xl">添加角色</h1>
        </div>
        <div class="mb-5 flex justify-between items-center gap-3">
          <label for="name" class="inline-block text-lg min-w-24">名称</label>
          <TextInput id="name" type="text" required v-model="newProfile.name" />
        </div>
        <div class="mb-5 flex items-center gap-2">
          <input
            id="msAuth"
            type="checkbox"
            v-model="newProfile.msAuth"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 transition"
          />
          <label for="msAuth" class="inline-block">正版验证</label>
        </div>
        <div v-if="err.length != 0" class="mb-5 flex items-center">
          <span class="text-red-500">{{ err }}</span>
        </div>
        <div class="flex items-center">
          <button
            @click="doAddProfile"
            class="rounded-lg p-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-300 w-1/3"
          >
            Add
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<style scoped></style>
