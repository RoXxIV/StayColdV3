<template>
  <ul id="pies-chart-list">
    <!---Ressenti global-->
    <li>
      <h4>Ressenti global</h4>
      <pie-chart
        :data="getFeelings"
        :colors="[
          '#ec7063',
          '#f4d03f',
          '#7fb3d5',
          '#82e0aa',
          '#f4f6f7',
          '#191919',
        ]"
        :download="true"
      ></pie-chart>
    </li>
    <!---Afterdrop-->
    <li>
      <h4>Aftedrop</h4>
      <pie-chart
        :data="getAfterdrop"
        :colors="[
          '#ec7063',
          '#f4d03f',
          '#7fb3d5',
          '#82e0aa',
          '#f4f6f7',
          '#191919',
        ]"
        :download="true"
      ></pie-chart>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pie-charts",
  props: {
    BathChartData: {},
  },

  computed: {
    /**
     * Recupere le champs globalFeelings pour chaque baignades
     * en incrementant l'index lié
     * afin de fournir les donnée necessaire au graphique
     */
    getFeelings() {
      const baths = this.BathChartData;
      let arr = [];
      let veryHardIndex = 0;
      let hardIndex = 0;
      let moderateIndex = 0;
      let easyIndex = 0;
      let veryEasyIndex = 0;
      let noData = 0;
      for (let i = 0; i < baths.length; i++) {
        switch (baths[i].globalFeeling) {
          case "très dur":
            veryHardIndex++;
            break;
          case "dur":
            hardIndex++;
            break;
          case "modéré":
            moderateIndex++;
            break;
          case "facile":
            easyIndex++;
            break;
          case "très facile":
            veryEasyIndex++;
            break;
          case "":
            noData++;
            break;
          default:
            console.log(`getFeelings() erreur`);
        }

        arr = [
          ["très dur", veryHardIndex],
          ["dur", hardIndex],
          ["modéré", moderateIndex],
          ["facile", easyIndex],
          ["très facile", veryEasyIndex],
          ["n/a", noData],
        ];
      }
      return arr;
    },
    /**
     * Recupere le champs afterdrop pour chaque baignades
     * en incrementant l'index lié
     * afin de fournir les donnée necessaire au graphique
     */
    getAfterdrop() {
      const baths = this.BathChartData;
      let arr = [];
      let veryIntenseIndex = 0;
      let intenseIndex = 0;
      let moderateIndex = 0;
      let aLittleIndex = 0;
      let noneIndex = 0;
      let noData = 0;
      for (let i = 0; i < baths.length; i++) {
        switch (baths[i].afterdrop) {
          case "très intense":
            veryIntenseIndex++;
            break;
          case "intense":
            intenseIndex++;
            break;
          case "modéré":
            moderateIndex++;
            break;
          case "leger":
            aLittleIndex++;
            break;
          case "aucun":
            noneIndex++;
            break;
          case "":
            noData++;
            break;
          default:
            console.log(`getAfterdrop() erreur`);
        }

        arr = [
          ["très intense", veryIntenseIndex],
          ["intense", intenseIndex],
          ["modéré", moderateIndex],
          ["leger", aLittleIndex],
          ["aucun", noneIndex],
          ["n/a", noData],
        ];
      }
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
#pies-chart-list {
  display: flex;
  justify-content: center;
  li {
    margin: 0px 50px;
    h4 {
      text-align: center;
    }
  }
  @include media-max(991.98px) {
    flex-direction: column;
  }
}
</style>
