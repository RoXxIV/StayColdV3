<template>
  <section>
    <h1>Details de la <span>Baignade</span></h1>
    <!--Illustration-->
    <img
      id="illustration"
      class="fadeIn"
      src="@/assets/images/bath-details.png"
      alt="illustration d'un bonhomme avec une loupe"
    />
    <div id="border">
      <BathCardDetails :bath="currentBath" />
      <!--Si proprietaire de la baignade-->
      <div v-if="isOwner">
        <div id="commentary">
          <span
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'pencil-alt']"
            />
            Commentaires</span
          >
          <p>
            {{
              currentBath.commentary
                ? currentBath.commentary
                : "Aucun commantaire"
            }}
          </p>
        </div>
        <div id="action">
          <router-link :to="`/edit-bath/${currentBath._id}`"
            ><span class="btn-blue">Modifier</span></router-link
          >
          <span @click="comfirmDelete()" class="btn-red">Supprimer</span>
        </div>
        <!-- Modal comfirmation de suppression de la baignade ----------->
        <popup-modal ref="popup">
          <div id="delete-comfirmation">
            <p>Cette action est irréversible</p>
            <img
              id="illustration-bin"
              src="@/assets/images/Deleted.png"
              alt="illustration d'une poubelle"
            />
            <p>êtes vous sur ?</p>
            <div>
              <button @click="cancelDelete()" class="btn-blue">Annuler</button>
              <button @click="deleteOneBath(currentBath._id)" class="btn-red">
                Supprimer
              </button>
            </div>
          </div>
        </popup-modal>
      </div>
    </div>
    <div id="return">
      <router-link to="/all-baths">Retour à la liste</router-link>
    </div>
  </section>
</template>

<script>
import BathDataServices from "../services/bathDataServices";
import RenderBathData from "../helper/RenderBathData";
import BathCardDetails from "../components/Baths/BathCardDetails.vue";
import PopupModal from "../components/Reusable-components/PopupModal.vue";
import bathDataServices from "../services/bathDataServices";
export default {
  name: "Bath-details",
  title: "Details de la baignade",
  components: { BathCardDetails, PopupModal },
  data() {
    return {
      currentBath: {},
      isOwner: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    /**
     * Recupere et stock la baignade.
     * Redigige vers la page 404 si aucune baignade est trouvé.
     * Verifie également si l'utilisateur est proprietaire de la baignade.
     * @param {string} id
     */
    fetchOneBath(id) {
      BathDataServices.getOne(id)
        .then((response) => {
          console.log(response);
          response.data.createdAt = RenderBathData.editDateFormat(
            response.data.createdAt
          );
          if (
            this.currentUser &&
            this.currentUser.id === response.data.author._id
          ) {
            this.isOwner = true;
          }
          this.currentBath = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$router.push("/not-found");
        });
    },
    /**
     * Supprime la baignade
     * @param {string} id
     */
    deleteOneBath(id) {
      bathDataServices
        .deleteOne(id)
        .then((response) => {
          console.log(response);
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error);
          this.$router.push("/not-found");
        });
    },
    /**
     * Ouverture du modal
     */
    comfirmDelete() {
      this.$refs.popup.open();
    },
    /**
     * Fermeture du modal
     */
    cancelDelete() {
      this.$refs.popup.close();
    },
  },
  /**
   * A la creation du composant, utilise le parametre url bathId pour retrouver la baignade.
   * Redirige vers la page 404 si le parametre n'est pas present
   */
  created() {
    this.$route.params.bathId
      ? this.fetchOneBath(this.$route.params.bathId)
      : this.$router.push("/not-found");
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 0px;
  span {
    color: $blue;
  }
}
#illustration {
  display: block;
  max-width: 100px;
  margin: 0px auto;
}
#border {
  width: 60%;
  margin: auto;
  padding: 50px 0px;
  border: 2px solid var(--light-gray-to-less);
  border-radius: 5px;
  #commentary {
    width: 75%;
    margin: auto;
    text-align: center;
    span {
      font-size: 1.2em;
    }
    p {
      line-height: 1.3em;
    }
    @include media-max(667.98px) {
      width: 90%;
    }
  }
  /* Editer / Supprimer __________*/
  #action {
    margin-top: 50px;
    text-align: center;
    span {
      margin: 0px 10px;
    }
  }
  #delete-comfirmation {
    padding: 30px;
    text-align: center;
    #illustration-bin {
      max-width: 150px;
    }
    button {
      margin: 0px 10px;
    }
  }
  /* Responsive border __________*/
  @include media-max(991.98px) {
    width: 100%;
  }
}
/* Return link __________*/
#return {
  margin: 40px 0px;
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
  font-size: 1.1em;
}
</style>
