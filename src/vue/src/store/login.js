import api from "../services/index";

const login = {
  namespaced: true,
  state: {
    checkUser: false,
    isLoggedIn: false,
    userInfo: {},
  },
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
  },
  mutations: {
    SET_CHECK_USER(state, payload) {
      state.checkUser = payload;
    },
    SET_USER_LOGIN(state, payload) {
      state.isLoggedIn = true;
      state.userInfo = payload.user;
      localStorage.setItem(
        process.env.VUE_APP_USER_LOGIN,
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userInfo: state.userInfo,
        })
      );
    },
    GET_USER_FROM_LOCAL_STORAGE(state) {
      const data = JSON.parse(
        localStorage.getItem(process.env.VUE_APP_USER_LOGIN)
      );
      if (data) {
        state.isLoggedIn = data.isLoggedIn;
        state.userInfo = data.userInfo;
      }
    },
  },
  actions: {
    async login({ commit }, dataForm) {
      const { success, data } = await api("login", dataForm);
      if (success && data.user && Object.keys(data.user).length) {
        commit("SET_USER_LOGIN", data);
      }
    },
  },
};

export default login;
