<template>
  <section id="section-breathing">
    <!--Header-section-->
    <div id="breathing-header">
      <h1>Respiration <span>guidée</span></h1>
      <p>Répétez ce cycle 30 à 40 fois</p>
    </div>
    <!--Container-->
    <div class="container" id="container">
      <div class="circle"></div>
      <p id="text">{{ text }}</p>
      <div :class="isActivated ? 'pointer-container' : ''">
        <span :class="isActivated ? 'pointer' : ''"></span>
      </div>
      <div class="gradient-circle"></div>
    </div>
    <!--Launcher-->
    <div id="launcher">
      <button @click="startAndStop()" class="btn-blue">
        {{ isActivated ? "Arreter" : "Commencer" }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Breath",
  title: "Respiration relaxante",
  data() {
    return {
      text: "",
      totalTime: 12000,
      breatheTime: 6000,
      holdTime: 0,
      container: null,
      isActivated: false,
      breathId: undefined,
      animationId: undefined,
    };
  },
  methods: {
    /**
     * Anime le cycle de respiration
     */
    breathAnimation() {
      this.text = "Inspire";
      this.container.className = "container grow";
      this.animationId = setTimeout(() => {
        setTimeout(() => {
          this.text = "Expire";
          this.container.className = "container shrink";
        }, this.holdTime);
      }, this.breatheTime);
    },
    /**
     * Demarre ou arrete le cycle de respiration
     */
    startAndStop() {
      this.isActivated = !this.isActivated;
      if (this.isActivated) {
        this.breathAnimation();
        this.breathId = setInterval(this.breathAnimation, this.totalTime);
      } else {
        clearInterval(this.breathId);
        clearInterval(this.animationId);
        this.container.className = "container";
        this.text = "";
      }
    },
  },
  mounted() {
    this.container = document.getElementById("container");
  },
  beforeUnmount() {
    clearInterval(this.breathId);
    clearInterval(this.animationId);
  },
};
</script>

<style lang="scss" scoped>
/* section __________*/
#section-breathing {
  display: flex;
  flex-direction: column;
  min-height: 75vh;
  padding: 30px 0px;
  #breathing-header {
    h1 span {
      color: $blue;
      font-family: $oswald;
    }
    p {
      text-align: center;
    }
  }

  /* container __________*/
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 300px;
    width: 300px;
    position: relative;
    transform: scale(1);
    .circle {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-image: url(../assets/images/camp.png);
      background-size: cover;
      background-repeat: no-repeat;
      z-index: -1;
    }
    p {
      color: white;
    }
    .gradient-circle {
      position: absolute;
      top: -10px;
      left: -10px;
      height: 320px;
      width: 320px;
      border-radius: 50%;
      background: conic-gradient(
        #3b82f6 0%,
        #307cf6 50%,
        #2b5eb1 50%,
        #122749 100%
      );
      z-index: -2;
    }
  }
  #launcher {
    text-align: center;
  }
  /* Section Responsive __________*/
  @include media-max(611.98px) {
    min-height: 70vh;
    width: 100%;
  }
}
/* Pointer + animation __________*/
.pointer {
  display: block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: var(--dark-to-light);
}
.pointer-container {
  position: absolute;
  top: -40px;
  left: 140px;
  width: 20px;
  height: 190px;
  animation: rotate 12s linear forwards infinite;
  transform-origin: bottom center;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
/* Circle grow up __________*/
.container.grow {
  animation: grow 6s linear forwards;
}

@keyframes grow {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.2);
  }
}
/* Circle shrink __________*/
.container.shrink {
  animation: shrink 6s linear forwards;
}

@keyframes shrink {
  from {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
}
</style>
