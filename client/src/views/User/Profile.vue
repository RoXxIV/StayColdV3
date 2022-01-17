<template>
  <section>profile works</section>
</template>

<script>
import BathDataServices from "../../services/bathDataServices";
export default {
  name: "Profile",
  title: "Profil",
  components: {},
  data() {
    return {
      userRole: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    fetchUserBaths(userId) {
      BathDataServices.getByUserId(userId)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    if (this.currentUser) {
      this.fetchUserBaths(this.currentUser.id);
    }
  },
};
</script>

<style lang="scss" scoped>
/* Section __________*/
section {
}
</style>
