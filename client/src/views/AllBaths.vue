<template>
  <section>
    <div id="title-all-baths">
      <h1>Toutes les <span>baignades</span></h1>
      <img
        id="illustration"
        class="fadeInDownBig"
        src="@/assets/images/iceberg.png"
        alt="personnage qui medite"
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
    //pagination
    nextPage() {
      this.bathIndexEnd += this.bathPerPage;
      this.bathIndexStart += this.bathPerPage;
      this.pageIndex++;
    },
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
  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 1rem;
    margin-top: 20px;
  }
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
.fadeInDownBig {
  -webkit-animation-name: fadeInDownBig;
  animation-name: fadeInDownBig;
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInDownBig {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -1000px, 0);
    transform: translate3d(0, -1000px, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes fadeInDownBig {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -1000px, 0);
    transform: translate3d(0, -1000px, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
</style>
