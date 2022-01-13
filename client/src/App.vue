<template>
  <div id="app">
    <!-- Header ----------->
    <MyHeader />
    <!-- Main ----------->

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <!-- Footer ----------->
  </div>
</template>

<script>
import MyHeader from "./components/Structure/Header/MyHeader.vue";
export default {
  name: "App",
  components: { MyHeader },
};
</script>

<style lang="scss" scoped>
/* Transition routeur view __________*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
