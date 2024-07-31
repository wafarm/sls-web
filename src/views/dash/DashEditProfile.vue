<script setup lang="ts">
import TextInput from "@/components/TextInput.vue";
import type { Profile } from "@/models";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const profile = ref(null as null | Profile);
const input = ref({
  name: "",
  ms_auth: false,
  skin_model: "",
  skin: null as null | File,
  cape: null as null | File,
});

const err = ref("");
const errSkin = ref("");
const errCape = ref("");

async function loadDataOrExit() {
  profile.value = await axios
    .get("/starlight/profile/" + id)
    .then((resp) => resp.data)
    .catch(() => {
      router.replace("/dash/profiles");
    });

  input.value.name = profile.value!!.name;
  input.value.ms_auth = profile.value!!.ms_auth;
}

async function update(event: Event) {
  event.preventDefault();
  if (!input.value.name.match(/^[a-zA-Z0-9_]{3,16}$/)) {
    err.value = "名称必须由 3 至 16 位的字母、数字或下划线组成";
    return;
  } else {
    err.value = "";
  }

  await axios
    .patch("/starlight/profile/" + id, {
      slot: parseInt(id as string),
      name: input.value.name,
      ms_auth: input.value.ms_auth,
    })
    .then(async () => {
      toast.success("已更新");
      await loadDataOrExit();
    })
    .catch((errorResponse) => {
      err.value = errorResponse.response.data;
    });
}

async function del(event: Event) {
  event.preventDefault();
  await axios.delete("/starlight/profile/" + id);
  await router.replace("/dash/profiles");
}

async function updateSkin(event: Event) {
  event.preventDefault();
  if (input.value.skin == null) {
    errSkin.value = "请选择皮肤";
    return;
  }
  if (input.value.skin.size > 1024 * 1024) {
    errSkin.value = "文件过大";
  }
  if (input.value.skin_model == "") {
    errSkin.value = "请选择皮肤类型";
    return;
  }
  errSkin.value = "";

  await axios
    .put(`/starlight/profile/${id}/skin`, {
      model: parseInt(input.value.skin_model),
      data: await toBase64(input.value.skin),
    })
    .then(() => {
      toast.success("皮肤更新成功");
    })
    .catch((errorResponse) => {
      errSkin.value = errorResponse.response.data;
    });
}

async function updateCape(event: Event) {
  event.preventDefault();
  if (input.value.cape == null) {
    errCape.value = "请选择披风";
    return;
  }
  if (input.value.cape.size > 1024 * 1024) {
    errSkin.value = "文件过大";
  }
  errCape.value = "";

  await axios
    .put(`/starlight/profile/${id}/cape`, {
      data: await toBase64(input.value.cape),
    })
    .then(() => {
      toast.success("披风更新成功");
    })
    .catch((errorResponse) => {
      errCape.value = errorResponse.response.data;
    });
}

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
  });

function selectFile() {
  return new Promise((resolve) => {
    let input = document.createElement("input");
    input.type = "file";
    input.multiple = false;
    input.accept = "image/png";

    input.onchange = () => {
      resolve(input.files?.item(0));
    };

    input.click();
  });
}

async function selectSkin(event: Event) {
  event.preventDefault();
  const file = await selectFile();
  if (file != null) {
    input.value.skin = file as File;
  }
}

async function selectCape(event: Event) {
  event.preventDefault();
  const file = await selectFile();
  if (file != null) {
    input.value.cape = file as File;
  }
}

onMounted(async () => {
  await loadDataOrExit();
});
</script>

<template>
  <div class="px-32 pt-5 select-none">
    <div class="mb-10 flex items-center">
      <h1 class="text-4xl">编辑角色</h1>
    </div>
    <div class="flex justify-between">
      <div class="w-2/5">
        <div class="mb-5">
          <label for="name" class="inline-block text-lg min-w-24 mb-2">名称</label>
          <TextInput id="name" type="text" required v-model="input.name" />
        </div>
        <div class="mb-5">
          <label for="uuid" class="inline-block text-lg min-w-24 mb-2">UUID</label>
          <TextInput
            id="uuid"
            disabled="true"
            type="text"
            required
            :value="profile?.uuid"
            class="cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
        <div class="mb-5 flex items-center gap-2">
          <input
            id="msAuth"
            type="checkbox"
            v-model="input.ms_auth"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 transition"
          />
          <label for="msAuth" class="inline-block">正版验证</label>
        </div>
        <div v-if="err.length != 0" class="mb-5 flex items-center">
          <span class="text-red-500">{{ err }}</span>
        </div>
        <div class="flex justify-between items-center gap-3">
          <button
            @click="update"
            class="flex-1 rounded-lg p-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-300"
          >
            更新角色
          </button>
          <button
            @click="del"
            class="flex-1 border border-gray-300 rounded-lg p-2.5 hover:bg-gray-100 active:bg-gray-200 transition duration-300"
          >
            删除角色
          </button>
        </div>
      </div>
      <div class="w-1/5">
        <div class="mb-5 flex items-center gap-2">
          <button
            @click="selectSkin"
            class="w-1/3 border border-gray-300 rounded-lg p-2.5 hover:bg-gray-100 active:bg-gray-200 transition duration-300"
          >
            选择皮肤
          </button>
          <span class="ml-4">{{ input.skin?.name ?? "未选择" }}</span>
        </div>
        <div class="mb-5 flex items-center gap-5">
          <div class="mr-5 flex items-center gap-2">
            <input
              id="classic"
              name="skinModel"
              type="radio"
              value="0"
              v-model="input.skin_model"
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 transition"
            />
            <label for="classic" class="inline-block">经典</label>
          </div>
          <div class="ml-5 flex items-center gap-2">
            <input
              id="slim"
              name="skinModel"
              type="radio"
              value="1"
              v-model="input.skin_model"
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 transition"
            />
            <label for="slim" class="inline-block">纤细</label>
          </div>
        </div>
        <div v-if="errSkin.length != 0" class="mb-5 flex items-center">
          <span class="text-red-500">{{ errSkin }}</span>
        </div>
        <div class="flex items-center">
          <button
            @click="updateSkin"
            class="rounded-lg p-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-300 w-1/3"
          >
            更新皮肤
          </button>
        </div>
      </div>
      <div class="w-1/5">
        <div class="mb-5 flex items-center gap-2">
          <button
            @click="selectCape"
            class="w-1/3 border border-gray-300 rounded-lg p-2.5 hover:bg-gray-100 active:bg-gray-200 transition duration-300"
          >
            选择披风
          </button>
          <span class="ml-4">{{ input.cape?.name ?? "未选择" }}</span>
        </div>
        <div v-if="errCape.length != 0" class="mb-5 flex items-center">
          <span class="text-red-500">{{ errCape }}</span>
        </div>
        <div class="flex items-center">
          <button
            @click="updateCape"
            class="rounded-lg p-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-300 w-1/3"
          >
            更新披风
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
