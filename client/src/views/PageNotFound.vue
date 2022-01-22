<template>
  <section id="section-404">
    <h1>404</h1>
    <img
      id="illustration-404"
      src="@/assets/images/404.png"
      alt="Illustration de deux fouines"
    />
    <div>
      <router-link to="/"
        ><button class="btn-blue">Retour au site</button></router-link
      >
    </div>
  </section>
</template>

<script>
export default {
  name: "Page-not-found",
  title: "Page not found",
};
</script>

<style lang="scss" scoped>
#section-404 {
  text-align: center;
  img {
    max-width: 500px;
    margin: 30px auto;
  }
}
</style>
