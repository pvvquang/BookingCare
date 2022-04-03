import Vue from "vue";
import VueX from "vuex";
import login from "./login";
import userManage from "./userManage";
import common from "./common";

Vue.use(VueX);

export default new VueX.Store({
  modules: {
    login,
    userManage,
    common,
  },
});
