<template>
  <section id="section-recent-baths">
    <h2>Baignades <span class="text-blue">récentes</span></h2>
    <div id="cards-list">
      <BathCard v-for="bath in recentBaths" :key="bath" :bath="bath" />
    </div>
    <div v-if="!serverError" id="all-bath-link">
      <router-link to="/all-baths" tag="button"
        ><span class="btn-blue">Voir tout</span></router-link
      >
    </div>
    <div v-if="serverError" id="serverError">
      {{ errorMessage }}
    </div>
  </section>
</template>

<script>
import BathDataServices from "../../services/bathDataServices";
import RenderBathData from "../../helper/RenderBathData";
import BathCard from "./BathCard.vue";
export default {
  name: "Recent-bath",
  components: {
    BathCard,
  },
  data() {
    return {
      recentBaths: [],
      errorMessage: null,
      serverError: false,
    };
  },
  methods: {
    /**
     * Recupere la liste des baignades récente
     */
    fetchRecentBath() {
      BathDataServices.getRecent()
        .then((response) => {
          this.recentBaths = response.data;
          // console.log(this.recentBaths);
          /**
           * Permet de changer le format de la météo et des dates
           */
          this.recentBaths.forEach((data) => {
            data.weather = RenderBathData.displayWeatherAsEmoji(data.weather);
            data.createdAt = RenderBathData.editDateFormat(data.createdAt);
          });
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage =
            "Une erreur est survenue pendant la récupération des baignades";
          this.serverError = true;
        });
    },
  },
  created() {
    this.fetchRecentBath();
  },
};
</script>

<style lang="scss" scoped>
/* Section __________*/
#section-recent-baths {
  margin-top: 100px;
  h2 {
    margin-bottom: 50px;
    text-align: center;
    font-size: 2em;
    span {
      color: $blue;
      font-family: $oswald;
    }
  }
  /* Card list __________*/
  #cards-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 1rem;
    margin-top: 20px;
  }
  #serverError {
    text-align: center;
  }
  #all-bath-link {
    margin-top: 50px;
    text-align: center;
  }
  @include media-max(667.98px) {
    width: 90%;
    margin-top: 5f0px;
  }
}
</style>
