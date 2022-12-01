<template>
  <el-main class="p-0 relative">
    <div class="right-header">
      <LayoutRightHeader></LayoutRightHeader>
      <LayoutTagList></LayoutTagList>
    </div>
    <div class="right-body">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <keep-alive :max="20">
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </el-main>
</template>
<script setup>
import LayoutRightHeader from "@/layouts/components/LayoutRightHeader.vue";
import LayoutTagList from "@/layouts/components/LayoutTagList.vue";
</script>
<style scoped lang="scss">
.right-header {
  height: 140px;
  width: calc(100% - 0.75rem);
  @apply absolute right-3 top-3 bg-white rounded-r-3xl shadow-md shadow-cool-gray-300;
}

.right-body {
  height: calc(calc(100% - 140px) - 0.75rem);
  width: 100%;
  top: calc(140px + 0.75rem);
  @apply absolute left-0 p-3 pt-5;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar-thumb {
    display: none;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
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
  transition-delay: 0.3s;
}
</style>
