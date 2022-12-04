<template>
  <el-container class="app-main">
    <el-aside
      class="app-main-aside"
      :class="{ 'app-main-aside-collapsed': $store.state.isCollapse }"
    >
      <div class="left-menu">
        <LayoutLeftLogo></LayoutLeftLogo>
        <LayoutLeftMenu></LayoutLeftMenu>
      </div>
      <div class="middle-menu">
        <Transition name="top-title-hide">
          <LayoutMiddleTop v-if="!$store.state.isCollapse"></LayoutMiddleTop>
        </Transition>
        <Transition name="cards-toggle">
          <LayoutMiddleMenu v-if="!$store.state.isCollapse"></LayoutMiddleMenu>
        </Transition>
      </div>
    </el-aside>
    <LayoutRight> </LayoutRight>
  </el-container>
</template>
<script setup>
import LayoutMiddleTop from "./LayoutMiddleTop.vue";
import LayoutLeftLogo from "./LayoutLeftLogo.vue";
import LayoutRight from "./layoutRight.vue";
import LayoutMiddleMenu from "./LayoutMiddleMenu.vue";
import LayoutLeftMenu from "./LayoutLeftMenu.vue";
</script>
<style lang="scss" scoped>
.app-main {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: var(--background-main-color);
  .app-main-aside {
    transition: all 1.2s;
    padding-left: 1rem;
    width: 500px;
    @apply flex h-[100%] relative overflow-hidden;

    .left-menu {
      width: 160px;
      z-index: 1;
      background-color: #fff;
    }
    .middle-menu {
      width: 300px;
      margin-left: 20px;
      height: 100%;
      @apply relative;
    }
  }

  .app-main-aside-collapsed {
    width: 214px;
  }

  .cards-toggle-enter-active {
    animation: cards-out 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8) reverse;
  }
  .cards-toggle-leave-active {
    animation: cards-out 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8);
  }

  .top-title-hide-enter-active {
    animation: title-hide 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) reverse;
  }

  .top-title-hide-leave-active {
    animation: title-hide 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes title-hide {
    0% {
      transform: translateY(0) translateX(0);
    }

    100% {
      transform: translateY(-300px) translateX(0);
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
}
</style>
