<template>
  <section>
    <h1>CONTACTEZ-MOI</h1>
    <ul>
      <li>
        <a
          href="https://www.linkedin.com/in/evan-hermier-799b48121/"
          target="_blank"
          rel="noopener noreferrer"
          ><img
            src="@/assets/images/reseaux/linkedin.png"
            alt="logo linkedin"
          />
          Linkedin</a
        >
      </li>
      <li>
        <a
          href="https://github.com/RoXxIV"
          target="_blank"
          rel="noopener noreferrer"
          ><img src="@/assets/images/reseaux/github.png" alt="logo github" />
          Github</a
        >
      </li>
    </ul>
    <!----- Form ----->
    <div id="bloc-form">
      <Form
        v-if="!submited"
        @submit="handleForm"
        :validation-schema="schema"
        id="form"
      >
        <!-----Contact Email ----->
        <div class="formField">
          <label for="contact"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'at']"
            />
            Email</label
          >
          <div class="field">
            <Field name="contact" type="email" v-model="contact.contact" />
            <ErrorMessage name="contact" class="error-feedback alert" />
          </div>
        </div>

        <!----- Sujet ----->
        <div class="formField">
          <label for="subject"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'hand-point-right']"
            />
            Sujet</label
          >
          <div class="field">
            <Field name="subject" as="select" v-model="contact.subject">
              <option value="" disabled selected>Choisir une option</option>
              <option
                v-for="subject in subjects"
                :key="subject"
                :value="subject"
              >
                {{ subject }}
              </option> </Field
            ><ErrorMessage name="subject" class="error-feedback alert" />
          </div>
        </div>
        <!----- Message ----->
        <div class="formField">
          <label for="message"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'pencil-alt']"
            />
            Votre message</label
          >
          <div class="field">
            <Field
              name="message"
              as="textarea"
              rows="4"
              v-model="contact.message"
            /><ErrorMessage name="message" class="error-feedback alert" />
          </div>
        </div>
        <!----- Submit ----->
        <div id="submit">
          <button class="btn-blue">Envoyer</button>
        </div>
      </Form>
      <!----- Si l'envoie a réussi ----->
      <div v-if="submited" id="submited">
        <h2>{{ message }}</h2>
        <p>Redirection dans {{ time }}</p>
        <Loading />
      </div>
    </div>
    <!----- Si l'envoie a échoué ----->
    <div v-if="failed" id="failed" class="alert">
      <h2>Une erreur est survenue</h2>
    </div>
  </section>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import ContactServices from "../services/contact.services";
import Loading from "../components/Reusable-components/Loading.vue";
export default {
  name: "Contact-form",
  title: "Formulaire de contact",
  components: {
    Form,
    Field,
    ErrorMessage,
    Loading,
  },
  data() {
    const schema = yup.object().shape({
      contact: yup
        .string()
        .required("Email requis!")
        .email("Email invalide")
        .max(50, "50 caracteres maximum"),
      subject: yup.string().required("Sujet requis!"),
      commentary: yup
        .string()
        .max(500, "Le message ne doit pas dépasser 500 caractères"),
    });
    return {
      schema,
      submited: false,
      message: "",
      failed: false,
      redirectionTimerId: undefined,
      time: 3,
      subjects: [
        "Une idée d'amelioration du site",
        "Signaler un bug",
        "On bosse ensemble ?",
        "Autre",
      ],
      contact: {
        contact: "",
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    /**
     * Recupere le contenu du formulaire pour le renvoyer sur
     * mon email personnel
     */
    handleForm() {
      ContactServices.sendContactMail(this.contact)
        .then((response) => {
          console.log(response);
          this.message = response.data.message;
          this.submited = true;
          this.redirection();
        })
        .catch((error) => {
          this.failed = true;
          console.log(error);
        });
    },
    /**
     * Redirection de l'utilisateur
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
/* Section __________*/
section {
  /* Reseaux __________*/
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    li a {
      display: flex;
      align-items: center;
      margin: auto 30px;
      img {
        margin-right: 10px;
      }
    }
  }
  /* Bloc-form __________*/
  #bloc-form {
    display: flex;
    justify-content: center;
    width: 700px;
    margin: 30px auto;
    padding: 50px 30px 50px 30px;
    border: 2px solid var(--light-gray-to-less);
    border-radius: 0.75rem;
    -webkit-box-shadow: 0 30px 33px -60px #000000;
    box-shadow: 0 30px 33px -60px #000000;
    /* Form __________*/
    form {
      label {
        display: block;
        margin-top: 10px;
        font-size: 1.3em;
      }
      input {
        margin: 20px 0px 10px 20px;
        border: none;
        border-bottom: 1px solid var(--dark-to-light);
        background: transparent;
        color: var(--dark-to-light);
        width: 100%;
        transition: border-color 0.3s;
        &:focus {
          border-color: $blue;
        }
        @include media-max(611.98px) {
          margin: 20px 0;
        }
      }
      select {
        width: 100%;
        margin: 20px 0px 10px 20px;
        padding-bottom: 10px;
        border: none;
        border-bottom: 1px solid var(--dark-to-light);
        background: var(--light-to-dark);
        color: var(--dark-to-light);
        font-size: 16px;
        transition: border-color 0.3s;
        @include media-max(667.98px) {
          margin-left: 0;
        }
      }
      textarea {
        width: 100%;
        margin: 20px 0px 10px 20px;
        border: 1px solid var(--dark-to-light);
        background: var(--light-to-dark);
        color: var(--dark-to-light);
        transition: border-color 0.3s;
        &:focus {
          border-color: $blue;
        }
        @include media-max(667.98px) {
          margin-left: 0;
        }
      }
      .error-feedback {
        display: block;
        margin-bottom: 20px;
      }
      #submit {
        margin-top: 15px;
        text-align: right;
      }
    }
    #submited {
      text-align: center;
      h2 {
        line-height: 1.6em;
      }
    }
    /* Responsive bloc-form __________*/
    @include media-max(991.98px) {
      width: 80%;
      @include media-max(667.98px) {
        text-align: center;
      }
    }
  }
  #failed {
    text-align: center;
  }
  /* Responsive section __________*/
  @include media-max(991.98px) {
    width: 100%;
  }
}
</style>
