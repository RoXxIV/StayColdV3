<template>
  <section>
    <div id="content-title">
      <h2>
        <span>Staycold</span> c’est qui ?<br />
        c’est quoi ?
      </h2>
      <div>
        <span
          @click="
            {
              showText = !showText;
            }
          "
          >Voir
          <font-awesome-icon
            class="font-awesome-icon rotate"
            :class="{ down: showText }"
            :icon="['fas', 'arrow-circle-right']"
        /></span>
      </div>
    </div>
    <div id="content-text">
      <img
        src="@/assets/images/shark.png"
        alt=""
        class="shark lightSpeedIn"
        :class="{ sharkAnimation: showText }"
      />
      <transition name="fade">
        <div v-show="showText">
          <p>
            l’origine de ce projet remonte au début de l’année 2021 quand deux
            potes ont décidé de sortir de leur zone de confort pour se baigner
            dans un lac en plein mois de février ! 🙄
          </p>
          <p>
            Cette expérience chaleureuse 🤭 nous a très vite donné envie d’y
            retourner une deuxième fois puis une troisième…
          </p>
          <p>C’est devenu à présent notre routine du dimanche matin .</p>

          <p>
            <span>StayCold</span> est un outil nous permettant de garder une
            trace de ces baignades, de comprendre les facteurs qui pourraient
            influencer les sensations lors de nos immersions en haut froide dans
            le but de les optimiser.
          </p>
        </div></transition
      >
    </div>
  </section>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      showText: false,
    };
  },
};
</script>
<style lang="scss" scoped>
/* Section __________*/
section {
  width: 65%;
  margin: 50px auto;
  display: flex;
  /* content-title __________*/
  #content-title {
    min-width: 40%;
    padding-top: 30px;
    h2 {
      line-height: 1.5em;
      font-size: 2.3em;
      span {
        color: $blue;
      }
      @media (max-width: 991.98px) {
        margin: 0;
      }
      @media (max-width: 611.98px) {
        font-size: 1.6em;
      }
    }
    div {
      text-align: right;
      span {
        margin-right: 10px;
        text-decoration: underline;
        cursor: pointer;
      }
      .font-awesome-icon {
        font-size: 2.5em;
        margin-right: 60px;

        @media (max-width: 991.98px) {
          rotate: 90deg;
        }
      }
      @media (max-width: 991.98px) {
        text-align: left;
      }
      @media (max-width: 611.98px) {
        text-align: right;
      }
    }
    /* content-title media-queries __________*/
    @media (max-width: 991.98px) {
      padding-top: 0;
    }
  }

  #content-text {
    font-size: 1.1em;
    line-height: 1.4em;
    img {
      max-width: 250px;
      margin: auto;
      &.shark {
        position: absolute;
        left: 60%;
        z-index: -1;
        @media (max-width: 991.98px) {
          left: calc(50% - 125px);
        }
      }
    }
    span {
      color: $blue;
    }
  }
  /* content-title Section __________*/
  @media (max-width: 991.98px) {
    flex-direction: column;
    margin-top: 0;
  }
  @media (max-width: 611.98px) {
    width: 100%;
    padding: 0px 10px;
  }
}
/* Transition Content-text __________*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* Transition Shark __________*/
.sharkAnimation {
  opacity: 0.1 !important;
}

.lightSpeedIn {
  -webkit-animation-name: lightSpeedIn;
  animation-name: lightSpeedIn;
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes lightSpeedIn {
  0% {
    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);
    transform: translate3d(100%, 0, 0) skewX(-30deg);
    opacity: 0;
  }
  60% {
    -webkit-transform: skewX(20deg);
    transform: skewX(20deg);
    opacity: 1;
  }
  80% {
    -webkit-transform: skewX(-5deg);
    transform: skewX(-5deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: none;
    transform: none;
    opacity: 1;
  }
}
@keyframes lightSpeedIn {
  0% {
    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);
    transform: translate3d(100%, 0, 0) skewX(-30deg);
    opacity: 0;
  }
  60% {
    -webkit-transform: skewX(20deg);
    transform: skewX(20deg);
    opacity: 1;
  }
  80% {
    -webkit-transform: skewX(-5deg);
    transform: skewX(-5deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: none;
    transform: none;
    opacity: 1;
  }
}

.rotate {
  -moz-transition: all 0.4s linear;
  -webkit-transition: all 0.4s linear;
  transition: all 0.4s linear;
}
.rotate.down {
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
</style>
