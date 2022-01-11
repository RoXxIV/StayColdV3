<template>
  <section>
    <Banner />
    <!-- Email comfirmé ----------->
    <div
      id="box"
      :class="isComfirmed ? 'successComfirmation' : 'failedConfirmation'"
    >
      <div v-if="isComfirmed">
        <h2>{{ message }} 😀</h2>
        <router-link to="/connexion">Se connecter</router-link>
      </div>
      <!-- Erreur durant la confirmation du mail ----------->
      <div v-else>
        <h2>{{ errorMsg }}</h2>
      </div>
      <!-- Redirection ----------->
      <p>Redirection dans {{ time }}</p>
    </div>
  </section>
</template>

<script>
import AuthServices from "../../services/auth-services";
import Banner from "../../components/Reusable-components/Banner.vue";
export default {
  name: "Confirm-mail",
  components: {
    Banner,
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
    /*
      Si le mail est validé et l'utilisateur confirmé,
      il recoit une confirmation avant d'etre redirigé vers la page de connexion.
      En cas d'erreur avec un status 401 ou 403 (utilisateur non trouvé, compte dejà actif),
      l'utilisateur est avertit puis redirigé vers la page d'acceuil.
    */
    sendComfirmationCode(code) {
      AuthServices.verifyUser(code)
        .then((response) => {
          this.message = response.message;
          //this.Redirection();
        })
        .catch((error) => {
          if (error.response) {
            console.log("status", error.response.status);
            this.isComfirmed = false;
            if (
              error.response.status === 401 ||
              error.response.status === 403
            ) {
              this.errorMsg = error.response.data.message;
            } else {
              console.log("status", error.response.status);
            }
            //this.Redirection();
          }
        });
    },
    Redirection() {
      this.redirectionTimerId = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.redirectionTimerId);
          this.isComfirmed
            ? this.$router.push("/connexion")
            : this.$router.push("/");
        }
      }, 1000);
    },
  },
  created() {
    if (this.$route.params.confirmationCode) {
      this.sendComfirmationCode(this.$route.params.confirmationCode);
    }
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
    margin-top: 50px;
  }
  .failedConfirmation {
    box-shadow: rgba(255, 2, 2, 0.3) 0px 0px 0px 3px;
  }
  .successComfirmation {
    box-shadow: rgba(44, 255, 2, 0.3) 0px 0px 0px 3px;
  }
}
</style>
