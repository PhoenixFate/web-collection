<template>
  <div class="main-right">
    <LayoutRightTop></LayoutRightTop>
    <LayoutRightTagList></LayoutRightTagList>
  </div>
</template>
<script setup>
import LayoutRightTop from "./LayoutRightTop.vue";
import LayoutRightTagList from "./LayoutRightTagList.vue";
</script>
<style lang="scss" scoped>
.main-right {
  flex: 1;
  height: 100%;
  @apply relative;
}
</style>
