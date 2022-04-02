import api from "../services/index";

const login = {
  namespaced: true,
  state: {
    checkUser: false,
    isLoggedIn: false,
    userInfo: {},
  },
  mutations: {
    setCheckUser(state, payload) {
      state.checkUser = payload;
    },
    setUserLogin(state, payload) {
      state.isLoggedIn = true;
      state.userInfo = payload;
      // localStorage.setItem(
      //   process.env.USER_LOGIN,
      //   JSON.stringify({
      //     isLoggedIn: state.isLoggedIn,
      //     userInfo: state.userInfo,
      //   })
      // );
    },
  },
  actions: {
    async login({ commit }, dataForm) {
      const { success, data } = await api("login", dataForm);
      if (success && data.userInfo && Object.keys(data.userInfo).length) {
        commit("setUserLogin", data);
      }
    },
  },
};

export default login;
