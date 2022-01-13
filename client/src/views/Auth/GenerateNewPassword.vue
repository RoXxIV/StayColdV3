<template>
  <section>
    <p>new pass works</p>
    <Loading />
  </section>
</template>

<script>
//import AuthServices from "../../services/auth-services";
import Loading from "../../components/Reusable-components/Loading.vue";
export default {
  name: "Confirm-mail",
  components: {
    Loading,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
