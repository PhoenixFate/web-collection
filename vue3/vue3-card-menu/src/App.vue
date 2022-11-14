<template>
  <div id="water-copy"></div>
  <router-view></router-view>
</template>
<script setup>
import { onMounted } from "vue";
import { createWatemark } from "~/util/warterMark.js";
onMounted(() => {
  //  水印
  createWatemark({
    text: "开发环境",
    selectors: "#water-copy",
    color: "rgba(245, 142, 142,0.4)",
  });
});
</script>
<style>
@import "./assets/font/font.css";

#water-copy {
  position: fixed;
  inset: 0px;
  overflow: hidden;
  z-index: 99999999;
  width: 100%;
  height: 100vh;
  pointer-events: none;
}
</style>
