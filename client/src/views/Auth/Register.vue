<template>
  <section id="section-register">
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
    <div v-show="message && successful" id="RegistedSucces">
      <img
        id="illustration-success"
        src="@/assets/images/form-register.svg"
        alt="Illustration d'une montagne sur fond bleu avec des nuages en arriere plan"
      />
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
        .min(4, "4 caracteres minimum")
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
#section-register {
  position: relative;
  width: 100vw;
  /* Blocs __________*/
  #blocs {
    display: flex;
    justify-content: space-around;
    width: 75%;
    margin: 50px auto 0px auto;
    #illustration {
      max-width: 600px;
      @include media-max(991.98px) {
        max-width: 200px;
        margin: 0;
        @include media-max(611.98px) {
          max-width: 100px;
          margin: 0;
        }
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
        span {
          display: inline-block;
          color: $blue;
          font-family: $oswald;
        }
        @include media-max(991.98px) {
          margin-top: 0px;
        }
      }
      /* form __________*/
      form {
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
          @include media-max(611.98px) {
            margin: 20px 0;
          }
        }
        #submit {
          margin-top: 15px;
          text-align: center;
        }
        .error-feedback {
          display: block;
          margin-bottom: 10px;
          text-align: center;
        }
        /* Responsive form __________*/
        @include media-max(991.98px) {
          margin-top: 0px;
        }
      }
      #RegisterFailed {
        margin-top: 20px;
        text-align: center;
      }
      @include media-max(991.98px) {
        margin-top: 0;
      }
    }

    /* Responsive Blocs __________*/
    @include media-max(991.98px) {
      flex-direction: column-reverse;
      align-items: center;
      width: 100%;
      margin: 30px 0px 0px 0px;
      margin-top: 20px;
    }
  }
  /* Inscription reussi __________*/
  #RegistedSucces {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.4em;
    text-align: center;
    #illustration-success {
      max-width: 400px;
      @include media-max(991.98px) {
        max-width: 200px;
        margin: 0;
        @include media-max(611.98px) {
          max-width: 100px;
          margin: 0;
        }
      }
    }
    @include media-max(611.98px) {
      margin-top: 50px;
      font-size: 1.2em;
    }
  }
}
</style>
