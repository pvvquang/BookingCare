import constant from "../constant/index";
const { TOAST_MESSAGE } = constant;

const common = {
  namespaced: true,
  state: {
    isOpenModal: false,
    dataModal: null,
    isShowSpinner: false,
    showToastMessage: "",
    textToastMessage: "",
    duration: 5000,
    typePopup: "",
  },
  mutations: {
    SET_OPEN_MODAL(state, payload) {
      state.isOpenModal = true;
      state.dataModal = payload;
    },
    SET_TYPE_POPUP(state, payload) {
      state.typePopup = payload;
    },
    SET_CLOSE_MODAL(state, payload) {
      state.isOpenModal = false;
      state.dataModal = payload;
    },
    SET_OPEN_SPINNER(state) {
      state.isShowSpinner = true;
    },
    SET_CLOSE_SPINNER(state) {
      state.isShowSpinner = false;
    },
    SHOW_TOAST_SUCCESS(state, payload) {
      state.showToastMessage = TOAST_MESSAGE.SUCCESS;
      state.textToastMessage = payload;
      setTimeout(() => {
        state.showToastMessage = "";
      }, state.duration);
    },
    SHOW_TOAST_WARNING(state, payload) {
      state.showToastMessage = TOAST_MESSAGE.WARNING;
      state.textToastMessage = payload;
      setTimeout(() => {
        state.showToastMessage = "";
      }, state.duration);
    },
    SHOW_TOAST_INFO(state, payload) {
      state.showToastMessage = TOAST_MESSAGE.INFO;
      state.textToastMessage = payload;
      setTimeout(() => {
        state.showToastMessage = "";
      }, state.duration);
    },
    SHOW_TOAST_ERROR(state, payload) {
      state.showToastMessage = TOAST_MESSAGE.ERROR;
      state.textToastMessage = payload;
      setTimeout(() => {
        state.showToastMessage = "";
      }, state.duration);
    },
  },
};

export default common;
