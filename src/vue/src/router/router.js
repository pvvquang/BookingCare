import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const baseURL = "/";

const routes = [
  {
    path: "",
    beforeEnter: (to, from, next) => {
      store.commit("login/GET_USER_FROM_LOCAL_STORAGE");
      next();
    },
    component: () => import("../views/MainPage.vue"),
    children: [
      {
        path: "",
        beforeEnter: (to, from, next) => {
          const isLoggedIn = store.getters["login/getIsLoggedIn"];
          if (!isLoggedIn) {
            next({ name: "Login" });
          }
          next();
        },
        component: () => import("../views/Home.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("../views/Auth/Login.vue"),
      },
      {
        path: "system",
        name: "System",
        component: () => import("../views/System/System.vue"),
        children: [
          {
            path: "user-manage",
            name: "User Manager",
            async beforeEnter(to, from, next) {
              await store.dispatch("userManage/getListUser");
              next();
            },
            component: () => import("../views/System/UserManager.vue"),
          },
        ],
      },
      {
        path: "*",
        name: "404NotFound",
        component: () => import("../views/404NotFound.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: baseURL,
  routes,
});

export default router;
