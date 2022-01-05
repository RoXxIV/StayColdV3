<template>
  <section>
    <!--Form-->
    <Form @submit="handleLogin" :validation-schema="schema">
      <!--Username-->
      <div>
        <label for="username">Nom d'utilisateur</label>
        <Field name="username" type="text" /><ErrorMessage
          name="username"
          class="error-feedback"
        />
      </div>
      <!--Password-->
      <div>
        <label for="password">Mot de passe</label>
        <Field name="password" type="password" /><ErrorMessage
          name="password"
          class="error-feedback"
        />
      </div>
      <!--Submit-->
      <div>
        <button>Connexion</button>
      </div>
      <!--erreur-->
      <div>
        <div id="message" v-if="message" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>
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
        (response) => {
          console.log(response);
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

<style lang="scss" scoped></style>
