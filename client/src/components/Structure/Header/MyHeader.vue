<template>
  <div>
    <header>
      <!-----Logo----->
      <router-link to="/" id="logo">
        <img src="@/assets/images/Logo_StayCold.png" alt="logo StayCold" />
        <span>StayCold</span>
      </router-link>

      <!-----Nav par default----->
      <nav>
        <ul id="default-nav">
          <li><router-link to="/">Acceuil </router-link></li>
          <li><router-link to="/">Baignades</router-link></li>
          <!-----Nav User----->
          <li v-if="logged" id="profil-link">
            <router-link to="/">Profil </router-link>
          </li>
        </ul>
        <!-----Nav d'authentification----->
        <ul id="auth-nav">
          <li v-if="!logged">
            <router-link to="/connexion">Connexion</router-link>
          </li>
          <li v-if="!logged">
            <router-link to="/inscription">Inscription</router-link>
          </li>
          <li v-if="logged" @click.prevent="logOut">Deconnexion</li>
        </ul>
      </nav>
      <!-----Toggle Menu Burger Mobile----->
      <div id="icon-burger">
        <IconBurger
          @click="
            ToggleBurgerMenu();
            showMobileMenu = !showMobileMenu;
          "
          id="btn-burger"
        />
      </div>
    </header>
    <!-----Mobile Nav----->
    <transition name="fade">
      <MobileNav :isDisplayed="showMobileMenu" />
    </transition>
  </div>
</template>

<script>
import IconBurger from "./IconBurger.vue";
import MobileNav from "./MobileNav.vue";
export default {
  name: "my-header",
  components: { IconBurger, MobileNav },
  data() {
    return {
      showMobileMenu: false,
      logged: false,
    };
  },
  methods: {
    ToggleBurgerMenu() {
      const burger = document.getElementById("btn-burger");
      burger.classList.toggle("opened");
      burger.setAttribute("aria-expanded", burger.classList.contains("opened"));
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style lang="scss" scoped>
/* Header __________*/
header {
  display: flex;
  align-items: center;
  padding: 20px 50px 20px 20px;
  font-weight: bold;
  border-bottom: 1px solid $gray;
  /* Logo __________*/
  #logo {
    display: flex;
    align-items: center;
    margin-right: 100px;
    font-size: 24px;
    img {
      max-width: 57px;
      margin-right: 10px;
    }
  }
  /* Nav __________*/
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* Default __________*/
    #default-nav {
      display: flex;
      li {
        margin-right: 30px;
      }
      li:hover {
        opacity: 0.8;
      }
    }
    /* User __________*/
    #userNav {
      display: flex;
      align-items: center;
    }
    /* Auth __________*/
    #auth-nav {
      display: flex;
      li {
        margin: 0px 10px;
      }
    }
  }
  /* Burger __________*/
  #icon-burger {
    display: none;
    @media (max-width: 667.98px) {
      display: block;
    }
  }
}
/* Transitions __________*/
.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
