<template>
  <!---Username + date-->
  <h2>
    {{ bath?.author?.username }}<br />
    <span>le</span>
    <span id="date">{{ bath.createdAt }}</span>
  </h2>
  <ul id="details-list">
    <!---Temperature de l'eau-->
    <li>
      <p>
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fa', 'swimming-pool']"
        />
        Température de l'eau: <span>{{ bath.waterTemperature }}&#8451;</span>
      </p>
    </li>
    <!---Temps resté dans l'eau-->
    <li>
      <p>
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fa', 'stopwatch']"
        />
        Temps resté dans l'eau: <span>{{ bath.timeInWater }} min</span>
      </p>
    </li>
    <!---Temperature de l'air-->
    <li>
      <p>
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fa', 'temperature-high']"
        />
        Temperature de l'air:
        <span>{{ bath.temperatureOutside }}&#8451;</span>
      </p>
    </li>
    <!---Meteo-->
    <li>
      <p>
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fa', 'cloud-sun-rain']"
        />
        Météo: <span>{{ bath.weather }}</span>
      </p>
    </li>
    <!---Vent-->
    <li>
      <p>
        <font-awesome-icon class="font-awesome-icon" :icon="['fa', 'wind']" />
        Vent: <span>{{ bath.wind ? bath.wind : "n/a" }}</span>
      </p>
    </li>
    <!---Temps de recuperation-->
    <li>
      <p>
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fa', 'hourglass-half']"
        />
        Temps de récupération:
        <span>{{
          bath.recoveryTime ? `${bath.recoveryTime} min` : "n/a"
        }}</span>
      </p>
    </li>
    <!---Afterdrop-->
    <li>
      <p>
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fa', 'wave-square']"
        />
        Afterdrop: <span>{{ bath.afterdrop ? bath.afterdrop : "n/a" }}</span>
      </p>
    </li>
    <!---Ressenti global-->
    <li>
      <p>
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fa', 'grin-stars']"
        />
        Ressenti global:
        <span>{{ bath.globalFeeling ? bath.globalFeeling : "n/a" }}</span>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Bath-card-details",
  props: {
    bath: Object,
  },
  data() {
    return {};
  },
  methods: {
    /**
     * recupere le svg correspondant a la météo indiqué
     * @param {string} pic
     */
    getImgUrl(pic) {
      return require(`@/assets/images/weather-icons/${pic}.svg`);
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  span {
    font-size: 0.8em;
    font-style: italic;
    &#date {
      color: $blue;
      margin-left: 5px;
    }
  }
}
#details-list {
  text-align: center;
  li {
    padding: 5px 0px;
    p {
      font-size: 1.1em;
      span {
        color: $blue;
        @media (max-width: 667.98px) {
          display: block;
          margin-top: 10px;
        }
      }
    }
    @media (max-width: 667.98px) {
      padding: 0;
    }
  }
}
</style>
