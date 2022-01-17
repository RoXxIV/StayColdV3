<template>
  <section>
    <div>
      <h1>Ajouter une <span class="text-blue">baignade</span></h1>
      <img src="../../assets/images/poulpe.png" alt="" class="flash" />
    </div>

    <BathForm :editMode="false" />
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
/* Section __________*/
section {
  width: 75%;
  margin: auto;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 611.98px) {
      flex-direction: column;
    }
    h1 {
      margin: 30px 10px 30px 0;
    }
    img {
      max-width: 60px;
    }
  }
  @media (max-width: 991.98px) {
    width: 100%;
  }
}
/* Animation poulpe __________*/
.flash {
  -webkit-animation-name: flash;
  animation-name: flash;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes flash {
  0%,
  50%,
  100% {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
}

@keyframes flash {
  0%,
  50%,
  100% {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
}
</style>
