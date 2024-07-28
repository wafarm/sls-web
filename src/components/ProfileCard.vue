<script setup lang="ts">
import { SkinViewer } from "skinview3d";
import { onMounted, ref } from "vue";

defineProps(["name"]);

let canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  let skinViewer = new SkinViewer({
    canvas: canvas.value!!,
    height: canvas.value!!.height,
    width: canvas.value!!.width,
    skin: "/1.png",
  });

  skinViewer.render();
});
</script>

<template>
  <div
    class="rounded-2xl bg-gray-100 hover:bg-gray-200 hover:cursor-pointer p-5 w-fit flex flex-col items-center transition"
  >
    <canvas width="180" height="240" ref="canvas" />
    <span class="mc-font text-xl select-none">{{ name }}</span>
  </div>
</template>

<style scoped></style>
