<template>
  <el-container class="app-main">
    <el-aside
      class="app-main-aside"
      :class="{ 'app-main-aside-collapsed': $store.state.isCollapse }"
    >
      <LayoutLeftMenu></LayoutLeftMenu>
      <Transition name="middle-toggle">
        <LayoutMiddleTop></LayoutMiddleTop>
      </Transition>
    </el-aside>
    <LayoutRightMain></LayoutRightMain>
    <Transition name="cards-toggle">
      <LayoutMiddleMenu v-if="!$store.state.isCollapse"></LayoutMiddleMenu>
    </Transition>
  </el-container>
</template>
<script setup>
import LayoutLeftMenu from "./components/LayoutLeftMenu.vue";
import LayoutRightMain from "./components/LayoutRightMain.vue";
import LayoutMiddleMenu from "./components/LayoutMiddleMenu.vue";
import LayoutMiddleTop from "./components/LayoutMiddleTop.vue";
</script>
<style>
.app-main {
  @apply bg-gray-200;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.app-main-aside {
  transition: all 1.2s;
  width: 460px;
  @apply flex pl-3 h-[100%] relative overflow-hidden;
}

.app-main-aside.app-main-aside-collapsed {
  width: 172px;
}

.cards-toggle-enter-active {
  animation: cards-out 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8) reverse;
}
.cards-toggle-leave-active {
  animation: cards-out 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}

.middle-toggle-enter-active {
  animation: lightSpeedOutLeft 1s reverse;
}
.middle-toggle-leave-active {
  animation: lightSpeedOutLeft 1s;
}

@-webkit-keyframes lightSpeedOutLeft {
  from {
    opacity: 1;
  }

  to {
    -webkit-transform: translate3d(-100%, 0, 0) skewX(-30deg);
    transform: translate3d(-100%, 0, 0) skewX(-30deg);
    opacity: 0;
  }
}
@keyframes lightSpeedOutLeft {
  from {
    opacity: 1;
  }

  to {
    -webkit-transform: translate3d(-100%, 0, 0) skewX(-30deg);
    transform: translate3d(-100%, 0, 0) skewX(-30deg);
    opacity: 0;
  }
}

@-webkit-keyframes cards-out {
  0% {
    transform: translateY(0) translateX(0);
  }

  50% {
    transform: translateY(0) translateX(-140px) scale(0.6);
    opacity: 0.6;
  }

  100% {
    transform: translateY(0) translateX(-200px) scale(0.1);
    opacity: 0;
  }
}

@keyframes cards-out {
  0% {
    transform: translateY(0) translateX(0);
  }

  50% {
    transform: translateY(0) translateX(-140px) scale(0.6);
    opacity: 0.6;
  }

  100% {
    transform: translateY(0) translateX(-200px) scale(0.1);
    opacity: 0;
  }
}
</style>
