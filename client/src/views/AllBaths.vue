<template>
  <section>
    <h1>Toutes les <span>baignades</span></h1>
    <!--Liste des baignades-->
    <div class="card-list">
      <router-link
        :to="`/public-bath-details/${bath._id}`"
        v-for="bath in allBaths.slice(bathIndexStart, bathIndexEnd)"
        :key="bath"
        ><BathCard :bath="bath" />
      </router-link>
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
  h1 {
    span {
      color: $blue;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
