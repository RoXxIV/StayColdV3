<template>
  <section id="section-advices">
    <h2>Quelques <span>conseils</span> pour bien débuter</h2>
    <ul>
      <li>
        <h3>Parlez en d'abord à votre médecin</h3>
        <p>
          L'immersion en eau froide affecte la pression artérielle, le rythme
          cardiaque et la circulation du sang, assurez-vous donc de ne pas avoir
          de problèmes cardiaques ou tout autre contre indication.
        </p>
      </li>
      <li>
        <h3>Ne vous baignez pas seul</h3>
        <p>
          Étant donné que votre raisonnement et vos émotions peuvent être
          affectés par des températures d'eaux dangereusement froides,
          assurez-vous que quelqu'un est à portée de main pour surveiller votre
          état, surtout en eau libre.
        </p>
      </li>
      <li id="warm-up">
        <div>
          <h3>Réchauffez-vous immédiatement lorsque vous sortez de l'eau</h3>
          <p>
            La température de votre corps peut continuer à baisser même après
            que vous soyez sorti de l'eau, ce qui augmente le risque
            d'hypothermie.
            <br />
            Habillez-vous en couches chaudes et sèches, en commençant par le
            haut du corps.<br />
            Mettre un bonnet, même dans l’eau limite la perte de chaleur
            corporelle.
            <br />
            Trouvez un endroit chaud pour vous asseoir ou, si vous vous en
            sentez capable, promenez-vous pour augmenter votre température
            corporelle.
            <br />
            Pendant ou après la baignade, le contrôle de la
            <router-link to="/breath"
              ><span id="breath">respiration</span></router-link
            >
            est un element clé pour ne pas subir le froid
          </p>
        </div>

        <img
          id="illustration-campfire"
          src="@/assets/images/campfire.png"
          alt="Illustration d'un feu de camp"
        />
      </li>
      <li id="eat-something">
        <div>
          <h3>Mangez un morceau</h3>
          <p>
            Buvez un thé chaud ou mangez quelque chose de sucré, car le sucre
            augmente votre température corporelle.
          </p>
        </div>
        <img
          id="illustration-tea"
          src="@/assets/images/tea.png"
          alt="Illustration d'une tasse de thé chaud"
        />
      </li>
      <li>
        <h3>Faites des immersions brèves</h3>
        <p>
          Pour bénéficier des bienfaits de l'immersion en eau froide, quelques
          minutes peuvent suffire.<br />
          Bien que vous puissiez augmenter progressivement votre tolérance au
          froid, il n'y a aucune raison thérapeutique de rester dans l'eau
          froide plus longtemps que quelques minutes.
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Advices",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
/* Section __________*/
#section-advices {
  margin-top: 50px;
  h2 {
    margin-bottom: 50px;
    text-align: center;
    line-height: 1.5em;
    font-size: 2.3em;
    span {
      color: $blue;
      font-family: $oswald;
    }
  }
  /* Liste des conseils __________*/
  ul {
    width: 90%;
    margin: auto;
    li {
      h3 {
        color: $blue;
      }
      p {
        line-height: 1.5em;
        font-family: $space-mono;
      }
      &#warm-up {
        display: flex;
        align-items: center;
        img {
          max-width: 450px;
        }
        @include media-max(991.98px) {
          flex-direction: column;
          img {
            max-width: 250px;
          }
        }
        #breath {
          color: $blue;
          text-decoration: underline;
        }
      }
      &#eat-something {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-around;
        align-items: center;
        img {
          max-width: 250px;
          margin-right: 50px;
        }
        @include media-max(991.98px) {
          flex-direction: column;
          img {
            width: 150px;
            margin: auto;
          }
        }
      }
    }
    /* Responsive liste des conseils __________*/
    @include media-max(991.98px) {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
