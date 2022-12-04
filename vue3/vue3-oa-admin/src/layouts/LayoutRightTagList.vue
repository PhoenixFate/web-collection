<template>
  <div class="tag-list">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      @tab-remove="removeTab"
      style="min-width: 100px"
      @tab-change="changeTab"
    >
      <el-tab-pane
        :closable="item.path != '/'"
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
        <template #label>
          <span>
            <el-icon class="mr-2" style="vertical-align: -2px">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <span class="tag-btn">
      <el-dropdown @command="handleClose" @visible-change="visibleChange">
        <span
          class="vab-tabs-more"
          :class="{ 'vab-tabs-more-active': dropdownVisible }"
        >
          <span class="vab-tabs-more-icon">
            <i class="box box-t"></i>
            <i class="box box-b"></i>
          </span>
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
import { useTabList } from "@/composables/useTabList.js";
const {
  dropdownVisible,
  activeTab,
  tabList,
  changeTab,
  removeTab,
  handleClose,
  visibleChange,
} = useTabList();
</script>
<style scoped>
.tag-list {
  top: 144px;
  right: 0;
  height: 44px;
  width: 100%;
  --el-font-size-base:1rem;
  @apply absolute flex items-center pr-3;
}
.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center px-3;
  height: 40px;
}
:deep(.el-tabs__header) {
  border: 0 !important;
  @apply mb-0;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  height: 40px;
  line-height: 40px;
  @apply bg-white mx-1 rounded text-warm-gray-500;
}
:deep(.el-tabs__item:hover){
  @apply text-purple-300;
}
:deep(.el-tabs__item.is-active:hover){
  @apply text-purple-300;
}
:deep(.el-tabs__item.is-active){
  @apply text-purple-500;
}
:deep(.el-tabs__nav-wrap.is-scrollable) {
  padding: 0 40px;
}
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 40px;
  height: 40px;
  width: 40px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}

.vab-tabs-more {
  position: relative;
  box-sizing: border-box;
  display: block;
  text-align: left;
}

.vab-tabs-more-icon {
  display: inline-block;
  color: #9a9a9a;
  cursor: pointer;
  transition: transform 0.3s ease-out;
}
.vab-tabs-more-icon .box {
  position: relative;
  display: block;
  width: 14px;
  height: 8px;
}

.vab-tabs-more-icon .box-t:before {
  transition: transform 0.3s ease-out 0.3s;
}

.vab-tabs-more-active:after,
.vab-tabs-more:hover:after {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0;
  content: "";
}

.vab-tabs-more-active .vab-tabs-more-icon,
.vab-tabs-more:hover .vab-tabs-more-icon {
  transform: rotate(90deg);
}

.vab-tabs-more-active .vab-tabs-more-icon .box-t:before,
.vab-tabs-more:hover .vab-tabs-more-icon .box-t:before {
  transform: rotate(45deg);
}

.vab-tabs-more-active .vab-tabs-more-icon .box:after,
.vab-tabs-more-active .vab-tabs-more-icon .box:before,
.vab-tabs-more:hover .vab-tabs-more-icon .box:after,
.vab-tabs-more:hover .vab-tabs-more-icon .box:before {
  background: #c1a7f0 !important;
}

.vab-tabs-more-icon .box:before {
  position: absolute;
  top: 2px;
  left: 0;
  width: 6px;
  height: 6px;
  content: "";
  background: #9a9a9a;
}
.vab-tabs-more-icon .box:after {
  position: absolute;
  top: 2px;
  left: 8px;
  width: 6px;
  height: 6px;
  content: "";
  background: #9a9a9a;
}
</style>
