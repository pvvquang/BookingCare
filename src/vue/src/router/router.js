import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const baseURL = "/";

const routes = [
  {
    path: "",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Auth/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: baseURL,
  routes,
});

export default router;
