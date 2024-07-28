import { useAuthStore } from "@/store";
import NotFound from "@/views/NotFound.vue";
import AdminContainer from "@/views/admin/AdminContainer.vue";
import AdminHome from "@/views/admin/AdminHome.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import DashContainer from "@/views/dash/DashContainer.vue";
import DashHome from "@/views/dash/DashHome.vue";
import DashProfiles from "@/views/dash/DashProfiles.vue";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { name: "Login" },
  },
  {
    name: "Login",
    path: "/auth/login",
    component: LoginView,
  },
  {
    name: "Register",
    path: "/auth/register",
    component: RegisterView,
  },
  {
    path: "/dash",
    component: DashContainer,
    children: [
      { path: "", component: DashHome },
      { path: "profiles", component: DashProfiles },
    ],
  },
  {
    path: "/admin",
    component: AdminContainer,
    children: [{ path: "", component: AdminHome }],
  },
  {
    name: "NotFound",
    path: "/404",
    component: NotFound,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const store = useAuthStore();
  console.log(store.authenticated);
  if (store.authenticated) {
    if (to.name === "Login" || to.name === "Register") {
      return "/dash";
    }
  } else {
    if (to.name !== "Login" && to.name !== "Register" && to.name !== "NotFound") {
      return "/auth/login";
    }
  }
});
