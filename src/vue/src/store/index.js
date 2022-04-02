import Vue from "vue";
import VueX from "vuex";
import login from "./login";

Vue.use(VueX);

const store = new VueX.Store({
  modules: {
    login,
  },
});

export default store;
