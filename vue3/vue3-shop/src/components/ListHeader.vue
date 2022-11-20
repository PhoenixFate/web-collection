<template>
  <div class="flex items-center justify-between mb-4">
    <el-button type="primary" size="small" @click="$emit('create')">
      新增
    </el-button>
    <el-tooltip content="刷新数据" placement="bottom" effect="dark">
      <el-button type="primary" size="default" @click="$emit('refresh')" text>
        <el-icon :size="20"> <Refresh /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>
<script setup>
defineEmits(["create", "refresh"]);
</script>
<style lang="scss" scoped>


</style>
