import api from "../services/index";

const login = {
  namespaced: true,
  state: {
    listUser: [],
  },
  getters: {
    getListUser: (state) => state.listUser,
  },
  mutations: {
    SET_LIST_USER(state, payload) {
      state.listUser = payload;
    },
  },
  actions: {
    async getListUser({ commit }) {
      const { success, data } = await api("getListUser");
      if (success) {
        commit("SET_LIST_USER", data);
      }
    },
    async createNewUser(state, userInfo) {
      const { success, data } = await api("createNewUser", userInfo);
      if (success) {
        console.log(data);
      }
    },
    async deleteUser(state, id) {
      const { success, data } = await api("deleteUser", id);
      if (success) {
        console.log(data);
      }
    },
    async editUser(state, id) {
      const { success, data } = await api("editUser", id);
      if (success) {
        console.log(data);
      }
    },
  },
};

export default login;
