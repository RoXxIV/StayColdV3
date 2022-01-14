<template>
  <div>
    <div id="banner-home">
      <Banner />
    </div>
    <Introduction />
  </div>
</template>

<script>
import Banner from "../components/Reusable-components/Banner.vue";
import Introduction from "../components/Home/Introduction.vue";

export default {
  name: "Home",
  components: { Banner, Introduction },
};
</script>

<style lang="scss" scoped>
#banner-home {
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
