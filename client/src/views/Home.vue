<template>
  <div>
    <div id="banner-home">
      <Banner />
    </div>
    <Introduction />

    <RecentBath />
  </div>
</template>

<script>
import Banner from "../components/Reusable-components/Banner.vue";
import Introduction from "../components/Home/Introduction.vue";
import RecentBath from "../components/Baths/RecentBath.vue";

export default {
  name: "Home",
  components: { Banner, Introduction, RecentBath },
};
</script>

<style lang="scss" scoped>
#banner-home {
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  position: fixed;
  z-index: -4;
  max-width: 100%;
}
</style>
