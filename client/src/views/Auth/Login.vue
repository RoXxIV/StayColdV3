<template>
  <section>
    <!-- Illustration vagues ----------->
    <img
      id="waves"
      src="@/assets/images/form-login-waves.svg"
      alt="vague de decoration"
    />

    <div id="blocs">
      <!-- Illustration meditation ----------->
      <div>
        <img
          id="illustration"
          src="@/assets/images/login-illustration.svg"
          alt="personnage qui medite"
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
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <!-- Password ----------->
          <div>
            <label for="password">Mot de passe</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <!-- Submit ----------->
          <div>
            <button class="btn-blue">Connexion</button>
          </div>
          <!-- Erreur ----------->
          <div>
            <div id="message" v-if="message" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
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
/* Generals __________*/
#blocs {
  display: flex;
  width: 75%;
  justify-content: space-around;
  margin: 150px auto 0px auto;
  @media (max-width: 991.98px) {
    width: 100%;
    margin: 30px 0px 0px 0px;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
  }
}
/* Illustration vagues __________*/
#waves {
  position: absolute;
  top: 0;
  left: 0;
  @media (max-width: 991.98px) {
    display: none;
  }
}
/* section __________*/
section {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100vw;
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
.error-feedback {
  color: $red;
  margin-bottom: 20px;
  display: block;
}
#Link-to-register {
  color: $blue;
  text-decoration: underline;
  margin-top: 50px;
  text-align: center;
  display: block;
  &:hover {
    color: #176cf5;
  }
}
#message {
  text-align: center;
  margin-top: 20px;
  color: $red;
}
/* form __________*/
form {
  @media (max-width: 611.98px) {
    text-align: center;
  }
  label {
    display: block;
    font-size: 18px;
    margin-top: 10px;
  }
  input {
    margin: 35px 0px 15px 20px;
    border: none;
    border-bottom: 2px solid $gray;
    width: 280px;
    transition: border-color 0.3s;
    &:focus {
      border-color: $blue;
    }
    @media (max-width: 611.98px) {
      margin: 20px 0;
    }
  }
}
h1 span {
  display: block;
  color: $blue;
}
</style>
