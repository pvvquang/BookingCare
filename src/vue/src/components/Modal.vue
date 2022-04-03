<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="modal__container">
      <div class="btn__close" @click="handleCloseModal">
        <ion-icon name="close-outline"></ion-icon>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("common", ["isOpenModal"]),
  },
  watch: {},
  methods: {
    ...mapMutations("common", ["SET_CLOSE_MODAL", "SET_TYPE_POPUP"]),
    handleCloseModal() {
      this.SET_TYPE_POPUP(null);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  .overlay {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    opacity: 0.4;
    background: #000;
  }

  .modal__container {
    position: relative;
    z-index: 2;
    background: #fff;
    border-radius: 10px;
    padding: 24px 32px;
  }

  .btn__close {
    position: absolute;
    z-index: 10;
    top: 24px;
    right: 24px;
    cursor: pointer;

    ion-icon {
      font-size: 32px;
    }
  }
}
</style>
