<template>
  <section>
    <h2>Liste des utilisateurs</h2>
    <table>
      <thead>
        <tr>
          <th>Pseudo</th>
          <th>Email</th>
          <th>Role</th>
          <th>Créer le</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <ul>
              <li>
                {{ user.roles["name"] }}
              </li>
            </ul>
          </td>
          <td>{{ user.createdAt }}</td>
          <td>{{ user.status }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import UserServices from "../../services/user.service";
export default {
  name: "users-table",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    fetchUsers() {
      UserServices.getAllUsers()
        .then((response) => {
          // console.log(response);
          this.users = response.data;
          /*
            Recupere le dernier rôle du tableau
            &
            Formate les dates
          */
          this.users.filter((user) => {
            user.roles = user.roles.pop();
            user.createdAt = user.createdAt
              .substring(0, 10)
              .split("-")
              .reverse()
              .join("/");
          });
          // console.log(this.users);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style lang="scss" scoped></style>
