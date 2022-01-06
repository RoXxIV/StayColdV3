<template>
  <div id="mobile-nav">
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
export default {
  name: "my-header",
};
</script>

<style lang="scss" scoped></style>
