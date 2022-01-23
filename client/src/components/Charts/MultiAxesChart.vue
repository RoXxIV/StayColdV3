<template>
  <div>
    <line-chart :data="getDatas" :download="true" />
  </div>
</template>

<script>
export default {
  name: "Multi-axes-chart",
  props: {
    BathChartData: {},
  },
  computed: {
    /**
     * Recupere la temperature de l'eau ainsi que le temps resté dans l'eau
     * des 8 dernieres baignade pour les afficher sous forme de statistique.
     */
    getDatas() {
      const baths = this.BathChartData.slice(0, 8);
      const datas = [
        {
          name: "Temperature de l'eau en °C",
          data: {},
        },
        {
          name: "Temps dans l'eau en min",
          data: {},
        },
      ];
      for (let i = 0; i < baths.length; i++) {
        datas[0].data[baths[i].createdAt] = baths[i].waterTemperature;
        datas[1].data[baths[i].createdAt] = baths[i].timeInWater;
        // console.log("final", datas);
      }
      return datas;
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 60%;
  margin: 50px auto;
}
</style>
