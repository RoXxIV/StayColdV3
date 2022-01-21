<template>
  <div>
    <!----- Form ----->
    <Form v-if="!submited" @submit="handleForm" :validation-schema="schema">
      <!----- Temperature de l'eau ----->
      <div class="formField">
        <label for="waterTemperature"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'swimming-pool']"
          />
          Température de l'eau <sup>*</sup></label
        >
        <div class="field">
          <Field
            name="waterTemperature"
            type="number"
            min="0.1"
            placeholder="&#8451;"
            v-model="bath.waterTemperature"
          />
          <ErrorMessage name="waterTemperature" class="error-feedback alert" />
        </div>
      </div>
      <!----- Temperature de l'air ----->
      <div class="formField">
        <label for="temperatureOutside"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'temperature-high']"
          />
          Température de l'air <sup>*</sup></label
        >
        <div class="field">
          <Field
            name="temperatureOutside"
            type="number"
            placeholder="&#8451;"
            v-model="bath.temperatureOutside"
          /><ErrorMessage
            name="temperatureOutside"
            class="error-feedback alert"
          />
        </div>
      </div>
      <!----- Meteo ----->
      <div class="formField">
        <label for="weather"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'cloud-sun-rain']"
          />
          Météo <sup>*</sup></label
        >
        <div class="field">
          <Field name="weather" as="select" v-model="bath.weather">
            <option value="" disabled selected>Choisir une option</option>
            <option
              v-for="weather in selectedWeather"
              :key="weather"
              :value="weather"
            >
              {{ weather }}
            </option> </Field
          ><ErrorMessage name="weather" class="error-feedback alert" />
        </div>
      </div>
      <!----- Temps dans l'eau ----->
      <div class="formField">
        <label for="timeInWater"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'stopwatch']"
          />
          Temps dans l'eau <sup>*</sup></label
        >
        <div class="field">
          <Field
            name="timeInWater"
            type="number"
            min="0.1"
            placeholder="Minutes"
            v-model="bath.timeInWater"
          />
          <ErrorMessage name="timeInWater" class="error-feedback alert" />
        </div>
      </div>
      <!----- Vent ----->
      <div class="formField">
        <label for="wind"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'wind']"
          />
          Vent</label
        >
        <div class="field">
          <Field name="wind" as="select" v-model="bath.wind">
            <option value="" disabled selected>Choisir une option</option>
            <option v-for="wind in selectedWind" :key="wind" :value="wind">
              {{ wind }}
            </option> </Field
          ><ErrorMessage name="wind" class="error-feedback alert" />
        </div>
      </div>
      <!----- Temps de recuperation ----->
      <div class="formField">
        <label for="recoveryTime"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'hourglass-half']"
          />
          Temps de récuperation</label
        >
        <div class="field">
          <Field
            name="recoveryTime"
            type="number"
            min="0.1"
            placeholder="Minutes"
            v-model="bath.recoveryTime"
          /><ErrorMessage name="recoveryTime" class="error-feedback alert" />
        </div>
      </div>
      <!----- Afterdrop ----->
      <div class="formField">
        <label for="afterdrop"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'wave-square']"
          />
          Afterdrop
          <sup id="help-afterdrop-trigger"
            ><font-awesome-icon
              :icon="['fa', 'question-circle']"
              class="font-awesome-icon" /></sup
          ><span id="help-afterdrop-text"
            >Tremblements durant la recuperation</span
          ></label
        >
        <div class="field">
          <Field name="afterdrop" as="select" v-model="bath.afterdrop">
            <option value="" disabled selected>Choisir une option</option>
            <option
              v-for="afterdrop in afterdropList"
              :key="afterdrop"
              :value="afterdrop"
            >
              {{ afterdrop }}
            </option> </Field
          ><ErrorMessage name="afterdrop" class="error-feedback alert" />
        </div>
      </div>
      <!----- Ressenti global ----->
      <div class="formField">
        <label for="globalFeeling"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'grin-stars']"
          />
          Ressenti global</label
        >
        <div class="field">
          <Field name="globalFeeling" as="select" v-model="bath.globalFeeling">
            <option value="" disabled selected>Choisir une option</option>
            <option
              v-for="globalFeeling in globalFeelingList"
              :key="globalFeeling"
              :value="globalFeeling"
            >
              {{ globalFeeling }}
            </option> </Field
          ><ErrorMessage name="globalFeeling" class="error-feedback alert" />
        </div>
      </div>
      <!----- Commentaires ----->
      <div class="formField">
        <label for="commentary"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'pencil-alt']"
          />
          Commentaires</label
        >
        <div class="field">
          <Field
            name="commentary"
            as="textarea"
            rows="3"
            v-model="bath.commentary"
          /><ErrorMessage name="commentary" class="error-feedback alert" />
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
      <div v-if="editMode === false">
        <button @click="resetForm" class="btn-blue">Nouvelle Baignade</button>
      </div>
    </div>
    <!----- Si l'envoie a échoué ----->
    <div v-if="failed" id="failed" class="alert">
      <h2>Une erreur est survenue</h2>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import BathDataServices from "../../services/bathDataServices";
