<template>
  <div>
    <h1>🍒 {{ message }} 🍒</h1>
    <UsersTable />
  </div>
</template>

<script>
import AccessService from "../../services/access.service";
import UsersTable from "../../components/Boards/UsersTable.vue";
export default {
  name: "Admin-board",
  components: { UsersTable },
  data() {
    return {
      message: "",
      users: [],
    };
  },
  methods: {
    getAdminAccess() {
      AccessService.getAdminBoard()
        .then((response) => {
          // console.log(response);
          this.message = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getAdminAccess();
  },
};
</script>

<style lang="scss" scoped></style>
