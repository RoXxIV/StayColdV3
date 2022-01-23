<template>
  <div>
    <!---Pseudo-->
    <div id="landscape">
      <h1>{{ currentUser?.username.toUpperCase() }}</h1>
    </div>
    <!---Info user-->
    <section id="profile-header">
      <div id="header-card">
        <ul>
          <!---User role-->
          <li>
            <span id="role">{{ userRole !== "USER" ? userRole : "" }}</span>
          </li>
          <li>
            Inscrit(e) depuis le:
            <span class="text-blue">{{
              currentUser?.createdAt
                .substring(0, 10)
                .split("-")
                .reverse()
                .join("/")
            }}</span>
          </li>
          <li>
            Totale baignades:
            <span class="text-blue">{{ userBaths.length }}</span>
          </li>
          <li>
            Temps resté dans l'eau:
            <span class="text-blue">{{ getTotalTime }}</span>
          </li>
          <li>
            Temperature la plus basse:
            <span class="text-blue">{{ getLowerTemperature }}</span>
          </li>
          <!---Ajouter une baignade-->
          <li id="new-bath">
            <router-link to="/add-bath"
              ><span class="btn-blue">Nouvelle baignade</span></router-link
            >
          </li>
        </ul>
        <img
          id="illustration"
          class="rubberBand"
          src="@/assets/images/profil.png"
          alt="illlustration d'une maison"
        />
      </div>
    </section>

    <section id="baths-list">
      <h2>Mes <span>baignades</span></h2>
      <!--Liste des baignades-->
      <div class="card-list">
        <BathCard
          v-for="bath in userBaths.slice(0, lastIndex)"
          :key="bath"
          :bath="bath"
          class="list-item fadeIn"
        />
        <div v-if="userBaths.length === 0">
          <p>Aucune baignade enregistrée</p>
        </div>
      </div>
      <div v-if="lastIndex < userBaths.length">
        <button @click="displayMoreBaths" id="showMore" class="btn-blue">
          Voir plus
        </button>
      </div>
    </section>
    <section v-if="userBaths.length !== 0" id="statistics">
      <h2>Mes <span>statistiques</span></h2>
      <MultiAxesChart :BathChartData="userBaths" id="MultiAxesChart" />
      <PieCharts :BathChartData="userBaths" />
    </section>
  </div>
</template>

<script>
import BathDataServices from "../../services/bathDataServices";
import RenderBathData from "../../helper/RenderBathData";
import BathCard from "../../components/Baths/BathCard.vue";
import PieCharts from "../../components/Charts/PieCharts.vue";
import MultiAxesChart from "../../components/Charts/MultiAxesChart.vue";
export default {
  name: "Profile",
  title: "Profil",
  components: { BathCard, PieCharts, MultiAxesChart },
  data() {
    return {
      userRole: "",
      userBaths: [],
      lastIndex: 10,
    };
  },
  computed: {
    /**
     * Recupere les informations de l'utilisateur en cours dans le local storage
     */
    currentUser() {
      return this.$store.state.auth.user;
    },
    /**
     * Calcule et return le temps totale de toute les baignade de l'utilisateur
     * "timeInWater"
     */
    getTotalTime() {
      const convert = (n) =>
        `0${(n / 60) ^ 0}`.slice(-2) + "h" + ("0" + (n % 60)).slice(-2);
      let totalTime = 0;
      this.userBaths.forEach((bath) => {
        totalTime += bath.timeInWater;
      });
      return convert(totalTime);
    },
    /**
     * Parcours toute les baignade de l'utilisateur puis renvoie la temperature la plus basse
     */
    getLowerTemperature() {
      const arr = [];
      let lowerTemp = 0;
      this.userBaths.forEach((bath) => {
        arr.push(bath.waterTemperature);
      });
      arr.sort((a, b) => {
        return a - b;
      });
      lowerTemp = `${arr[0]}°C`;
      if (arr.length === 0) {
        return "n/a";
      }
      return lowerTemp;
    },
  },
  methods: {
    /**
     * Recupere toute les baignades de l'utilisateur en cours
     * @param {string} userId
     */
    fetchUserBaths(userId) {
      BathDataServices.getByUserId(userId)
        .then((response) => {
          // console.log(response);
          this.userBaths = response.data;
          this.userBaths.forEach((data) => {
            data.weather = RenderBathData.displayWeatherAsEmoji(data.weather);
            data.createdAt = RenderBathData.editDateFormat(data.createdAt);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    displayMoreBaths() {
      this.lastIndex += 10;
    },
  },
  created() {
    if (this.currentUser) {
      this.fetchUserBaths(this.currentUser.id);
      /**
       * Recupere le plus haut rôle de l'utilisateur en cours
       */
      this.userRole = this.currentUser.roles[
        this.currentUser.roles.length - 1
      ].replace(/ROLE_/, "");
    }
    // console.log(this.currentUser);
  },
};
</script>

<style lang="scss" scoped>
/* Banniere decorative __________*/
#landscape {
  width: 75%;
  height: 150px;
  margin: 10px auto 0px auto;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  background-image: url(../../assets/images/profile-landscape.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 45%;
  line-height: 100px;
  h1 {
    font-size: 2.5em;
    letter-spacing: 3px;
    color: $gray;
    text-shadow: 2px 2px 2px white;
  }
}
/* Sections __________*/
section {
  /* Profile-header __________*/
  &#profile-header {
    #header-card {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 60%;
      margin: 30px auto 0px auto;
      border: 2px solid var(--light-gray-to-less);
      ul {
        li {
          padding: 10px 0px;
          &:last-child {
            padding-top: 20px;
          }
          .text-blue {
            color: $blue;
          }
        }
      }
      #illustration {
        max-width: 300px;
      }
      @include media-max(991.98px) {
        width: 100%;
        @include media-max(667.98px) {
          flex-direction: column-reverse;
          width: 100%;
          #illustration {
            max-width: 150px;
          }
        }
      }
    }
    @include media-max(667.98px) {
      width: 100%;
      text-align: center;
    }
  }
  /* Bath-list __________*/
  &#baths-list {
    h2 {
      span {
        color: $blue;
        font-family: $oswald;
      }
    }
    .card-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-auto-rows: auto;
      grid-gap: 1rem;
      margin-top: 20px;
    }
    #showMore {
      display: block;
      margin: 30px auto;
      text-align: center;
    }
  }
  /* Statistique __________*/
  &#statistics {
    h2 {
      margin: 70px auto 30px auto;
      text-align: center;
      font-size: 2em;
      span {
        color: $blue;
        font-family: $oswald;
      }
    }
    @include media-max(991.98px) {
      #MultiAxesChart {
        width: 100%;
      }
    }
  }
  /* Responsive section __________*/
  @include media-max(991.98px) {
    width: 90%;
  }
}
</style>
