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
    <MyFooter />
  </div>
</template>

<script>
import MyHeader from "./components/Structure/Header/MyHeader.vue";
import MyFooter from "./components/Structure/Footer/MyFooter.vue";
export default {
  name: "App",
  components: { MyHeader, MyFooter },
};
</script>

<style lang="scss" scoped>
/* Transition routeur view __________*/
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  main {
    flex: 1 0 auto;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
