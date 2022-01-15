<template>
  <section>
    <h1>Ajouter une <span class="text-blue">baignade</span></h1>
    <BathForm :editMode="false" />
  </section>
</template>

<script>
import BathForm from "../../components/Baths/BathForm.vue";
export default {
  name: "Add-bath",
  components: { BathForm },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
