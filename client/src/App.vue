<template>
  <div id="app">
    <!--header-->
    <MyHeader />
    <!-----Main Content----->
    <main>
      <router-view />
    </main>
    <!--header-->
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