export default {
  name: "Bath-form",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    editMode: Boolean,
  },
  data() {
    /**
     * Schema de validation du formulaire
     */
    const schema = yup.object().shape({
      waterTemperature: yup
        .number()
        .typeError("Temperature invalide!")
        .required("Temperature de l'eau requise!")
        .min(0.1, "Temperature invalide!")
        .max(50, "Temperature invalide!"),
      temperatureOutside: yup
        .number()
        .typeError("Temperature invalide!")
        .required("Temperature de l'air requise")
        .max(60, "Temperature invalide!"),
      weather: yup.string().required("Météo requise"),
      timeInWater: yup
        .number()
        .typeError("Temps invalide!")
        .required("Temps resté dans l'eau requis!")
        .min(0.1, "Temps invalide!")
        .max(1440, "Temps invalide!"),
      wind: yup.string(),
      recoveryTime: yup
        .number()
        .min(0.1, "Temps invalide!")
        .max(1440, "Temps invalide!")
        .notRequired()
        .nullable(true),
      afterdrop: yup.string(),
      globalFeeling: yup.string(),
      commentary: yup
        .string()
        .max(500, "Le commentaire ne doit pas dépasser 500 caractères"),
    });
    return {
      schema,
      submited: false,
      message: "",
      failed: false,
      redirectionTimerId: undefined,
      time: 2,
      selectedWeather: [
        "partiellement nuageux",
        "nuageux",
        "ensoleillé",
        "pluie",
        "neige",
        "tempête",
      ],
      selectedWind: ["aucun", "leger", "modéré", "beaucoup"],
      afterdropList: ["très intense", "intense", "modéré", "leger", "aucun"],
      globalFeelingList: ["très dur", "dur", "modéré", "facile", "très facile"],
      bath: {
        id: null,
        author: "",
        waterTemperature: "",
        timeInWater: "",
        temperatureOutside: "",
        weather: "",
        wind: "",
        recoveryTime: null,
        afterdrop: "",
        globalFeeling: "",
        commentary: "",
      },
    };
  },
  methods: {
    /**
     * A la soummission du formulaire, redirige vers la methods approprié
     * suivant si le formulaire est en mode edition ou ajout d'une nouvelle
     * baignade
     */
    handleForm() {
      this.editMode ? this.editBath() : this.saveBath();
    },
    /**
     * Ajoute une nouvelle baignade
     */
    saveBath() {
      this.bath.author = this.$store.state.auth.user.id;
      BathDataServices.create(this.bath)
        .then((response) => {
          // console.log(response.data);
          this.message = response.data.message;
          this.submited = true;
        })
        .catch((error) => {
          console.log(error);
          this.failed = true;
        });
    },
    /**
     * Edite une baignade puis redirige l'utilisateur sur la page precedente
     */
    editBath() {
      BathDataServices.update(this.bath.id, this.bath)
        .then((response) => {
          // console.log(response.data);
          this.message = response.data.message;
          this.submited = true;
          this.redirectionTimerId = setInterval(() => {
            this.time--;
            if (this.time === 0) {
              clearInterval(this.redirectionTimerId);
              this.$router.go(-1);
            }
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          this.failed = true;
        });
    },
    /**
     * Recupere la baignade a l'aide de sont ID en parametre d'url
     * Redirige sur la page 404 si la baignade n'appartient pas a l'utilisateur
     * ou si aucune baignade n'est trouvé
     * @param {string} id
     */
    getcurrentBath(id) {
      BathDataServices.getOne(id)
        .then((response) => {
          // console.log(response.data);
          if (response.data.author._id === this.$store.state.auth.user.id) {
            this.bath.id = response.data._id;
            this.bath.author = response.data.author._id;
            this.bath.waterTemperature = response.data.waterTemperature;
            this.bath.timeInWater = response.data.timeInWater;
            this.bath.temperatureOutside = response.data.temperatureOutside;
            this.bath.weather = response.data.weather;
            this.bath.wind = response.data.wind;
            this.bath.recoveryTime = response.data.recoveryTime;
            this.bath.afterdrop = response.data.afterdrop;
            this.bath.globalFeeling = response.data.globalFeeling;
            this.bath.commentary = response.data.commentary;
          } else {
            this.$router.push("/not-found");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$router.push("/not-found");
        });
    },
    /**
     * Ré-affiche le formulaire apres l'ajout reussi d'une baignade
     */
    resetForm() {
      this.submited = false;
    },
  },
  /**
   * A la creation du composant, si le formulaire est en mode edition
   * on recupere l'ID de la baignade en URL afin de pré-remplir
   * les champs du formulaire
   */
  created() {
    if (this.editMode) {
      if (this.$route.params.bathId) {
        this.getcurrentBath(this.$route.params.bathId);
      }
    }
  },
  beforeUnmount() {
    clearInterval(this.redirectionTimerId);
  },
};
</script>

<style lang="scss" scoped>
/* Form __________*/
form {
  /* FormField __________*/
  .formField {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px auto;
    width: 700px;
    font-size: 1.2em;
    /* Label afterdrop __________*/
    label[for="afterdrop"] {
      position: relative;
      sup {
        color: $blue;
        font-size: 15px;
        cursor: pointer;
      }
      #help-afterdrop-trigger:hover + #help-afterdrop-text {
        opacity: 1;
      }
      #help-afterdrop-text {
        position: absolute;
        left: 110%;
        padding: 10px;
        background: var(--dark-to-light);
        border-radius: 5px;
        color: var(--light-to-dark);
        font-size: 14px;
        opacity: 0;
      }
    }
    /* Field __________*/
    .field {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      /* Input __________*/
      input {
        width: 100%;
        background: var(--light-to-dark);
        border: none;
        border-bottom: 1px solid var(--dark-to-light);
        transition: border-color 0.3s;
        color: var(--dark-to-light);
        font-size: 16px;
        &:focus {
          border-color: $blue;
        }
        &::placeholder {
          color: $blue;
        }
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        &[type="number"] {
          -moz-appearance: textfield;
        }
        @include media-max(611.98px) {
          padding-left: 30px;
        }
      }
      /* Select __________*/
      select {
        width: 100%;
        background: var(--light-to-dark);
        border: none;
        border-bottom: 1px solid var(--dark-to-light);
        transition: border-color 0.3s;
        color: var(--dark-to-light);
        font-size: 16px;
        &:focus {
          border-color: $blue;
        }
        @include media-max(991.98px) {
          text-align: center;
        }
      }
      /* Textarea __________*/
      textarea {
        width: 100%;
        background: var(--light-to-dark);
        border: 1px solid var(--dark-to-light);
        transition: border-color 0.3s;
        color: var(--dark-to-light);
        &:focus {
          border-color: $blue;
        }
      }
      /* Erreurs __________*/
      .error-feedback {
        display: block;
        margin-top: 10px;
        font-size: 16px;
        @include media-max(991.98px) {
          text-align: center;
        }
      }
      /* Field Responsive __________*/
      @include media-max(991.98px) {
        margin-top: 10px;
        @include media-max(611.98px) {
          width: 100%;
        }
      }
    }
    /* FormField Responsive __________*/
    @include media-max(991.98px) {
      flex-direction: column;
      align-content: center;
      margin-bottom: 35px;
      @include media-max(611.98px) {
        width: 100%;
      }
    }
  }
  /* Submit __________*/
  #submit {
    display: block;
    text-align: right;
    @include media-max(991.98px) {
      text-align: center;
    }
  }
  @include media-max(991.98px) {
    margin: auto;
    text-align: center;
    @include media-max(611.98px) {
      width: 95%;
    }
  }
}
/* Submited __________*/
#submited {
  text-align: center;
  h2 {
    margin: 30px auto 50px auto;
  }
}
#failed {
  text-align: center;
}
</style>
