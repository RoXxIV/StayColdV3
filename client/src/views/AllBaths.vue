<template>
  <section>
    <div id="title-all-baths">
      <h1>Toutes les <span>baignades</span></h1>
      <img
        id="illustration"
        class="slideInLeft"
        src="@/assets/images/iceberg.png"
        alt="illlustration d'un iceberg"
      />
    </div>

    <!--Liste des baignades-->
    <div class="card-list">
      <BathCard
        v-for="bath in allBaths.slice(bathIndexStart, bathIndexEnd)"
        :key="bath"
        :bath="bath"
        class="list-item"
      />
    </div>
    <!--Pagination-->
    <div id="pagination">
      <button
        v-if="bathIndexStart !== 0"
        @click="previousPage"
        class="btn-blue"
      >
        Page {{ pageIndex - 1 }}
      </button>
      <span>Page {{ pageIndex }} </span>
      <button
        v-if="bathIndexEnd < allBaths.length"
        @click="nextPage"
        class="btn-blue"
      >
        Page {{ pageIndex + 1 }}
      </button>
    </div>
  </section>
</template>

<script>
import BathDataServices from "../services/bathDataServices";
import RenderBathData from "../helper/RenderBathData";
import BathCard from "../components/Baths/BathCard.vue";
export default {
  name: "All-baths",
  title: "Toutes les baignades",
  components: { BathCard },
  data() {
    return {
      allBaths: [],
      bathIndexStart: 0,
      bathIndexEnd: 15,
      bathPerPage: 15,
      pageIndex: 1,
      errorMessage: null,
      serverError: false,
    };
  },
  methods: {
    /**
     * Recupere la liste de toutes les baignades
     */
    fetchAllBaths() {
      BathDataServices.getAll()
        .then((response) => {
          console.log(response.data);
          this.allBaths = response.data;
          this.allBaths.forEach((data) => {
            data.weather = RenderBathData.displayWeatherAsEmoji(data.weather);
            data.createdAt = RenderBathData.editDateFormat(data.createdAt);
          });
        })
        .catch((error) => {
          console.log(error);
          this.serverError = true;
          this.serverError =
            "Une erreur est survenue pendant la récupération des baignades";
        });
    },
    /**
     * pagination : Page suivante
     */
    nextPage() {
      this.bathIndexEnd += this.bathPerPage;
      this.bathIndexStart += this.bathPerPage;
      this.pageIndex++;
    },
    /**
     * pagination : Page précédente
     */
    previousPage() {
      this.bathIndexEnd -= this.bathPerPage;
      this.bathIndexStart -= this.bathPerPage;
      this.pageIndex--;
    },
  },
  created() {
    this.fetchAllBaths();
  },
};
</script>

<style lang="scss" scoped>
/* Section __________*/
section {
  width: 75%;
  margin: auto;
  #title-all-baths {
    position: relative;
    margin: 50px auto 20px auto;
    text-align: center;
    h1 {
      margin-bottom: 10px;
      span {
        color: $blue;
      }
    }
    #illustration {
      max-width: 100px;
    }
  }
  /* Liste __________*/
  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 1rem;
    margin-top: 20px;
  }
  /* Pagination __________*/
  #pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    span {
      margin: auto 10px;
    }
  }
}
/* Iceberg animation __________*/
.slideInLeft {
  -webkit-animation-name: slideInLeft;
  animation-name: slideInLeft;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes slideInLeft {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    visibility: visible;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes slideInLeft {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    visibility: visible;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
</style>
