<template>
  <div id="mobile-nav">
    <ul>
      <li @click="$emit('closeMenu')">
        <router-link to="/">Acceuil</router-link>
      </li>
      <li @click="$emit('closeMenu')">
        <router-link to="/">Baignades</router-link>
      </li>
    </ul>
    <ul>
      <li v-if="!propsLoggedIn" @click="$emit('closeMenu')">
        <router-link to="/connexion">Connexion</router-link>
      </li>
      <li v-if="!propsLoggedIn" @click="$emit('closeMenu')">
        <router-link to="/inscription">Inscription</router-link>
      </li>
    </ul>
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
  name: "my-header",
  props: {
    propsLoggedIn: Boolean,
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
      background: $white;
      padding: 10px 0px 10px 15px;
    }
    #mobile-logout {
      cursor: pointer;
    }
  }
}
</style>
