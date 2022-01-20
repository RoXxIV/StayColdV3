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
    <Form
      v-if="!submited"
      @submit="handleForm"
      :validation-schema="schema"
      id="form"
    >
      <!-----Contact Email ----->
      <div class="formField">
        <label for="contact"
          ><font-awesome-icon class="font-awesome-icon" :icon="['fa', 'at']" />
          Email <sup>*</sup></label
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
          Sujet <sup>*</sup></label
        >
        <div class="field">
          <Field name="subject" as="select" v-model="contact.subject">
            <option value="" disabled selected>Choisir une option</option>
            <option v-for="subject in subjects" :key="subject" :value="subject">
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
            rows="3"
            v-model="contact.message"
          /><ErrorMessage name="message" class="error-feedback alert" />
        </div>
      </div>
      <!----- Submit ----->
      <div id="submit">
        <button class="btn-blue">Envoyer</button>
      </div>
    </Form>
  </section>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import ContactServices from "../services/contact.services";
export default {
  name: "Contact-form",
  title: "Formulaire de contact",
  components: {
    Form,
    Field,
    ErrorMessage,
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
      time: 2,
      subjects: [
        "Une idée d'amelioration du site",
        "Signalé un bug",
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
    handleForm(contact) {
      ContactServices.sendContactMail(this.contact)
        .then((response) => {
          console.log(response);
          console.log(contact);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 75%;
  margin: auto;
}
</style>
