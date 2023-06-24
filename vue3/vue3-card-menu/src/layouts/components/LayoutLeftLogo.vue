<template>
  <div class="left-logo">
    <img
      src="/logo.png"
      :class="{ 'img-rocket-run': rocketAnimateFlag }"
      alt=""
      @mouseenter="rocketRun"
    />
  </div>
</template>
<script setup>
import { ref,onMounted } from "vue";
const rocketAnimateFlag = ref(false);
const rocketRun = () => {
  if (!rocketAnimateFlag.value) {
    rocketAnimateFlag.value = true;
    setTimeout(() => {
      rocketAnimateFlag.value = false;
    }, 2400);
  }
};
onMounted(()=>{
  rocketAnimateFlag.value=true;
  setTimeout(() => {
      rocketAnimateFlag.value = false;
    }, 4000);
})
</script>
<style scoped lang="scss">
.left-logo {
  width: 144px;
  height: 140px;
  @apply bg-white rounded-l-3xl absolute right-0 top-3 flex justify-center items-center;
}
.left-logo img {
  width: 80px;
  height: 80px;
}
.left-logo img.img-rocket-run {
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
</style>
