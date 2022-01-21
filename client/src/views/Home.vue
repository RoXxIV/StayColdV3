<template>
  <div>
    <div id="banner-home">
      <Banner />
    </div>
    <Introduction />
    <div id="landscape"></div>
    <RecentBath />
  </div>
</template>

<script>
import Banner from "../components/Reusable-components/Banner.vue";
import Introduction from "../components/Home/Introduction.vue";
import RecentBath from "../components/Baths/RecentBath.vue";

export default {
  name: "Home",
  title: "Acceuil",
  components: { Banner, Introduction, RecentBath },
};
</script>

<style lang="scss" scoped>
#banner-home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}
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
