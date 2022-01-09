<template>
  <section>
    <h2>Liste des utilisateurs</h2>
    <!-- Filtre ----------->
    <ul>
      <li>
        <input
          type="text"
          placeholder="Recherche par pseudo"
          v-model="filter"
        />
      </li>
      <li>
        <span> totale: {{ filteredUser.length }}</span>
      </li>
      <li>{{ message }}</li>
    </ul>
    <!-- Liste Utilisateurs ----------->
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
                <span>
                  <font-awesome-icon
                    class="font-awesome-icon"
                    :icon="['fa', 'user-edit']"
                  />{{ user.roles["name"] }}</span
                >
              </li>
            </ul>
          </td>
          <td>{{ user.createdAt }}</td>
          <td :class="user.status === 'Pending' ? 'alert' : ''">
            {{ user.status }}
          </td>
          <td>
            <span @click="comfirmDelete(user._id)"
              ><font-awesome-icon
                class="font-awesome-icon"
                :icon="['fa', 'user-times']"
              />Supprimer
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal comfirmation de suppression ----------->
    <popup-modal ref="popup">
      <div id="delete-comfirmation">
        <p>êtes vous sur ?</p>
        <div>
          <button @click="cancelDelete()" class="btn">Annuler</button>
          <button @click="deleteThisUser()" class="btn-red">Supprimer</button>
        </div>
      </div>
    </popup-modal>
  </section>
</template>

<script>
import UserServices from "../../services/user.service";
import PopupModal from "../Reusable-components/PopupModal.vue";
export default {
  name: "users-table",
  components: { PopupModal },
  data() {
    return {
      users: [],
      searchUser: null,
      filter: "",
      UserIdSelected: null,
      message: "",
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
    deleteThisUser() {
      UserServices.deleteOne(this.UserIdSelected)
        .then((response) => {
          // console.log(response.data);
          this.message = response.data.message;
        })
        .catch((err) => {
          console.log(err);
          this.message = "Une erreur est survenue";
        });
      this.$refs.popup.close();
      this.fetchUsers();
    },
    // Modal
    comfirmDelete(id) {
      this.UserIdSelected = id;
      this.$refs.popup.open();
    },
    cancelDelete() {
      this.$refs.popup.close();
      this.UserIdSelected = null;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style lang="scss" scoped>
/* section __________*/
section {
  width: 75%;
  margin: auto;
  h2 {
    color: $gray;
  }
  /* ul __________*/
  ul {
    display: flex;
    align-items: center;
    li {
      margin: 0px 10px;
      input {
        padding: 5px 10px;
        border-color: $light-gray;
      }
    }
  }
  /* table __________*/
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
          .font-awesome-icon {
            margin-right: 10px;
          }
        }
      }
    }
  }
  /* table responsive __________*/
  @media (max-width: 991.98px) {
    width: 100%;
  }
  /* modal __________*/
  #delete-comfirmation {
    text-align: center;
    padding: 30px;
    div {
      display: flex;
      button {
        margin: 0px 10px;
      }
    }
  }
}
</style>
