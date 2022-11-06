<template>
  <el-container>
    <el-header class="h-[64px]">
      <LayoutHeaderVue />
    </el-header>
    <el-container class="main-container">
      <el-aside :width="$store.state.asideWidth">
        <LayoutMenuVue />
      </el-aside>
      <el-main class="main-right">
        <div class="main-body">
          <LayoutTagListVue />
          <!--  v-solt="{ Component }": 解构获得动态组件-->
          <router-view v-slot="{ Component }" class="main-view">
            <!-- vue中使用transtion标签，里面子组件的根节点必须只有一个 -->
            <transition name="fade">
              <!-- keep-alive必须包着component组件，通过max指定最大缓存的组件 -->
              <keep-alive :max="20">
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import LayoutHeaderVue from "./components/LayoutHeader.vue";
import LayoutMenuVue from "./components/LayoutMenu.vue";
import LayoutTagListVue from "./components/LayoutTagList.vue";
</script>
<style>
.el-aside {
  transition: all 0.6s;
  /* transition: max-width 0.5s ease-out; */
}
.main-container {
  height: calc(100vh - 64px);
  background-color: #f4f6f8;
}
.main-right {
  transition: all 0.6s;
  @apply p-4;
  box-shadow: 0 0 6px -4px inset #000;
  background-color: #f4f6f8;
}
.main-body {
  height: 100%;
  background-color: white;
  @apply rounded-2xl;
  box-shadow: 0 0 10px -4px #000;
}
.main-view {
  width: 100%;
  padding: 2rem;
}

/* 进入之前的动画效果 开始 */
.fade-enter-from {
  opacity: 0;
}
/* 进入之前的动画效果 结束 */
.fade-enter-to {
  opacity: 1;
}
/* 离开之前的动画效果 开始 */
.fade-leave-from {
  opacity: 1;
}
/* 离开之前的动画效果 结束 */
.fade-leave-to {
  opacity: 0;
}
/* 动画时长 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
/* 进入的动画延迟3秒 */
.fade-enter-active {
  transition-delay:0.3s;
}
</style>
