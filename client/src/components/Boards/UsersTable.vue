<template>
  <section>
    <h2>Liste des utilisateurs</h2>
    <input type="text" placeholder="Recherche par pseudo" v-model="filter" />
    <span> totale: {{ users.length }}</span>
    <table>
      <thead>
        <tr>
          <th>Pseudo</th>
          <th>Email</th>
          <th>Role</th>
          <th>Créer le</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUser" :key="user._id">
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
          <td :class="user.status === 'Pending' ? 'alert' : ''">
            {{ user.status }}
          </td>
          <td><span>Select</span></td>
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
      searchUser: null,
      filter: "",
    };
  },
  computed: {
    filteredUser() {
      return this.users.filter((user) => {
        const username = user.username.toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        return username.includes(searchTerm);
      });
    },
  },
  methods: {
    fetchUsers() {
      UserServices.getAllUsers()
        .then((response) => {
          this.users = response.data;
          //Recupere le dernier rôle du tableau & Formate les dates
          this.users.filter((user) => {
            user.roles = user.roles.pop();
            user.createdAt = user.createdAt
              .substring(0, 10)
              .split("-")
              .reverse()
              .join("/");
          });
          // console.log(response);
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

<style lang="scss" scoped>
section {
  width: 75%;
  margin: auto;
  input {
    margin-bottom: 10px;
    padding: 5px 10px;
    border-color: $light-gray;
  }
  table {
    width: 100%;
    thead {
      th {
        background-color: darken($gray, 6%);
        color: #fff;
        border: 1px solid darken($gray, 6%);
        text-align: left;
        font-weight: 700;
        padding-left: 10px;
      }
    }
    tbody {
      tr:hover {
        opacity: 0.8;
      }
      tr:nth-child(2n + 2) {
        td {
          background-color: darken($light-gray, 4%);
        }
      }
      td {
        padding-left: 10px;
        span {
          cursor: pointer;
        }
      }
    }
  }
  @media (max-width: 991.98px) {
    width: 100%;
  }
}
.alert {
  color: rgb(245, 92, 92);
}
</style>
