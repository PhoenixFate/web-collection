<template>
  <div class="loading-main">
    <div class="criterion">
      <template v-for="(item, index) in textArray" :key="index">
        <div :class="`text text${index}`">
          {{ item }}
        </div>
        <template v-for="i in 12" :key="i">
          <div :class="`particle particle-${index}-base particle0${i-1}`"></div>
        </template>
      </template>
    </div>
    <div class="version2">
      <img src="/image/loading/version2.png" alt="" />
    </div>
    <div class="wave">
      <span style="--i: 1">L</span>
      <span style="--i: 2">o</span>
      <span style="--i: 3">a</span>
      <span style="--i: 4">d</span>
      <span style="--i: 5">i</span>
      <span style="--i: 6">n</span>
      <span style="--i: 7">g</span>
      <span style="--i: 8">.</span>
      <span style="--i: 9">.</span>
      <span style="--i: 10">.</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const textArray = ref([
  "欢",
  "迎",
  "使",
  "用",
  "O",
  "A",
  "办",
  "公",
  "系",
  "统",
]);

const router = useRouter();
//可以在此处加载用户配置，系统配置，数据库字典等内容
setTimeout(() => {
  router.push("/");
}, 6000);
</script>
<style scoped src="../assets/css/loading/welcome.css" />
<style scoped src="../assets/css/loading/wave.css" />
<style scoped lang="scss">
.loading-main {
  height: 100vh;
  width: 100vw;
  position: relative;
}
.version2 {
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -200px;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
