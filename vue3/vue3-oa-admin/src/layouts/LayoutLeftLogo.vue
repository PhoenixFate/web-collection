<template>
  <div class="left-logo">
    <img
      src="/image/logo.png"
      :class="{ 'img-rocket-run': rocketAnimateFlag }"
      @mouseenter="rocketRun"
    />
    <img src="/image/cloud/cloud01.png" alt="" />
    <img src="/image/cloud/cloud02.png" alt="" />
    <img src="/image/cloud/cloud03.png" alt="" />
    <img src="/image/cloud/cloud-back-01.png" alt="" />
    <img src="/image/cloud/cloud-back-03.png" alt="" />
    <img src="/image/cloud/cloud-back-02.png" alt="" />
  </div>
</template>
<script setup>
import { ref } from "vue";
const rocketAnimateFlag = ref(false);
const rocketRun = () => {
  if (!rocketAnimateFlag.value) {
    rocketAnimateFlag.value = true;
    setTimeout(() => {
      rocketAnimateFlag.value = false;
    }, 2400);
  }
};
</script>
<style lang="scss" scoped>
.left-logo {
  width: 160px;
  height: 160px;
  padding-top: 20px;
  overflow: hidden;
  @apply flex justify-center items-start relative;
  img:nth-child(1) {
    width: 80px;
    height: 80px;
    z-index: 10;
  }
  img:nth-child(2) {
    position: absolute;
    width: 32px;
    height: 13px;
    right: -2px;
    top: 10px;
  }
  img:nth-child(3) {
    position: absolute;
    bottom: 10px;
    left: 0px;
    width: 40px;
    height: 20px;
    z-index: 1;
  }
  img:nth-child(4) {
    position: absolute;
    bottom: 1px;
    right: -2px;
    width: 76px;
    height: 22px;
    z-index: 10;
  }
  img:nth-child(5) {
    position: absolute;
    top: 66px;
    left: 18px;
    width: 160px;
    height: 20px;
  }
  img:nth-child(6) {
    position: absolute;
    top: 14px;
    left: -30px;
    width: 120px;
    height: 20px;
  }
  img:nth-child(7) {
    position: absolute;
    bottom: 34px;
    width: 160px;
    height: 30px;
    left: 14px;
  }

  img.img-rocket-run {
    animation: rocketRun 2.4s;
  }
  @-webkit-keyframes rocketRun {
    from,
    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(0, -16px, 0) rotate(-45deg);
      transform: translate3d(0, -16px, 0) rotate(-45deg);
    }

    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(0, 10px, 0) rotate(-45deg);
      transform: translate3d(0, 10px, 0) rotate(-45deg);
    }
  }
  @keyframes rocketRun {
    from,
    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(0, -16px, 0) rotate(-45deg);
      transform: translate3d(0, -16px, 0) rotate(-45deg);
    }

    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(0, 10px, 0) rotate(-45deg);
      transform: translate3d(0, 10px, 0) rotate(-45deg);
    }
  }
}
</style>
