<template>
  <div class="layout-tag-list" :style="{ left: $store.state.asideWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      style="min-width: 100px"
      @tab-remove="removeTab"
      @tab-change="changeTab"
    >
      <el-tab-pane
        v-for="item in tabList"
        :closable="item.path != '/'"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
        <template #label>
          <span class="ml-[-4px]">
            <el-icon class="mr-1 ml-[-5px]" style="vertical-align: -3px">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>
<script setup>
import { useTabList } from "~/composables/useTabList.js";
const { activeTab, tabList, changeTab, removeTab, handleClose } = useTabList();
</script>
<style scoped>
.layout-tag-list {
  top: 68px;
  right: 0;
  height: 1px;
  transition: all 0.6s;
  @apply fixed flex items-center pl-4 pt-1;
}
.tag-btn {
  @apply bg-white rounded ml-auto mr-4 flex items-center justify-center;
  height: 32px;
  width: 32px;
  margin-top: -18px;
  border-radius: 50%;
  opacity: 0.7; /* 不透明度 */
  overflow: hidden; /* 溢出隐藏 */

  /* IE10、Firefox and Opera，IE9以及更早的版本不支持 */
  animation-name: breath; /* 动画名称 */
  animation-duration: 3s; /* 动画时长3秒 */
  animation-timing-function: ease-in-out; /* 动画速度曲线：以低速开始和结束 */
  animation-iteration-count: infinite; /* 播放次数：无限 */

  /* Safari and Chrome */
  -webkit-animation-name: breath; /* 动画名称 */
  -webkit-animation-duration: 5s; /* 动画时长3秒 */
  -webkit-animation-timing-function: ease-in-out; /* 动画速度曲线：以低速开始和结束 */
  -webkit-animation-iteration-count: infinite; /* 播放次数：无限 */
}

.tag-btn:hover {
  animation-name: none;
}

@keyframes breath {
  from {
    opacity: 0.7;
    background-color: rgb(219, 219, 219);
  } /* 动画开始时的不透明度 */
  50% {
    opacity: 1;
    background-color: white;
  } /* 动画50% 时的不透明度 */
  to {
    opacity: 0.7;
    background-color: rgb(219, 219, 219);
  } /* 动画结束时的不透明度 */
}

@-webkit-keyframes breath {
  from {
    opacity: 0.7;
    background-color: rgb(219, 219, 219);
  } /* 动画开始时的不透明度 */
  50% {
    opacity: 1;
    background-color: white;
  } /* 动画50% 时的不透明度 */
  to {
    opacity: 0.7;
    background-color: rgb(219, 219, 219);
  } /* 动画结束时的不透明度 */
}

:deep(.tag-btn .el-icon--right) {
  margin-left: 0;
  margin-top: 1px;
}

:deep(.el-tabs__header) {
  margin-bottom: 0;
  @apply mb-0;
}
</style>
