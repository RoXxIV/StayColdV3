<template>
  <router-link :to="`/bath-details/${bath._id}`" tag="div" class="card">
    <div class="card-header">
      <img :src="getImgUrl(bath.weather)" alt="" />
    </div>
    <ul>
      <li class="bath-username">{{ bath.author.username }}</li>
      <li class="bath-date">{{ bath.createdAt }}</li>
      <li>Air : {{ bath.temperatureOutside }}&#8451;</li>
      <li>Eau :{{ bath.waterTemperature }}&#8451;</li>
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
    padding: 10px;
    margin-right: 20px;
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
}

/* 
__________MEDIA QUERIES__________ 
*/
/* Phones moins de 658px*/
@media (max-width: 754.98px) {
  .card {
    padding: 10px 0px 20px 0px;
    flex-direction: column;
  }
  .card img {
    margin: 0;
    padding: 5px;
  }
  .card ul {
    text-align: center;
    margin: 0px;
  }
}
</style>
