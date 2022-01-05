<template>
  <section>
    <!--email comfirmé-->
    <div v-if="isComfirmed">
      <h2>Votre email a bien été confirmé</h2>
      <router-link to="/connexion">Se connecter</router-link>
    </div>
    <!--erreur durant la confirmation du mail-->
    <div v-else>
      <h2>Une erreur est survenue</h2>
    </div>
    <!--Redirection-->
    <div>
      <p>Redirection dans {{ time }}</p>
    </div>
  </section>
</template>

<script>
import AuthServices from "../../services/auth-services";
export default {
  name: "Confirm-mail",
  data() {
    return {
      time: 5,
      isComfirmed: true,
      redirectionTimerId: undefined,
    };
  },
  methods: {
    sendComfirmationCode(code) {
      AuthServices.verifyUser(code)
        .then(() => {
          // Email comfirmé, redirection vers la page de connexion apres 5 sec
          this.redirectionTimerId = setInterval(() => {
            this.time--;
            if (this.time === 0) {
              clearInterval(this.redirectionTimerId);
              this.$router.push("/connexion");
            }
          }, 1000);
        })
        .catch((err) => {
          // Erreur lors de la confirmation, redirection vers la page d'acceuil apres 5 sec
          console.log("erreur de confirmation", err);
          this.isComfirmed = false;
          this.redirectionTimerId = setInterval(() => {
            this.time--;
            if (this.time === 0) {
              clearInterval(this.redirectionTimerId);
              this.$router.push("/");
            }
          }, 1000);
        });
    },
  },
  created() {
    if (this.$route.params.confirmationCode) {
      this.sendComfirmationCode(this.$route.params.confirmationCode);
    } else {
      this.isComfirmed = false;
    }
  },
};
</script>

<style lang="scss" scoped></style>
