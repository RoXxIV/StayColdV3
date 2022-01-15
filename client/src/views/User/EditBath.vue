<template>
  <section>
    <h1>Modifier une <span class="text-blue">baignade</span></h1>
    <BathForm :editMode="true" />
  </section>
</template>

<script>
import BathForm from "../../components/Baths/BathForm.vue";
export default {
  name: "Edit-bath",
  components: { BathForm },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 75%;
  margin: auto;
  h1 {
    margin: 50px auto 50px auto;
  }
  @media (max-width: 991.98px) {
    width: 100%;
  }
}
</style>
