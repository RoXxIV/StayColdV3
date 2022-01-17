<template>
  <section>
    <!-- Email comfirmé ----------->
    <div id="box">
      <div v-if="isComfirmed">
        <h2>{{ message }} 😀</h2>
        <router-link to="/login">Se connecter</router-link>
      </div>
      <!-- Erreur durant la confirmation du mail ----------->
      <div v-else>
        <h2>{{ errorMsg }}</h2>
      </div>
      <!-- Redirection ----------->
      <p>Redirection dans {{ time }}</p>
      <Loading />
    </div>
  </section>
</template>

<script>
import AuthServices from "../../services/auth-services";
import Loading from "../../components/Reusable-components/Loading.vue";
export default {
  name: "Confirm-mail",
  title: "Comfirmation du mail",
  components: {
    Loading,
  },
  data() {
    return {
      time: 5,
      isComfirmed: true,
      redirectionTimerId: undefined,
      message: "",
      errorMsg: "",
    };
  },
  methods: {
    /**
     *Si le mail est validé et l'utilisateur confirmé,
     * il recoit une confirmation avant d'etre redirigé vers la page de connexion.
     * En cas d'erreur avec un status 401 ou 403 (utilisateur non trouvé, compte dejà actif),
     *l'utilisateur est avertit puis redirigé vers la page d'acceuil.
     * @param {string} code
     */
    sendComfirmationCode(code) {
      AuthServices.verifyUser(code)
        .then((response) => {
          this.message = response.message;
          this.Redirection();
        })
        .catch((error) => {
          if (error.response) {
            // console.log("status", error.response.status);
            this.isComfirmed = false;
            if (
              error.response.status === 401 ||
              error.response.status === 403
            ) {
              this.errorMsg = error.response.data.message;
            } else {
              console.log("status", error.response.status);
            }
            this.Redirection();
          }
        });
    },
    /**
     * Redirige l'utilisateur sur la page
     * login ou register suivant sont status
     */
    Redirection() {
      this.redirectionTimerId = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.redirectionTimerId);
          this.isComfirmed
            ? this.$router.push("/login")
            : this.$router.push("/register");
        }
      }, 1000);
    },
  },
  created() {
    if (this.$route.params.confirmationCode) {
      this.sendComfirmationCode(this.$route.params.confirmationCode);
    }
  },
  beforeUnmount() {
    clearInterval(this.redirectionTimerId);
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 75%;
  margin: auto;
  text-align: center;
  #box {
    width: auto;
    display: inline-block;
    padding: 50px 100px;
  }
}
</style>
