import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    authenticated: false,
    token: null as string | null,
    rememberedPassword: false,
    username: null as string | null,
    password: null as string | null,
  }),
  actions: {},
  persist: true,
});
