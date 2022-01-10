<template>
  <section>
    <!-- Form ----------->
    <div id="bloc-form">
      <h1>
        Formulaire<br />
        d'<span>Inscription</span>
      </h1>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <!-- Username ----------->
          <div>
            <label for="username">Nom d'utilisateur</label>
            <Field name="username" type="text" /><ErrorMessage
              name="username"
              class="error-feedback"
            />
          </div>
          <!-- Email ----------->
          <div>
            <label for="email">Email</label>
            <Field name="email" type="email" /><ErrorMessage
              name="email"
              class="error-feedback"
            />
          </div>
          <!-- Password ----------->
          <div>
            <label for="password">Mot de passe</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <!-- Password confirmation ----------->
          <div>
            <label for="passwordComfirmation">Confirmer le mot de passe</label>
            <Field name="passwordComfirmation" type="password" />
            <ErrorMessage name="passwordComfirmation" class="error-feedback" />
          </div>
          <!-- Submit ----------->
          <div>
            <button class="btn-blue">S'inscrire</button>
          </div>
        </div>
      </Form>
      <!-- Erreur ----------->
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        <span>{{ message }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
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
        .oneOf([yup.ref("password"), null], "Doit être identique"),
    });
    return {
      successful: false,
      message: "",
      schema,
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
  },
};
</script>

<style lang="scss" scoped>
/* General __________*/
section {
  width: 100vw;
  display: flex;
  margin-left: 25%;
  @media (max-width: 991.98px) {
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
}
.error-feedback {
  color: $red;
  margin-bottom: 20px;
  display: block;
}
/* form __________*/
form {
  label {
    display: block;
    font-size: 18px;
    margin-top: 10px;
  }
  input {
    margin: 25px 0px 15px 20px;
    border: none;
    background: transparent;
    border-bottom: 2px solid var(--dark-to-light);
    width: 280px;
    transition: border-color 0.3s;
    &:focus {
      border-color: $blue;
    }
  }
}
h1 span {
  color: $blue;
}
/*#Link-to-login {
  color: $blue;
  text-decoration: underline;
  margin-top: 50px;
  text-align: center;
  display: block;
}
#Link-to-login:hover {
  color: #176cf5;
}
#redirectToLogin {
  color: white;
  background: $blue;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid $blue;
  margin: 15px auto 0px auto;
  display: block;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
}
#redirectToLogin:hover {
  color: $blue;
  background: white;
  border: 1px solid $blue;
}*/
</style>
