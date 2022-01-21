<template>
  <section id="section-introduction">
    <div id="content-title">
      <h2>
        <span>Staycold</span> c’est qui ?<br />
        c’est quoi ?
      </h2>
      <div id="button-show">
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
        alt="illustration d'un requin"
        class="lightSpeedIn"
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
  name: "Introduction",
  data() {
    return {
      showText: false,
    };
  },
};
</script>
<style lang="scss" scoped>
/* Section __________*/
#section-introduction {
  display: flex;
  justify-content: center;
  width: 65%;
  margin: 50px auto;
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
      @include media-max(991.98px) {
        margin: 0;
        @include media-max(611.98px) {
          font-size: 1.6em;
        }
      }
    }
    #button-show {
      text-align: right;
      span {
        margin-right: 10px;
        text-decoration: underline;
        cursor: pointer;
      }
      .font-awesome-icon {
        margin-right: 60px;
        font-size: 2.5em;
        /* Arrow animation __________*/
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
        @include media-max(991.98px) {
          rotate: 90deg;
        }
      }
      /* Responsive button-show __________*/
      @include media-max(991.98px) {
        text-align: left;
        @include media-max(611.98px) {
          text-align: right;
        }
      }
    }
    /* Responsive content-title __________*/
    @include media-max(991.98px) {
      padding-top: 0;
    }
  }
  /* content-text + shark __________*/
  #content-text {
    position: relative;
    width: 100%;
    font-size: 1.1em;
    line-height: 1.4em;
    img {
      position: absolute;
      left: calc(50% - 125px);
      max-width: 250px;
      z-index: -1;
      /* Transition Shark __________*/
      &.sharkAnimation {
        opacity: 0.1 !important;
        @include media-max(991.98px) {
          display: none;
        }
      }
      @include media-max(991.98px) {
        position: inherit;
        left: 40%;
        @include media-max(667.98px) {
          left: 20px;
        }
      }
    }
    span {
      color: $blue;
    }
  }
  /* content-title Section __________*/
  @include media-max(991.98px) {
    flex-direction: column;
    margin-top: 0;
    @include media-max(611.98px) {
      width: 100%;
      padding: 0px 10px;
    }
  }
}
</style>
