<template>
  <div id="test">
    <Banner />
  </div>
</template>

<script>
import Banner from "../components/Reusable-components/Banner.vue";
export default {
  name: "Home",
  components: { Banner },
};
</script>

<style lang="scss" scoped>
#test {
  background: var(--dark-to-light);
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
