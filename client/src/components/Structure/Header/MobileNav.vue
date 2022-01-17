<template>
  <div id="mobile-nav">
    <!-- Nav default ----------->
    <ul>
      <li
        @click="$emit('toggleTheme')"
        aria-label="Toggle themes"
        id="toggle-theme-mobile"
      >
        <span v-if="this.theme == 'darkMode'">Theme 🌞</span>
        <span v-else>Theme 🌚</span>
      </li>
      <li @click="$emit('closeMenu')">
        <router-link to="/">Acceuil</router-link>
      </li>
      <li @click="$emit('closeMenu')">
        <router-link to="/all-baths">Baignades</router-link>
      </li>
    </ul>
    <!-- Nav auth ----------->
    <ul>
      <li v-if="!propsLoggedIn" @click="$emit('closeMenu')">
        <router-link to="/login">Connexion</router-link>
      </li>
      <li v-if="!propsLoggedIn" @click="$emit('closeMenu')">
        <router-link to="/register">Inscription</router-link>
      </li>
    </ul>
    <!-- Nav user ----------->
    <ul>
      <li v-if="propsLoggedIn" @click="$emit('closeMenu')">
        <router-link to="/">Profil</router-link>
      </li>
      <li
        v-if="propsLoggedIn"
        @click="$emit('closeMenu')"
        @click.prevent="$emit('logout')"
        id="mobile-logout"
      >
        Deconnexion
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Mobile-nav",
  props: {
    propsLoggedIn: Boolean,
    theme: String,
  },
};
</script>

<style lang="scss" scoped>
#mobile-nav {
  position: absolute;
  width: 100%;
  font-size: 1.3em;
  z-index: 1;
  ul {
    margin: 0;
    li {
      background: var(--light-to-dark);
      padding: 15px 0px 15px 15px;
      border-bottom: 1px solid var(--dark-to-light);
    }
    #toggle-theme-mobile {
      cursor: pointer;
    }
    #mobile-logout {
      cursor: pointer;
    }
  }
}
</style>
