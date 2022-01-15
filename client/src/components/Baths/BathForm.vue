<template>
  <section>
    <!----- Form ----->
    <Form
      v-if="!submited"
      @submit="handleForm"
      :validation-schema="schema"
      id="form"
    >
      <!----- Temperature de l'eau ----->
      <div class="formField">
        <label for="waterTemperature"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'swimming-pool']"
          />
          Température de l'eau <sup>*</sup></label
        >
        <div>
          <Field
            name="waterTemperature"
            type="number"
            min="0.1"
            placeholder="&#8451;"
            v-model="bath.waterTemperature"
          />
          <ErrorMessage name="waterTemperature" class="error-feedback" />
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
        <div>
          <Field
            name="temperatureOutside"
            type="number"
            placeholder="&#8451;"
            v-model="bath.temperatureOutside"
          /><ErrorMessage name="temperatureOutside" class="error-feedback" />
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
        <div>
          <Field name="weather" as="select" v-model="bath.weather">
            <option value="" disabled selected>Choisir une option</option>
            <option
              v-for="weather in selectedWeather"
              :key="weather"
              :value="weather"
            >
              {{ weather }}
            </option> </Field
          ><ErrorMessage name="weather" class="error-feedback" />
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
        <div>
          <Field
            name="timeInWater"
            type="number"
            min="0.1"
            placeholder="Minutes"
            v-model="bath.timeInWater"
          />
          <ErrorMessage name="timeInWater" class="error-feedback" />
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
        <div>
          <Field name="wind" as="select" v-model="bath.wind">
            <option value="" disabled selected>Choisir une option</option>
            <option v-for="wind in selectedWind" :key="wind" :value="wind">
              {{ wind }}
            </option> </Field
          ><ErrorMessage name="wind" class="error-feedback" />
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
        <div>
          <Field
            name="recoveryTime"
            type="number"
            min="0.1"
            placeholder="Minutes"
            v-model="bath.recoveryTime"
          /><ErrorMessage name="recoveryTime" class="error-feedback" />
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
        <div>
          <Field name="afterdrop" as="select" v-model="bath.afterdrop">
            <option value="" disabled selected>Choisir une option</option>
            <option
              v-for="afterdrop in afterdropList"
              :key="afterdrop"
              :value="afterdrop"
            >
              {{ afterdrop }}
            </option> </Field
          ><ErrorMessage name="afterdrop" class="error-feedback" />
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
        <div>
          <Field name="globalFeeling" as="select" v-model="bath.globalFeeling">
            <option value="" disabled selected>Choisir une option</option>
            <option
              v-for="globalFeeling in globalFeelingList"
              :key="globalFeeling"
              :value="globalFeeling"
            >
              {{ globalFeeling }}
            </option> </Field
          ><ErrorMessage name="globalFeeling" class="error-feedback" />
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
        <div>
          <Field
            name="commentary"
            as="textarea"
            rows="3"
            v-model="bath.commentary"
          /><ErrorMessage name="commentary" class="error-feedback" />
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
    const schema = yup.object().shape({
      waterTemperature: yup
        .number()
        .typeError("Temperature invalide!")
        .required("Temperature de l'eau requise!")
        .min(0.1, "c'est plus de l'eau c'est de la glace!"),
      temperatureOutside: yup
        .number()
        .typeError("Temperature invalide!")
        .required("Temperature de l'air requise"),
      weather: yup.string().required("Météo requise"),
      timeInWater: yup
        .number()
        .typeError("Temps invalide!")
        .required("Temps resté dans l'eau requis!")
        .min(0.1, "Le principe d'une baignade c'est d'aller dans l'eau!"),
      wind: yup.string(),
      recoveryTime: yup
        .number()
        .min(0.1, "C'est quoi ton secret?")
        .notRequired()
        .nullable(true),
      afterdrop: yup.string(),
      globalFeeling: yup.string(),
      commentary: yup.string(),
    });
    return {
      submited: false,
      schema,
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
        userId: "",
      },
    };
  },
  methods: {
    handleForm() {
      this.editMode ? this.editBath() : this.saveBath();
    },
    saveBath() {
      this.bath.author = this.$store.state.auth.user.id;
      BathDataServices.create(this.bath)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
