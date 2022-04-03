<template>
  <div id="app">
    <router-view></router-view>
    <ModalCreateNewUser v-if="typePopup === POPUP_CREATE_NEW_USER" />
    <ModalEditUser v-if="typePopup === POPUP_EDIT_USER" />
    <Spinner />
    <ToastMessage />
    <notifications group="notify" />
  </div>
</template>

<script>
import ModalCreateNewUser from "./components/ModalCreateNewUser.vue";
import ModalEditUser from "./components/ModalEditUser.vue";
import Spinner from "./components/Spinner.vue";
import ToastMessage from "./components/ToastMessage.vue";
import { TYPE_POPUP } from "./constant/index";
import { mapState } from "vuex";

const { POPUP_CREATE_NEW_USER, POPUP_EDIT_USER } = TYPE_POPUP;

export default {
  name: "App",
  components: { ModalCreateNewUser, Spinner, ToastMessage, ModalEditUser },
  data() {
    return {
      POPUP_CREATE_NEW_USER,
      POPUP_EDIT_USER,
    };
  },
  watch: {
    typePopup(value) {
      if (value) {
        document.querySelector("body").style.overflow = "hidden";
      } else {
        document.querySelector("body").style.overflow = "unset";
      }
    },
  },
  computed: {
    ...mapState("common", ["typePopup"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
