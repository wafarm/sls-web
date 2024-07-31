import App from "@/App.vue";
import "@/index.css";
import { router } from "@/router";
import { useAuthStore } from "@/store";
import axios from "axios";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { useRouter } from "vue-router";
import Toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

axios.defaults.baseURL = "/api";
axios.interceptors.request.use((config) => {
  const store = useAuthStore();
  if (store.authenticated) {
    config.headers.set("Authorization", "Bearer " + store.token);
  }
  return config;
});

axios.interceptors.response.use(
  (respoonse) => {
    return respoonse;
  },
  (error) => {
    const store = useAuthStore();
    if (error.status == 401 && store.authenticated) {
      // token expired
      const router = useRouter();
      store.authenticated = false;
      store.token = null;
      router.push("/auth/login");
    } else {
      return Promise.reject(error);
    }
  },
);

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(Toast);
app.use(pinia);
app.use(router);

app.mount("#app");
