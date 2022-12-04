<template>
  <div class="middle-menu-content">
    <el-menu
      v-if="$store.state.menus"
      :collapse="false"
      :collapse-transition="false"
      :default-active="defaultActive"
      :unique-opened="false"
      class="border-0 bg-transparent"
      @select="handleSelect"
    >
      <template
        v-for="(item, index) in $store.state.menus[$store.state.bigMenuIndex]
          .child"
        :key="index"
      >
        <el-sub-menu
          :index="item.name"
          v-if="item && item.child && item.child.length > 0"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span> {{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon>
              <component :is="item2.icon" />
            </el-icon>
            <span> {{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span> {{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
//默认选中当前路由
const defaultActive = computed(() => route.path);
const handleSelect = (e) => {
  router.push(e);
};
</script>
<style lang="scss">
.middle-menu-content {
  position: fixed;
  left: 200px;
  top: 200px;
  width: 290px;
  z-index: 10;
  height: calc(100% - 260px);
  border-radius: 36px;
  background-image: url("/image/middle/middle-background.png");
  background-size: 100% 100%;
  padding: 20px;
  overflow-y: auto;
  &:deep(.el-icon) {
    height: 24px;
    width: 24px;
    line-height: 24px;
    @apply text-purple-200;
    transition: all 0.4s;
  }
  &:deep(.el-icon svg) {
    height: 24px;
    width: 24px;
    @apply text-purple-200;
  }

  &:deep(.el-sub-menu__title) {
    height: 60px;
    padding: 0 0 0 20px;
    transition: all 0.4s;
    color: white;
    @apply text-xl rounded-lg;
  }
  &:deep(.el-sub-menu__title:hover) {
    padding-left: 1.6rem !important;
    @apply bg-purple-300 text-purple-500;
  }
  &:deep(.el-sub-menu__title:hover .el-icon) {
    @apply text-purple-500;
  }
  &:deep(.el-sub-menu__title:hover .el-icon svg) {
    @apply text-purple-500;
  }
  &:deep(.el-menu .el-menu--inline) {
    background-color: transparent;
    padding-left: 18px;
  }
  &:deep(.el-sub-menu .el-sub-menu__icon-arrow) {
    margin-top: -12px;
    margin-left: 0.8rem;
    font-size: 0.8rem;
    right: 6px;
  }
  &:deep(.el-sub-menu .el-sub-menu__title .el-icon:nth-child(3)) {
    margin-right: 0;
  }
  &:deep(.el-sub-menu .el-icon) {
    margin-right: 1rem;
  }
  &:deep(.el-menu-item .el-icon) {
    margin-right: 1rem;
  }
  .el-menu-item,
  .el-sub-menu {
    letter-spacing: 3px;
    font-family: "xsyt", sans-serif;
    margin: 14px auto;
    height: 60px;
    @apply rounded-lg text-xl text-purple-200;
  }

  .el-menu-item {
    transition: all 0.4s;
    padding: 0 20px;
  }

  .el-menu-item:hover {
    padding-left: 2.2rem !important;
    @apply bg-purple-300 text-purple-500;
    &:deep(.el-icon) {
      @apply text-purple-500;
    }
    &:deep(.el-icon svg) {
      @apply text-purple-500;
    }
  }

  .el-menu-item.is-active:hover {
    @apply bg-purple-400 text-purple-100;
    &:deep(.el-icon) {
      @apply text-purple-100;
    }
    &:deep(.el-icon svg) {
      @apply text-purple-100;
    }
  }
  .el-menu-item.is-active {
    animation: pulse 0.4s;
    @apply bg-purple-200 text-purple-500;
    &:deep(.el-icon) {
      @apply text-purple-500;
    }
    &:deep(.el-icon svg) {
      @apply text-purple-500;
    }
  }

  @-webkit-keyframes pulse {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }

    50% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1);
    }

    to {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes pulse {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }

    50% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1);
    }

    to {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
}
</style>
