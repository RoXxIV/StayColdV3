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

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 100vw;
  main {
    flex: 1 0 auto;
    section {
      width: 75%;
      margin: auto;
    }
  }
}
</style>
