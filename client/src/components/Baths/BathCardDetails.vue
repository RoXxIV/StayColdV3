<template>
  <!---Username + date-->
  <h2>
    {{ bath?.author?.username }}<br />
    <span>le</span>
    <span id="date">{{ bath.createdAt }}</span>
  </h2>
  <ul>
    <!---Temperature de l'eau-->
    <li>
      <font-awesome-icon
        class="font-awesome-icon"
        :icon="['fa', 'swimming-pool']"
      />
      Température de l'eau: <span>{{ bath.waterTemperature }}&#8451;</span>
    </li>
    <!---Temps resté dans l'eau-->
    <li>
      <font-awesome-icon
        class="font-awesome-icon"
        :icon="['fa', 'stopwatch']"
      />
      Temps resté dans l'eau: <span>{{ bath.timeInWater }} min</span>
    </li>
    <!---Temperature de l'air-->
    <li>
      <font-awesome-icon
        class="font-awesome-icon"
        :icon="['fa', 'temperature-high']"
      />
      Temperature de l'air:
      <span>{{ bath.temperatureOutside }}&#8451;</span>
    </li>
    <!---Meteo-->
    <li>
      <font-awesome-icon
        class="font-awesome-icon"
        :icon="['fa', 'cloud-sun-rain']"
      />
      Météo: <span>{{ bath.weather }}</span>
    </li>
    <!---Vent-->
    <li>
      <font-awesome-icon class="font-awesome-icon" :icon="['fa', 'wind']" />
      Vent: <span>{{ bath.wind ? bath.wind : "n/a" }}</span>
    </li>
    <!---Temps de recuperation-->
    <li>
      <font-awesome-icon
        class="font-awesome-icon"
        :icon="['fa', 'hourglass-half']"
      />
      Temps de récupération:
      <span>{{ bath.recoveryTime ? `${bath.recoveryTime} min` : "n/a" }}</span>
    </li>
    <!---Afterdrop-->
    <li>
      <font-awesome-icon
        class="font-awesome-icon"
        :icon="['fa', 'wave-square']"
      />
      Afterdrop: <span>{{ bath.afterdrop ? bath.afterdrop : "n/a" }}</span>
    </li>
    <!---Ressenti global-->
    <li>
      <font-awesome-icon
        class="font-awesome-icon"
        :icon="['fa', 'grin-stars']"
      />
      Ressenti global:
      <span>{{ bath.globalFeeling ? bath.globalFeeling : "n/a" }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Bath-card-details",
  props: {
    bath: Object,
  },
};
</script>

<style lang="scss" scoped>
/* Titre __________*/
h2 {
  margin-top: 0;
  text-align: center;
  span {
    font-size: 0.8em;
    font-style: italic;
    &#date {
      margin-left: 5px;
      color: $blue;
    }
  }
}
/* Details __________*/
ul {
  text-align: center;
  li {
    margin: 0;
    padding: 5px 0px;
    font-size: 1.1em;
    span {
      color: $blue;
      @media (max-width: 667.98px) {
        display: block;
        margin: 10px;
      }
    }
    @media (max-width: 667.98px) {
      padding: 0;
    }
  }
}
</style>
