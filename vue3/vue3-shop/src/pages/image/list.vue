<template>
  <el-container class="bg-white rounded" style="height: 100%">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate"
        >新增图片分类</el-button
      >
    </el-header>
    <el-container>
      <ImageAside ref="imageAsideRef" @change="handleAsideChange" />

      <ImageMain ref="imageMainRef" />
    </el-container>
  </el-container>
</template>
<script setup>
import { reactive, ref } from "vue";
import ImageAside from "~/components/image/ImageAside.vue";
import ImageMain from "~/components/image/ImageMain.vue";

const imageAsideRef = ref(null);
const imageMainRef = ref(null);
const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;

const handleOpenCreate = () => {
  imageAsideRef.value.handleCreate();
};

const handleAsideChange = (imageClassId) => {
  imageMainRef.value.loadData(imageClassId);
};
</script>
<style>
.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
</style>
