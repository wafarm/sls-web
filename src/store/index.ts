import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    authenticated: false,
    token: null,
  }),
  actions: {},
  persist: true,
});
