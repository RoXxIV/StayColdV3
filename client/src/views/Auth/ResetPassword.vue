<template>
  <section>
    <h1>Réinitialisation du mot de passe</h1>
    <div v-if="!successful" id="form-bloc">
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
        <div>
          <button class="btn-blue">Envoyer</button>
        </div>
      </Form>
    </div>
    <!-- Changement de mot de passe reussi ----------->
    <div v-if="successfulMessage && successful" id="redirect-to-login">
      <span>❄ {{ successfulMessage }} ❄</span>
      <router-link to="/connexion"
        ><button class="btn-blue">Se connecter</button></router-link
      >

      <p>Redirection dans {{ time }}</p>
      <Loading />
    </div>
    <!-- Erreur ----------->
    <div v-if="errorMsg && serverError">
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
  name: "reset-password",
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
    /*
      Envoie du nouveau mot de passe : 
        - Si le changement de mot de passe a reussi l'utilisateur est avertit 
          puis redirigé sur la page de connexion.
        - Dans le cas ou le code de comfirmation est incorrect (utilisateur non reconnu)
          celui-ci est redirigé vers la page 404 par securité.
        - Si toute autre erreur est renvoyé (erreur serveur) l'utilisateur est imformé puis redirigé
          à la page d'acceuil du site.
    */
    handleResetPassword(passwords) {
      const password = passwords.password;
      authServices
        .resetPassword(this.code, password)
        .then((response) => {
          console.log(response);
          this.successful = true;
          this.successfulMessage = response.data.message;
          console.log(this.successfulMessage);
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
    redirection() {
      this.redirectionTimerId = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.redirectionTimerId);
          !this.serverError
            ? this.$router.push("/connexion")
            : this.$router.push("/");
        }
      }, 1000);
    },
  },
  created() {
    if (!this.$route.params.confirmationCode) return this.$router.push("/");
    this.code = this.$route.params.confirmationCode;
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
  h1 {
    margin-top: 50px;
  }
  #form-bloc {
    form {
      margin-top: 100px;
      label {
        display: block;
        font-size: 1.3em;
        margin-top: 10px;
      }
      input {
        margin: 20px 0px 10px 20px;
        border: none;
        background: transparent;
        border-bottom: 2px solid var(--dark-to-light);
        color: var(--dark-to-light);
        width: 280px;
        transition: border-color 0.3s;
        &:focus {
          border-color: $blue;
        }
        @media (max-width: 611.98px) {
          margin: 20px 0;
        }
      }
      .error-feedback {
        margin-bottom: 20px;
        display: block;
      }
      button {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  }
  #redirect-to-login {
    margin-top: 50px;
  }
}
</style>
