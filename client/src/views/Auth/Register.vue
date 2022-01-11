<template>
  <section>
    <div id="blocs">
      <div v-if="!successful" id="bloc-form">
        <h1>Formulaire d'<span>Inscription</span></h1>
        <!-- Form ----------->
        <Form @submit="handleRegister" :validation-schema="schema">
          <div>
            <!-- Username ----------->
            <div>
              <label for="username">Nom d'utilisateur</label>
              <Field name="username" type="text" /><ErrorMessage
                name="username"
                class="error-feedback alert"
              />
            </div>
            <!-- Email ----------->
            <div>
              <label for="email">Email</label>
              <Field name="email" type="email" /><ErrorMessage
                name="email"
                class="error-feedback alert"
              />
            </div>
            <!-- Password ----------->
            <div>
              <label for="password">Mot de passe</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" class="error-feedback alert" />
            </div>
            <!-- Password confirmation ----------->
            <div>
              <label for="passwordComfirmation"
                >Confirmer le mot de passe</label
              >
              <Field name="passwordComfirmation" type="password" />
              <ErrorMessage
                name="passwordComfirmation"
                class="error-feedback alert"
              />
            </div>
            <!-- Submit ----------->
            <div>
              <button class="btn-blue">S'inscrire</button>
            </div>
          </div>
        </Form>
        <!-- Erreur ----------->
        <div v-if="message && !successful" id="RegisterFailed" class="alert">
          <span>{{ message }}</span>
        </div>
      </div>
      <!--Illustration-->
      <div v-if="!successful">
        <img
          id="illustration"
          src="@/assets/images/inscription.svg"
          alt="vague de decoration"
        />
      </div>
    </div>
    <!-- Inscription Reussi ----------->
    <div v-if="message && successful" id="RegistedSucces">
      <span>❄ {{ message }} ❄</span>
      <p>Redirection dans {{ time }}</p>
      <Loading />
    </div>
  </section>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Loading from "../../components/Reusable-components/Loading.vue";
export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
    Loading,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Nom d'utilisateur requis")
        .min(3, "3 caracteres minimum")
        .max(20, "20 caracteres maximum"),
      email: yup
        .string()
        .required("Email requis!")
        .email("Email invalide")
        .max(50, "50 caracteres maximum"),
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
      message: "",
      schema,
      redirectionTimerId: undefined,
      time: 5,
    };
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.redirection();
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    // Redirection apres inscription dans un delai de 5sec
    redirection() {
      this.redirectionTimerId = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.redirectionTimerId);
          this.$router.push("/");
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
/* section __________*/
section {
  position: relative;
  width: 100vw;
  @media (max-width: 991.98px) {
    flex-direction: column;
  }
  /* Blocs __________*/
  #blocs {
    display: flex;
    width: 75%;
    justify-content: space-around;
    margin: 50px auto 0px auto;
    @media (max-width: 991.98px) {
      width: 100%;
      margin: 30px 0px 0px 0px;
      margin-top: 20px;
      flex-direction: column-reverse;
      align-items: center;
    }
    /* illustration montagne __________*/
    #illustration {
      max-width: 700px;
      @media (max-width: 991.98px) {
        max-width: 200px;
        margin: 0;
      }
      @media (max-width: 611.98px) {
        max-width: 100px;
        margin: 0;
      }
    }
    /* Bloc form __________*/
    #bloc-form {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
      h1 {
        @media (max-width: 991.98px) {
          margin-top: 0;
        }
        @media (max-width: 611.98px) {
          margin-top: 0;
        }
        span {
          display: inline-block;
          color: $blue;
        }
      }
      /* form __________*/
      form {
        @media (max-width: 611.98px) {
        }
        label {
          display: block;
          font-size: 18px;
        }
        input {
          margin: 10px 0px 35px 30px;
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
        /* Erreur de saisis __________*/
        .error-feedback {
          margin-bottom: 10px;
          display: block;
          text-align: center;
        }
      }
      @media (max-width: 991.98px) {
        margin-top: 0;
      }
      #RegisterFailed {
        text-align: center;
        margin-top: 20px;
      }
    }
  }
  #RegistedSucces {
    font-size: 1.4em;
    text-align: center;
    margin-top: 100px;
  }
}
</style>
