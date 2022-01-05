<template>
  <button @click="logout">Deconnexion</button>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style lang="scss" scoped></style>
