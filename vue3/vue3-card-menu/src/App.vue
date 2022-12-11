<template>
  <div id="water-copy"></div>
  <router-view></router-view>
</template>
<script setup>
import { onMounted } from "vue";
import { createWatemark } from "@/util/warterMark.js";
import Fingerprint2 from "fingerprintjs2";

onMounted(() => {
  //  水印
  createWatemark({
    text: "开发环境",
    selectors: "#water-copy",
    color: "rgba(245, 142, 142,0.4)",
  });

  Fingerprint2.get(function (components) {
    const values = components.map(function (component, index) {
      if (index === 0) {
        //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
        return component.value.replace(/\bNetType\/\w+\b/, "");
      }
      return component.value;
    });
    // 生成最终id murmur
    const murmur = Fingerprint2.x64hash128(values.join(""), 31);
    console.log("浏览器指纹码：" + murmur);
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
