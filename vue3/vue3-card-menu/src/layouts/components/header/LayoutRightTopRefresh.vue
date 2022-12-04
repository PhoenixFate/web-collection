<template>
  <div class="header-btn">
    <el-tooltip effect="dark" content="刷新页面" placement="bottom">
      <div class="header-btn-body" @click="handleRefresh()">
        <el-icon class="icon-btn">
          <Refresh color="#555" />
        </el-icon>
      </div>
    </el-tooltip>
  </div>
</template>
<script setup>
const handleRefresh = () => {
  //原生js
  window.location.reload();
};
</script>
<style scoped src="@/assets/css/layout/header/header-button.css" />
<style lang="scss" scoped></style>
