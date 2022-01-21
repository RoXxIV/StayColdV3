<template>
  <div>
    <!--Banner-->
    <div id="banner-home">
      <Banner />
    </div>
    <!--Introduction-->
    <Introduction />
    <!--IMG-->
    <div id="landscape"></div>
    <!--Baignades recentes-->
    <RecentBath />
    <!--quelque conseils-->
    <Advice />
  </div>
</template>

<script>
import Banner from "../components/Reusable-components/Banner.vue";
import Introduction from "../components/Home/Introduction.vue";
import RecentBath from "../components/Baths/RecentBath.vue";
import Advice from "../components/Home/Advices.vue";
export default {
  name: "Home",
  title: "Acceuil",
  components: { Banner, Introduction, RecentBath, Advice },
};
</script>

<style lang="scss" scoped>
/* Banner home__________*/
#banner-home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}
/* Landscape__________*/
#landscape {
  height: 250px;
  margin-top: 100px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  background-image: url(../assets/images/background-home.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 50%;
}
</style>
