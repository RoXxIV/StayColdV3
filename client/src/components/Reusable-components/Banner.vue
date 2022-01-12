<template>
  <h1>
    Boost your <span class="text-blue">{{ typeValue }}</span>
    <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
  </h1>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      typeValue: "",
      typeStatus: false,
      typeArray: [
        "cardiovascular system",
        "metabolism",
        "mood",
        "attention",
        "immune system",
        "tolerance to the cold",
      ],
      typingSpeed: 100,
      erasingSpeed: 50,
      newTextDelay: 1000,
      typeArrayIndex: 0,
      charIndex: 0,
    };
  },
  methods: {
    typeText() {
      if (this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(
          this.charIndex
        );
        this.charIndex += 1;
        setTimeout(this.typeText, this.typingSpeed);
      } else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.typeArray[this.typeArrayIndex].substring(
          0,
          this.charIndex - 1
        );
        this.charIndex -= 1;
        setTimeout(this.eraseText, this.erasingSpeed);
      } else {
        this.typeStatus = false;
        this.typeArrayIndex += 1;
        if (this.typeArrayIndex >= this.typeArray.length)
          this.typeArrayIndex = 0;
        setTimeout(this.typeText, this.typingSpeed + 1000);
      }
    },
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 1.8em;
  color: var(--dark-to-light);
  text-align: center;
  .text-blue {
    color: $blue;
  }
  .cursor {
    display: inline-block;
    margin-left: 3px;
    width: 3px;
    background-color: var(--dark-to-light);
    animation: cursorBlink 1s infinite;
    &.typing {
      animation: none;
    }
  }
  @keyframes cursorBlink {
    49% {
      background-color: var(--dark-to-light);
    }
    50% {
      background-color: transparent;
    }
    99% {
      background-color: transparent;
    }
  }
}
</style>
