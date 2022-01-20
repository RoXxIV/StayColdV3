<template>
  <router-link :to="`/bath-details/${bath._id}`" tag="div" class="card">
    <!--Weather-->
    <div>
      <img :src="getImgUrl(bath.weather)" alt="icone indiquant la météo" />
    </div>
    <ul>
      <!--Pseudo-->
      <li class="bath-username">{{ bath.author.username }}</li>
      <!--Date-->
      <li class="bath-date">{{ bath.createdAt }}</li>
      <!--Temperature de l'air-->
      <li>Air : {{ bath.temperatureOutside }}&#8451;</li>
      <!--Temperature de l'eau-->
      <li>Eau :{{ bath.waterTemperature }}&#8451;</li>
      <!--Temps resté dans l'eau-->
      <li>
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fa', 'stopwatch']"
        />
        : {{ bath.timeInWater }} min
      </li>
    </ul>
  </router-link>
</template>

<script>
export default {
  name: "Bath-card",
  props: {
    bath: {},
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
/* Card __________*/
.card {
  display: flex;
  align-items: center;
  padding: 0px 50px 0px 0px;
  border: 2px solid var(--light-gray-to-less);
  border-radius: 0.75rem;
  -webkit-box-shadow: 0 30px 33px -60px #000000;
  box-shadow: 0 30px 33px -60px #000000;
  &:hover {
    -webkit-box-shadow: 0 40px 43px -60px $blue;
    box-shadow: 0 40px 43px -60px $blue;
  }
  img {
    min-width: 80px;
    min-height: 80px;
    margin-right: 20px;
    padding: 10px;
  }
  ul {
    li {
      margin: 5px 0px;
      .bath-username {
        font-weight: bold;
      }
      .bath-date {
        font-size: 0.8em;
      }
    }
  }
  /* Card Responsive __________*/
  @media (max-width: 754.98px) {
    flex-direction: column;
    padding: 10px 0px 20px 0px;
    img {
      margin: 0;
      padding: 5px;
    }
    ul {
      margin: 0px;
      border-top: 2px solid var(--dark-to-light);
      text-align: center;
    }
  }
}
</style>
