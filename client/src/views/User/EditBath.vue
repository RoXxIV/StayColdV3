<template>
  <section>
    <div>
      <h1>Modifier une <span>baignade</span></h1>
      <img src="../../assets/images/poulpe.png" alt="" class="flash" />
    </div>
    <BathForm :editMode="true" />
    <div id="back-to-details">
      <span @click="$router.go(-1)">Retour</span>
    </div>
  </section>
</template>

<script>
import BathForm from "../../components/Baths/BathForm.vue";
export default {
  name: "Edit-bath",
  title: "Modifier une baignade",
  components: { BathForm },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 30px 10px 30px 0;
    span {
      color: $blue;
    }
  }
  img {
    max-width: 60px;
  }
  @include media-max(611.98px) {
    flex-direction: column;
  }
}
#back-to-details {
  margin-top: 30px;
  span {
    text-decoration: underline;
    color: $blue;
    font-size: 1.2em;
    cursor: pointer;
  }
}
</style>
