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
            <div id="submit">
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
          class="rubberBand"
          src="@/assets/images/form-register.svg"
          alt="Illustration d'une montagne sur fond bleu avec des nuages en arriere plan"
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
  title: "Inscription",
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
    /**
     * Inscription d'un nouvel utilisateur
     * @param {object} user
     */
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
    /**
     * Redirection apres inscription dans un delai de 5sec
     */
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
  beforeUnmount() {
    clearInterval(this.redirectionTimerId);
  },
};
</script>

<style lang="scss" scoped>
/* section __________*/
section {
  position: relative;
  width: 100vw;
  /* Blocs __________*/
  #blocs {
    display: flex;
    justify-content: space-around;
    width: 75%;
    margin: 50px auto 0px auto;
    @media (max-width: 991.98px) {
      flex-direction: column-reverse;
      align-items: center;
      width: 100%;
      margin: 30px 0px 0px 0px;
      margin-top: 20px;
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
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      margin-top: 50px;
      h1 {
        margin-bottom: 50px;
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
          width: 280px;
          margin: 10px 0px 35px 30px;
          border: none;
          border-bottom: 2px solid var(--dark-to-light);
          background: transparent;
          color: var(--dark-to-light);
          transition: border-color 0.3s;
          &:focus {
            border-color: $blue;
          }
          @media (max-width: 611.98px) {
            margin: 20px 0;
          }
        }
        #submit {
          text-align: center;
          margin-top: 15px;
        }
        /* Erreur de saisis __________*/
        .error-feedback {
          display: block;
          margin-bottom: 10px;
          text-align: center;
        }
      }
      @media (max-width: 991.98px) {
        margin-top: 0;
      }
      #RegisterFailed {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
  #RegistedSucces {
    margin-top: 100px;
    font-size: 1.4em;
    text-align: center;
  }
  /* Section responsive __________*/
  @media (max-width: 991.98px) {
    flex-direction: column;
  }
}
/* Effet de torsion sur l'illustration __________*/
.rubberBand {
  -webkit-animation-name: rubberBand;
  animation-name: rubberBand;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes rubberBand {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes rubberBand {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
