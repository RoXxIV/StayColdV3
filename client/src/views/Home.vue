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
// test
import bathDataServices from "../services/bathDataServices";
export default {
  name: "Home",
  components: { Banner, Introduction },
  methods: {
    testfetch() {
      bathDataServices
        .getAll()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.testfetch();
  },
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
