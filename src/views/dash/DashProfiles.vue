<script setup lang="ts">
import ProfileCard from "@/components/ProfileCard.vue";
import { ref } from "vue";

const profiles = ref<{ id: number; name: string }[]>([]);
const idx = ref(0);

function addProfile(event: Event) {
  event.preventDefault();
  profiles.value.push({ name: "Wafarm", id: idx.value });
  idx.value = idx.value + 1;
}
</script>

<template>
  <div class="px-32 pt-5 select-none">
    <div class="flex items-center gap-5">
      <span class="text-4xl">My Profiles</span>
      <button
        @click="addProfile"
        class="rounded-lg p-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-300"
      >
        Add
      </button>
    </div>
    <div class="flex flex-wrap gap-5 py-5">
      <span v-if="profiles.length == 0">Empty</span>
      <ProfileCard v-else v-for="profile in profiles" :key="profile.id" :name="profile.name" />
    </div>
  </div>
</template>

<style scoped></style>
