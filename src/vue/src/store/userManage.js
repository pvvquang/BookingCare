import api from "../services/index";
import store from "./index";
import i18n from "../i18n";

const login = {
  namespaced: true,
  state: {
    listUser: [],
    userEditInfo: {},
  },
  getters: {
    getListUser: (state) => state.listUser,
  },
  mutations: {
    SET_LIST_USER(state, payload) {
      state.listUser = payload;
    },
    SET_EDIT_USER_INFO(state, payload) {
      state.userEditInfo = payload;
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
        if (data.errCode == 0) {
          store.commit(
            "common/SHOW_TOAST_SUCCESS",
            i18n.t("common.create-user-success")
          );
        } else if (data.errCode == 1) {
          store.commit("common/SHOW_TOAST_ERROR", data.message);
        }
      } else {
        store.commit(
          "common/SHOW_TOAST_ERROR",
          i18n.t("common.toast-message-error")
        );
      }
    },
    async getEditUser({ commit }, id) {
      const { success, data } = await api("getEditUser", id);
      if (success) {
        if (data) {
          commit("SET_EDIT_USER_INFO", data);
          return true;
        } else if (data.errCode == 1) {
          store.commit("common/SHOW_TOAST_ERROR", data.message);
          return false;
        }
      } else {
        store.commit(
          "common/SHOW_TOAST_ERROR",
          i18n.t("common.toast-message-error")
        );
        return false;
      }
    },
    async deleteUser(state, id) {
      const { success, data } = await api("deleteUser", id);
      if (success) {
        if (data.errCode == 0) {
          store.commit(
            "common/SHOW_TOAST_SUCCESS",
            i18n.t("common.delete-user-success")
          );
        } else if (data.errCode == 2) {
          store.commit("common/SHOW_TOAST_ERROR", data.message);
        }
      } else {
        store.commit(
          "common/SHOW_TOAST_ERROR",
          i18n.t("common.toast-message-error")
        );
      }
    },
    async editUser(state, userInfo) {
      const { success, data } = await api("editUser", userInfo);
      if (success) {
        if (data.errCode == 0) {
          store.commit(
            "common/SHOW_TOAST_SUCCESS",
            i18n.t("common.update-user-success")
          );
        } else if (data.errCode == 2) {
          store.dispatch("common/SHOW_TOAST_ERROR", data.message);
        }
      } else {
        store.dispatch(
          "common/SHOW_TOAST_ERROR",
          i18n.t("common.toast-message-error")
        );
      }
    },
  },
};

export default login;
