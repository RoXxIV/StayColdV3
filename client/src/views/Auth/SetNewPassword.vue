<template>
  <section>
    <div v-if="!successful" id="bloc-form">
      <h1>Demander un nouveau <span>mot de passe</span></h1>
      <!-- Form ----------->
      <Form @submit="handlePasswordEmail" :validation-schema="schema">
        <div>
          <!-- Email ----------->
          <div>
            <label for="email">Email</label>
            <Field name="email" type="email" /><ErrorMessage
              name="email"
              class="error-feedback alert"
            />
          </div>
          <!-- Email confirmation ----------->
          <div>
            <label for="emailComfirmation">Confirmer l'email</label>
            <Field name="emailComfirmation" type="email" />
            <ErrorMessage
              name="emailComfirmation"
              class="error-feedback alert"
            />
          </div>
          <!-- Submit ----------->
          <div id="submit">
            <button class="btn-blue">Envoyer</button>
          </div>
        </div>
      </Form>
      <div v-if="message && !successful" id="error" class="alert">
        {{ message }}
      </div>
    </div>
    <div v-if="successful" id="sentSucces">
      <span>❄ {{ message }} ❄</span>
      <p>Redirection dans {{ time }}</p>
      <Loading />
    </div>
  </section>
</template>

<script>
import AuthServices from "../../services/auth-services";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Loading from "../../components/Reusable-components/Loading.vue";
export default {
  name: "Set-new-password",
  title: "Demander un nouveau mot de passe",
  components: {
    Form,
    Field,
    ErrorMessage,
    Loading,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email requis!")
        .email("Email invalide")
        .max(50, "50 caracteres maximum"),
      emailComfirmation: yup
        .string()
        .required("Comfirmation requise")
        .oneOf(
          [yup.ref("email"), null],
          "Les emails doivent être être identique"
        ),
    });
    return {
      successful: false,
      schema,
      message: "",
      redirectionTimerId: undefined,
      time: 5,
    };
  },
  methods: {
    /**
     * Demande d'un lien de changement de mot de passe a
     * l'adresse email indiqué
     * @param {object} email
     */
    handlePasswordEmail(email) {
      const mail = email.email;
      this.message = "";
      this.successful = false;
      AuthServices.resetPasswordEmail(mail).then(
        (response) => {
          // console.log(response);
          this.message = response.message;
          this.successful = true;
          this.Redirection();
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    /**
     * Redirige l'utilisateur sur la page d'Accueil
     */
    Redirection() {
      this.redirectionTimerId = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.redirectionTimerId);
          this.$router.push("/");
        }
      }, 1000);
    },
  },
  beforeUnmount() {
    clearInterval(this.redirectionTimerId);
  },
};
</script>

<style lang="scss" scoped>
/* Bloc form __________*/
#bloc-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-top: 50px;
    span {
      color: $blue;
      font-family: $oswald;
    }
  }
  /* Form __________*/
  form {
    margin-top: 30px;
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
    #submit {
      margin-top: 15px;
      text-align: center;
    }
  }
}
#error {
  margin-top: 30px;
}
#sentSucces {
  margin-top: 200px;
  text-align: center;
  font-size: 1.4em;
}
</style>
