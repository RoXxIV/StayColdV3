<template>
  <section>
    <div id="blocs">
      <div id="bloc-form">
        <h1>Formulaire d'<span>Inscription</span></h1>
        <!-- Form ----------->
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
              <label for="passwordComfirmation"
                >Confirmer le mot de passe</label
              >
              <Field name="passwordComfirmation" type="password" />
              <ErrorMessage
                name="passwordComfirmation"
                class="error-feedback"
              />
            </div>
            <!-- Submit ----------->
            <div>
              <button class="btn-blue">S'inscrire</button>
            </div>
          </div>
        </Form>
      </div>
      <!--Illustration-->
      <div>
        <img
          id="illustration"
          src="@/assets/images/inscription.svg"
          alt="vague de decoration"
        />
      </div>

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
/* section __________*/
section {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100vw;
  @media (max-width: 991.98px) {
    flex-direction: column;
  }
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
    #bloc-form {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
      h1 {
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

        .error-feedback {
          margin-bottom: 20px;
          display: block;
        }
        #message {
          text-align: center;
          margin-top: 20px;
        }
      }
      @media (max-width: 991.98px) {
        margin-top: 0;
      }
    }
  }
}
/*
#Link-to-login {
  color: var(--blue);
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
  background: var(--blue);
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid var(--blue);
  margin: 15px auto 0px auto;
  display: block;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
}
#redirectToLogin:hover {
  color: var(--blue);
  background: white;
  border: 1px solid var(--blue);
}
*/
</style>
