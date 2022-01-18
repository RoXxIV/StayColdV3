<template>
  <div>
    <section id="profile-header">
      <!---Info user-->
      <ul>
        <li>
          <h1>
            {{ currentUser.username }}
          </h1>
        </li>
        <!---User role-->
        <li>
          <span id="role" class="text-blue">{{
            userRole !== "USER" ? userRole : ""
          }}</span>
        </li>

        <li>
          Totale baignades:
          {{ userBaths.length }}
        </li>
        <li>Temps resté dans l'eau: {{ getTotalTime }}</li>
        <li>Temperature la plus basse: {{ getLowerTemperature }}</li>
        <!---Ajouter une baignade-->
        <li id="new-bath">
          <router-link to="/add-bath"
            ><span class="btn-blue">Nouvelle baignade</span></router-link
          >
        </li>
      </ul>
    </section>
    <section id="baths-list">
      <h2>Mes baignades</h2>
      <!--Liste des baignades-->
      <div class="card-list">
        <BathCard
          v-for="bath in userBaths.slice(0, lastIndex)"
          :key="bath"
          :bath="bath"
          class="list-item"
        />
      </div>
      <div v-if="lastIndex < userBaths.length">
        <button @click="displayMoreBaths" id="more" class="btn-blue">
          Voir plus
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import BathDataServices from "../../services/bathDataServices";
import RenderBathData from "../../helper/RenderBathData";
import BathCard from "../../components/Baths/BathCard.vue";
export default {
  name: "Profile",
  title: "Profil",
  components: { BathCard },
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
          console.log(response);
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
  },
};
</script>

<style lang="scss" scoped>
/* Section __________*/
section {
  width: 75%;
  margin: auto;
  &#profile-header {
    margin-bottom: 50px;
    text-align: center;
    ul {
      margin: 0;
      li {
        padding: 10px 0px;
        &:last-child {
          margin-top: 20px;
        }
        h1 {
          margin-bottom: 0;
        }
      }
    }
  }
  &#baths-list {
    .card-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-auto-rows: auto;
      grid-gap: 1rem;
      margin-top: 20px;
    }
  }
}
</style>
