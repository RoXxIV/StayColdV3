<template>
  <transition name="fade">
    <div class="popup-modal" v-if="isVisible">
      <div class="window">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Popup-modal",
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    /**
     * Ouvre le modal
     */
    open() {
      this.isVisible = true;
    },
    /**
     * Referme le modal
     */
    close() {
      this.isVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
/* transitions __________*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* modal __________*/
.popup-modal {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  .window {
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    color: $gray;
  }
}
</style>
