<template>
  <div class="header-btn" v-if="!isFullscreen">
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <div class="header-btn-body" @click="toggle()">
        <el-icon>
          <FullScreen color="#555" />
        </el-icon>
      </div>
    </el-tooltip>
  </div>
  <div class="header-btn" v-if="isFullscreen">
    <el-tooltip effect="dark" content="退出全屏" placement="bottom">
      <div class="header-btn-body" @click="toggle()">
        <el-icon>
          <Aim color="#555" />
        </el-icon>
      </div>
    </el-tooltip>
  </div>
</template>
<script setup>
import { useFullscreen } from "@vueuse/core";
const {
  // 是否是全屏
  isFullscreen,
  // 切换全屏
  toggle,
} = useFullscreen();
</script>
<style scoped src="@/assets/css/layout/header/header-button.css" />
<style lang="scss" scoped></style>
