<template>
  <section id="section-bath-list">
    <!--IMG-->
    <div id="landscape"></div>
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
        class="list-item fadeIn"
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
    <aside>
      <h2>Toutes les baignades en <span>statistiques</span></h2>
      <div>
        <ScatterChart :BathChartData="allBaths" id="ScatterChart" />
      </div>
    </aside>
  </section>
</template>

<script>
import BathDataServices from "../services/bathDataServices";
import RenderBathData from "../helper/RenderBathData";
import BathCard from "../components/Baths/BathCard.vue";
import ScatterChart from "../components/Charts/ScatterChart.vue";
export default {
  name: "All-baths",
  title: "Toutes les baignades",
  components: { BathCard, ScatterChart },
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
          // console.log(response.data);
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
#section-bath-list {
  /* Landscape__________*/
  #landscape {
    height: 90px;
    margin-top: 10px;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    background-image: url(../assets/images/all-baths-banner.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 50%;
  }
  #title-all-baths {
    position: relative;
    margin: 50px auto 20px auto;
    text-align: center;
    h1 {
      margin-bottom: 10px;
      span {
        color: $blue;
        font-family: $oswald;
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
  @include media-max(667.98px) {
    width: 90%;
  }
}
aside {
  width: 100%;
  margin: 50px auto 30px auto;
  text-align: center;
  h2 span {
    color: $blue;
    font-family: $oswald;
  }
  @include media-max(991.98px) {
    #ScatterChart {
      width: 100%;
    }
  }
}
</style>
