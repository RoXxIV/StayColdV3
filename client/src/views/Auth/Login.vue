<template>
  <section>
    <div id="blocs">
      <!-- Illustration meditation ----------->
      <div>
        <img
          id="illustration"
          src="@/assets/images/login-illustration.png"
          alt="Illustration d'un personnage qui medite en lévitation"
        />
      </div>
      <!-- Form ----------->
      <div>
        <h1>Formulaire de <span>Connexion</span></h1>
        <Form @submit="handleLogin" :validation-schema="schema">
          <!-- Username ----------->
          <div>
            <label for="username">Nom d'utilisateur</label>
            <Field name="username" type="text" />
            <ErrorMessage name="username" class="error-feedback alert" />
          </div>
          <!-- Password ----------->
          <div>
            <label for="password">Mot de passe</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" class="error-feedback alert" />
          </div>
          <!-- Submit ----------->
          <div id="submit">
            <button class="btn-blue">Connexion</button>
          </div>
          <!-- Erreur ----------->
          <div>
            <div id="message" v-if="message" role="alert" class="alert">
              {{ message }}
            </div>
          </div>
        </Form>
        <!-- Mot de pass oublié ----------->
        <div id="forgottenPassword">
          <router-link to="/set-new-password"
            >Mot de passe oublié ?</router-link
          >
        </div>
        <!-- Lien vers la page de connexion ----------->
        <router-link to="/register" tag="span" id="Link-to-register"
          >Créer un compte
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  title: "Connexion",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Nom d'utilisateur requis"),
      password: yup.string().required("Mot de passe requis"),
    });
    return {
      message: "",
      schema,
    };
  },
  methods: {
    /**
     * Connecte l'utilisateur
     * @param {object} user
     */
    handleLogin(user) {
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
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
  },
};
</script>

<style lang="scss" scoped>
/* section __________*/
section {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100vw;
  /* Illustration vagues __________*/
  #waves {
    position: absolute;
    top: 0;
    left: 0;
    @media (max-width: 991.98px) {
      display: none;
    }
  }
  #blocs {
    display: flex;
    justify-content: space-around;
    width: 75%;
    margin: 150px auto 0px auto;
    @media (max-width: 991.98px) {
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 30px 0px 0px 0px;
      margin-top: 20px;
    }
    /* illustration meditation __________*/
    #illustration {
      margin-top: 50px;
      animation: float 6s ease-in-out infinite;
      @media (max-width: 991.98px) {
        max-width: 200px;
        margin: 0;
      }
      @media (max-width: 611.98px) {
        max-width: 100px;
        margin: 0;
      }
    }
    /* Illustration animations __________*/
    @keyframes float {
      0% {
        transform: translatey(0px);
      }
      50% {
        transform: translatey(-20px);
      }
      100% {
        transform: translatey(0px);
      }
    }
    h1 {
      margin-bottom: 50px;
      @media (max-width: 611.98px) {
        margin-top: 0;
      }
      span {
        display: block;
        color: $blue;
      }
    }
    /* form __________*/
    form {
      @media (max-width: 611.98px) {
        text-align: center;
      }
      label {
        display: block;
        margin-top: 10px;
        font-size: 18px;
      }
      input {
        margin: 35px 0px 15px 20px;
        width: 280px;
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
      .error-feedback {
        display: block;
        margin-bottom: 20px;
      }
      #submit {
        margin-top: 15px;
        text-align: center;
      }
      #message {
        margin-top: 20px;
        text-align: center;
      }
    }
    #forgottenPassword {
      margin-top: 30px;
      margin-bottom: 10px;
      color: $blue;
      text-decoration: underline;
      text-align: center;
    }
    #Link-to-register {
      display: block;
      color: $blue;
      text-decoration: underline;
      text-align: center;
      &:hover {
        color: #176cf5;
      }
    }
  }
  /* Section responsive __________*/
  @media (max-width: 991.98px) {
    margin-top: 20px;
  }
}
</style>
