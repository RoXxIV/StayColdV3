<template>
  <section id="login-section">
    <!-- Illustration meditation ----------->
    <div>
      <img
        id="illustration-meditation"
        src="@/assets/images/login-illustration.png"
        alt="Illustration d'un personnage qui medite en lévitation"
      />
    </div>
    <!-- Form ----------->
    <div id="bloc-form">
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
      <div id="form-links">
        <p>
          <router-link to="/set-new-password"
            >Mot de passe oublié ?</router-link
          >
        </p>
        <!-- Lien vers la page de connexion ----------->
        <p>
          <router-link to="/register" tag="span" id="Link-to-register"
            >Créer un compte
          </router-link>
        </p>
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
#login-section {
  display: flex;
  justify-content: space-around;
  position: relative;
  margin-top: 100px;
  margin-bottom: 50px;
  /* Illustration __________*/
  #illustration-meditation {
    margin-top: 50px;
    animation: float 6s ease-in-out infinite;
    /* Illustration Animation__________*/
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
    @include media-max(991.98px) {
      max-width: 200px;
      margin: 0;
      @include media-max(611.98px) {
        max-width: 100px;
        margin: 0;
      }
    }
  }
  /* Bloc-form __________*/
  #bloc-form {
    h1 {
      margin-bottom: 50px;
      span {
        color: $blue;
        display: block;
        font-family: $oswald;
      }
      @include media-max(611.98px) {
        margin-top: 0;
      }
    }
    /* Form __________*/
    form {
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
        @include media-max(611.98px) {
          margin: 20px 0;
        }
      }
      .error-feedback {
        display: block;
        margin-bottom: 20px;
        text-align: center;
      }
      #submit {
        margin-top: 15px;
        text-align: center;
      }
      #message {
        margin-top: 20px;
        text-align: center;
      }
      /* Responsive Form __________*/
      @include media-max(611.98px) {
        text-align: center;
      }
    }
    #form-links {
      margin-top: 30px;
      color: $blue;
      text-decoration: underline;
      text-align: center;
      p:hover {
        color: #176cf5;
      }
    }
  }
  /* Responsive Section __________*/
  @include media-max(991.98px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 50px;
  }
}
</style>
