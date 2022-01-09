<template>
  <div id="app">
    <!-- Header ----------->
    <MyHeader />
    <!-- Main ----------->
    <main>
      <router-view />
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

<style lang="scss"></style>
