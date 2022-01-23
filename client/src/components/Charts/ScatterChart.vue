<template>
  <div>
    <scatter-chart
      :data="getDatasbis"
      xtitle="Température de l'eau (°C)"
      ytitle="Temps dans l'eau"
      suffix=" min"
      :download="true"
      label="Temperature / temps"
    ></scatter-chart>
  </div>
</template>

<script>
export default {
  name: "Scatter-chart",
  props: {
    BathChartData: {},
  },
  computed: {
    /**
     * Recupere la temperature de l'eau ainsi que le temps resté dans l'eau
     * de toute les baignades pour les afficher sous forme de statistique.
     */
    getDatasbis() {
      const baths = this.BathChartData;
      const datas = [];

      for (let i = 0; i < baths.length; i++) {
        datas.push([baths[i].waterTemperature, baths[i].timeInWater]);
      }
      // console.log(datas);
      return datas;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
div {
  width: 60%;
  margin: 50px auto;
}
</style>
