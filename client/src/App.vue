<template>
  <div id="app">
    <!--header-->
    <MyHeader />
    <!-----Main Content----->
    <p v-if="loggedIn">test</p>
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
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
};
</script>

<style lang="scss"></style>
