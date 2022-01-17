<template>
  <section>
    <h1>Details de la <span>Baignade</span></h1>
    <BathCardDetails :bath="currentBath" />
  </section>
</template>

<script>
import BathDataServices from "../services/bathDataServices";
import RenderBathData from "../helper/RenderBathData";
import BathCardDetails from "../components/Baths/BathCardDetails.vue";
export default {
  name: "Bath-details",
  components: { BathCardDetails },
  data() {
    return {
      currentBath: {},
    };
  },
  methods: {
    /**
     * Recupere et stock la baignade.
     * Redigige vers la page 404 si aucune baignade est trouvé
     * @param {string} id
     */
    fetchOneBath(id) {
      BathDataServices.getOne(id)
        .then((response) => {
          console.log(response);
          response.data.createdAt = RenderBathData.editDateFormat(
            response.data.createdAt
          );
          this.currentBath = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$router.push("/not-found");
        });
    },
  },
  /**
   * A la creation du composant, utilise le parametre url bathId pour retrouver la baignade.
   * Redirige vers la page 404 si le parametre n'est pas present
   */
  created() {
    this.$route.params.bathId
      ? this.fetchOneBath(this.$route.params.bathId)
      : this.$router.push("/not-found");
  },
};
</script>

<style lang="scss" scoped>
/* Section __________*/
section {
  width: 75%;
  margin: auto;

  h1 {
    span {
      color: $blue;
    }
  }
}
</style>
