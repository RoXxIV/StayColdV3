<template>
  <section>
    <div>
      <h1>Ajouter une <span>baignade</span></h1>
      <img src="../../assets/images/poulpe.png" alt="" class="flash" />
    </div>
    <BathForm :editMode="false" />
    <div id="back-to-profile">
      <span @click="$router.go(-1)">Retour au profil</span>
    </div>
  </section>
</template>

<script>
import BathForm from "../../components/Baths/BathForm.vue";
export default {
  name: "Add-bath",
  title: "Ajouter une baignade",
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
      font-family: $oswald;
    }
  }
  img {
    max-width: 60px;
  }
  @include media-max(611.98px) {
    flex-direction: column;
  }
}
#back-to-profile {
  margin-top: 30px;
  span {
    text-decoration: underline;
    color: $blue;
    font-size: 1.2em;
    cursor: pointer;
  }
}
</style>
