<template>
  <section>
    <h1>Réinitialisation du <span>mot de passe</span></h1>
    <div v-if="!successful" id="bloc-form">
      <Form @submit="handleResetPassword" :validation-schema="schema">
        <!-- Password ----------->
        <div>
          <label for="password">Nouveau mot de passe</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" class="error-feedback alert" />
        </div>
        <!-- Password confirmation ----------->
        <div>
          <label for="passwordComfirmation">Confirmer le mot de passe</label>
          <Field name="passwordComfirmation" type="password" />
          <ErrorMessage
            name="passwordComfirmation"
            class="error-feedback alert"
          />
        </div>
        <!-- Submit ----------->
        <div id="submit">
          <button class="btn-blue">Envoyer</button>
        </div>
      </Form>
    </div>
    <!-- Changement de mot de passe reussi ----------->
    <div v-if="successfulMessage && successful" id="redirect-to-login">
      <span>❄ {{ successfulMessage }} ❄</span>
      <router-link to="/login"
        ><button class="btn-blue">Se connecter</button></router-link
      >
      <p>Redirection dans {{ time }}</p>
      <Loading />
    </div>
    <!-- Erreur ----------->
    <div v-if="errorMsg && serverError" id="serverError">
      <span class="alert">{{ errorMsg }}</span>
      <p>Redirection dans {{ time }}</p>
      <Loading />
    </div>
  </section>
</template>

<script>
import authServices from "../../services/auth-services";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Loading from "../../components/Reusable-components/Loading.vue";
export default {
  name: "Reset-password",
  title: "Réinitialisation du mot de passe",
  components: {
    Form,
    Field,
    ErrorMessage,
    Loading,
  },
  data() {
    const schema = yup.object().shape({
      password: yup
        .string()
        .required("Mot de passe requis!")
        .min(6, "6 caracteres minimum")
        .max(40, "40 caracteres maximum"),
      passwordComfirmation: yup
        .string()
        .required("Comfirmation requise")
        .oneOf(
          [yup.ref("password"), null],
          "Les mots de passe doivent être être identique"
        ),
    });
    return {
      successful: false,
      successfulMessage: "",
      errorMsg: "",
      serverError: false,
      schema,
      code: null,
      time: 5,
      redirectionTimerId: undefined,
    };
  },
  methods: {
    /**
     * Envoie du nouveau mot de passe :
     * - Si le changement de mot de passe a reussi l'utilisateur est avertit
     * puis redirigé sur la page de connexion.
     * - Dans le cas ou le code de comfirmation est incorrect (utilisateur non reconnu)
     * celui-ci est redirigé vers la page 404 par securité.
     * - Si toute autre erreur est renvoyé (erreur serveur) l'utilisateur est imformé puis redirigé
     * à la page d'Accueil du site.
     * @param {object} passwords
     */
    handleResetPassword(passwords) {
      const password = passwords.password;
      authServices
        .resetPassword(this.code, password)
        .then((response) => {
          // console.log(response);
          this.successful = true;
          this.successfulMessage = response.data.message;
          // console.log(this.successfulMessage);
          this.redirection();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            return this.$router.push("/not-found");
          } else {
            console.log("status", error.response.status);
            this.serverError = true;
            this.errorMsg = "Une erreur est survenue";
            this.successful = true;
            this.redirection();
          }
        });
    },
    /**
     * Redirection de l'utilisateur
     */
    redirection() {
      this.redirectionTimerId = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.redirectionTimerId);
          !this.serverError
            ? this.$router.push("/login")
            : this.$router.push("/");
        }
      }, 1000);
    },
  },
  created() {
    /**
     * Redirige a l'Accueil si le paramettre url est absent
     */
    if (!this.$route.params.confirmationCode) return this.$router.push("/");
    this.code = this.$route.params.confirmationCode;
  },
  beforeUnmount() {
    clearInterval(this.redirectionTimerId);
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 50px;
  span {
    color: $blue;
    font-family: $oswald;
  }
}
/* Bloc form __________*/
#bloc-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Form __________*/
  form {
    margin-top: 30px;
    text-align: center;
    label {
      display: block;
      margin-top: 10px;
      font-size: 1.3em;
    }
    input {
      width: 280px;
      margin: 20px 0px 10px 20px;
      border: none;
      border-bottom: 2px solid var(--dark-to-light);
      background: transparent;
      color: var(--dark-to-light);
      transition: border-color 0.3s;
      &:focus {
        border-color: $blue;
      }
      @include media-max(611.98px) {
        margin: 20px 0;
      }
    }
    .error-feedback {
      display: block;
      margin-bottom: 20px;
    }
    /* Submit __________*/
    #submit {
      margin-top: 30px;
      text-align: center;
    }
  }
}

#redirect-to-login {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  text-align: center;
  button {
    margin-top: 30px;
  }
}
#serverError {
  text-align: center;
}
</style>
