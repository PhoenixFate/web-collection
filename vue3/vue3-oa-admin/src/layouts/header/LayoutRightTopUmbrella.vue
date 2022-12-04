<template>
  <div class="header-btn">
    <el-tooltip effect="dark" content="折叠与展开菜单" placement="bottom">
      <div class="header-btn-body" @click="toggleMenu()">
        <div
          class="umbrella"
          :class="[
            { 'umbrella-active': !$store.state.isCollapse },
            { 'umbrella-animate': $store.state.umbrellaAnimate },
          ]"
        >
          <div class="canopy"></div>
          <div class="shaft"></div>
        </div>
      </div>
    </el-tooltip>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
const store = useStore();

const toggleMenu = () => {
  //开启伞的折叠动画
  store.commit("SET_UMBRELLA_ANIMATE", true);
  setTimeout(() => {
    //关闭伞的折叠动画
    store.commit("SET_UMBRELLA_ANIMATE", false);
  }, 1200);
  store.commit("COLLAPSE_MENU");
};
</script>
<style scoped src="@/assets/css/layout/header/umbrella.css" />
<style scoped src="@/assets/css/layout/header/header-button.css" />
<style lang="scss" scoped>
</style>
