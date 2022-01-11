<template>
  <div class="loading">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style lang="scss" scoped>
.loading {
  $colors: #7ef9ff, #89cff0, #4682b4, #3b82f6;
  display: flex;
  justify-content: center;
  align-items: center;
  .dot {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 0.8em;
    border-radius: 50%;

    &::before {
      position: absolute;
      content: "";
      bottom: 0;
      right: 0;
      width: 50%;
      height: 50%;
      background: inherit;
      border-radius: inherit;
      animation: wave 2s ease-out infinite;
    }

    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        background: nth($colors, $i);

        &::before {
          animation-delay: $i * 0.2s;
        }
      }
    }
  }
}

@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
  }
  80%,
  100% {
    opacity: 0;
  }
}
</style>
