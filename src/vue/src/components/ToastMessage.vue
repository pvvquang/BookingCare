<template>
  <div class="toast__message-wrap">
    <Transition name="slide-fade">
      <div
        class="toast__message success"
        v-if="showToastMessage === TOAST_MESSAGE.SUCCESS"
      >
        <div class="text">{{ textToastMessage }}</div>
      </div>
    </Transition>

    <Transition name="slide-fade">
      <div
        class="toast__message info"
        v-if="showToastMessage === TOAST_MESSAGE.INFO"
      >
        <div class="text">{{ textToastMessage }}</div>
      </div>
    </Transition>

    <Transition name="slide-fade">
      <div
        class="toast__message warning"
        v-if="showToastMessage === TOAST_MESSAGE.WARNING"
      >
        <div class="text">{{ textToastMessage }}</div>
      </div>
    </Transition>

    <Transition name="slide-fade">
      <div
        class="toast__message error"
        v-if="showToastMessage === TOAST_MESSAGE.ERROR"
      >
        <div class="text">{{ textToastMessage }}</div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import constant from "../constant/index";
const { TOAST_MESSAGE } = constant;

export default {
  computed: {
    ...mapState("common", ["textToastMessage", "showToastMessage"]),
    TOAST_MESSAGE() {
      return TOAST_MESSAGE;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.toast__message-wrap {
  position: fixed;
  z-index: 1000;
  top: 2rem;
  right: 2rem;

  .toast__message {
    animation-duration: 0.15s;
    margin: 0.5em 0;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.4);
    border-radius: 2em;
    padding: 0.75em 1.5em;
    pointer-events: auto;
    opacity: 0.92;
    min-width: 200px;

    &.warning {
      color: rgba(0, 0, 0, 0.7);
      background: #ffe08a;
    }

    &.success {
      color: rgba(255, 255, 255, 0.7);
      background: #3ec487;
    }

    &.error {
      background: #f03a5f;
      color: rgba(255, 255, 255, 0.7);
    }

    &.info {
      background: #3e56c3;
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
