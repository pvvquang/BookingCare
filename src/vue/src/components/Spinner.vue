<template>
  <div class="overlay" v-if="isShowSpinner">
    <div
      class="spinner-border text-primary"
      style="width: 3rem; height: 3rem"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("common", ["isShowSpinner"]),
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #000;
  opacity: 0.4;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
