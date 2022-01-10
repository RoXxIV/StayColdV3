<template>
  <div>
    <h1>🍒 {{ message }} 🍒</h1>
    <UsersTable />
  </div>
</template>

<script>
import UsersTable from "../../components/Boards/UsersTable.vue";
export default {
  name: "Admin-board",
  components: { UsersTable },
  data() {
    return {
      message: "Admin Board",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
