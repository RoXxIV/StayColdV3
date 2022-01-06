<template>
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
        <li id="profil-link">
          <router-link to="/">Profil </router-link>
        </li>
      </ul>
      <!-----Nav d'authentification----->
      <ul id="auth-nav">
        <li>
          <router-link to="/login">Connexion</router-link>
        </li>
        <li>Deconnexion</li>
      </ul>
    </nav>
    <!-----Toggle Menu Burger Mobile----->
    <IconBurger />

    <!-----Mobile Nav----->
    <transition name="fade">
      <MobileNav />
    </transition>
  </header>
</template>

<script>
import IconBurger from "./IconeBurger.vue";
import MobileNav from "./MobileNav.vue";
export default {
  name: "my-header",
  components: { IconBurger, MobileNav },
};
</script>

<style lang="scss" scoped></style>
