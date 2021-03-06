<template>
  <section>
    <h2>Liste des utilisateurs</h2>
    <!-- Filtre de recherche ----------->
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
                <span @click="askUpdateUserRole(user._id, user.roles['name'])">
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
            <span @click="askDeleteUser(user._id)"
              ><font-awesome-icon
                class="font-awesome-icon"
                :icon="['fa', 'user-times']"
              />Supprimer
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal comfirmation de suppression de l'utilisateur ----------->
    <popup-modal ref="popup">
      <div id="delete-comfirmation">
        <p>êtes vous sur ?</p>
        <div>
          <button @click="cancelDelete()" class="btn">Annuler</button>
          <button @click="deleteThisUser()" class="btn-red">Supprimer</button>
        </div>
      </div>
    </popup-modal>
    <!-- Modal de changement de role de l'utilisateur ----------->
    <popup-modal ref="rolePopup">
      <div id="update-comfirmation">
        <label for="role">Nouveau Role</label>
        <select v-model="newRole" name="role">
          <option v-for="role in roleList" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
        <div>
          <button @click="cancelRoleUpdate()" class="btn">Annuler</button>
          <button @click="updateUserRole()" class="btn">Validé</button>
        </div>
      </div>
    </popup-modal>
  </section>
</template>

<script>
import UserServices from "../../services/user.service";
import PopupModal from "../Reusable-components/PopupModal.vue";

export default {
  name: "Users-table",
  components: { PopupModal },
  data() {
    return {
      users: [],
      roleList: ["user", "moderator"],
      searchUser: null,
      filter: "",
      currentUserId: null,
      currentUserRole: null,
      newRole: null,
      message: "",
    };
  },
  computed: {
    /**
     * Filtre la liste des utilisateurs par pseudo
     * @return {string}
     */
    filteredUser() {
      return this.users.filter((user) => {
        const username = user.username.toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        return username.includes(searchTerm);
      });
    },
  },
  methods: {
    /**
     * Recupere la liste des utilisateurs
     */
    fetchUsers() {
      UserServices.getAllUsers()
        .then((response) => {
          // console.log(response.data)
          this.users = response.data;
          /**
           * Recupere le dernier rôle du tableau & Formate les dates
           */
          this.users.filter((user) => {
            user.roles = user.roles.pop();
            user.createdAt = user.createdAt
              .substring(0, 10)
              .split("-")
              .reverse()
              .join("/");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * Supprime un utilisateur et referme le modal
     */
    deleteThisUser() {
      UserServices.deleteOne(this.currentUserId)
        .then((response) => {
          this.message = response.data.message;
        })
        .catch((err) => {
          console.log(err);
          this.message = "Une erreur est survenue";
        });
      this.$refs.popup.close();
      this.currentUserId = null;
      this.fetchUsers();
    },
    /**
     * Modifie le rôle d'un utilisateur et referme le modal
     * Annule l'operation si le rôle selectioné est égal auto
     * rôle de l'utilisateur
     */
    updateUserRole() {
      const roles = ["user"];
      if (this.newRole === this.currentUserRole || this.newRole === null) {
        this.message = "Aucun changement n'a été effectué.";
        this.$refs.rolePopup.close();
        [this.currentUserId, this.currentUserRole, this.newRole] =
          Array(3).fill(null);
      } else {
        if (this.newRole === "moderator") {
          roles.push(this.newRole);
        }
        UserServices.updateUserRole(this.currentUserId, roles)
          .then((response) => {
            this.message = response.data;
            this.$refs.rolePopup.close();
            [this.currentUserId, this.currentUserRole, this.newRole] =
              Array(3).fill(null);
            this.fetchUsers();
          })
          .catch((err) => {
            console.log(err);
            this.message = "Une erreur est survenue";
          });
      }
    },
    /**
     * Ouvre le modal de suppression d'un utilisateur
     * @param {string} id
     */
    askDeleteUser(id) {
      this.currentUserId = id;
      this.$refs.popup.open();
    },
    /**
     * Annule et referme le modal
     */
    cancelDelete() {
      this.$refs.popup.close();
      this.currentUserId = null;
    },
    /**
     * Ouvre le modal de modification du rôle utilisateur
     * @param {string} id
     * @param {string} role
     */
    askUpdateUserRole(id, role) {
      this.currentUserId = id;
      this.currentUserRole = role;
      this.$refs.rolePopup.open();
    },
    /**
     * Annule et referme le modal
     */
    cancelRoleUpdate() {
      this.$refs.rolePopup.close();
      [this.currentUserId, this.currentUserRole] = Array(2).fill(null);
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style lang="scss" scoped>
h2 {
  color: var(--dark-to-light);
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
      padding-left: 10px;
      background-color: darken($gray, 6%);
      border: 1px solid darken($gray, 6%);
      color: #fff;
      text-align: left;
      font-weight: 700;
    }
  }
  tbody {
    tr:hover {
      opacity: 0.8;
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
@include media-max(991.98px) {
  width: 100%;
}
/* modal __________*/
#delete-comfirmation {
  padding: 30px;
  text-align: center;
  div {
    display: flex;
    button {
      margin: 0px 10px;
    }
  }
}
#update-comfirmation {
  padding: 50px;
  text-align: center;
  label {
    margin-right: 10px;
  }
  select {
    margin-bottom: 20px;
    background: white;
  }
  div {
    display: flex;
    justify-content: center;
    button {
      margin: 0px 10px;
    }
  }
}
</style>
