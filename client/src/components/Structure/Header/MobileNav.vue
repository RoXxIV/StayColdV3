<template>
  <div v-if="isDisplayed" id="mobile-nav">
    <ul>
      <li>
        <router-link to="/">Acceuil</router-link>
      </li>
      <li>
        <router-link to="/">Baignades</router-link>
      </li>
    </ul>
    <ul>
      <li>
        <router-link to="/">Connexion</router-link>
      </li>
      <li>
        <router-link to="/">Inscription</router-link>
      </li>
    </ul>
    <ul>
      <li>
        <router-link to="/">Profil</router-link>
      </li>
      <li>Deconnexion</li>
    </ul>
  </div>
</template>

<script>
import { boolean } from "yup/lib/locale";
export default {
  name: "my-header",
  props: {
    isDisplayed: boolean,
  },
};
</script>

<style lang="scss" scoped></style>
