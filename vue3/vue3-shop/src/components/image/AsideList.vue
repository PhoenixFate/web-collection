<template>
  <div class="aside-list" :class="{ active: active }">
    <!-- truncate为windicss提供的，用于超出部分显示... -->
    <span class="truncate"><slot /></span>
    <el-button
      class="ml-auto px-1"
      text
      type="primary"
      size="small"
      @click="$emit('edit')"
    >
      <el-icon :size="12"><Edit /></el-icon>
    </el-button>

    <el-popconfirm
      title="你确定要删除图库分类吗"
      confirmButtonText="确认"
      cancelButtonText="取消"
      @confirm="$emit('delete')"
    >
      <template #reference>
        <el-button class="px-1" text type="primary" size="small">
          <el-icon :size="12"><Close /></el-icon>
        </el-button>
      </template>
    </el-popconfirm>
  </div>
</template>
<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["edit", "delete"]);
</script>
<style scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  /* 鼠标指上去是手的形状 */
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600;
}
.aside-list:hover {
  @apply bg-blue-50;
}
.aside-list.active {
  @apply bg-blue-100 text-blue-600;
}
</style>
