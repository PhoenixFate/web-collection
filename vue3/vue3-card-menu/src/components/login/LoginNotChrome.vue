<template>
  <div class="use-chrome">
    <h1>很遗憾的告诉您</h1>
    <h4>
      由于精力有限，本网站未完成除谷歌浏览器(Google
      Chrome)之外的其他浏览器的兼容性测试，故本网站只限使用谷歌浏览器(Google
      Chrome)才能正常访问。
    </h4>
  </div>
</template>
<script setup></script>
<style scoped>
.use-chrome {
  width: 80%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0.88);
  padding: 4rem 3rem;
  font-size: 2rem;
  left: 10%;
  top: 10%;
  font-weight: bold;
  backdrop-filter: blur(10px);
  text-align: center;
  @apply fixed rounded-3xl shadow-2xl shadow-gray-300;
}
.use-chrome h4 {
  font-size: 1.4rem;
  text-align: left;
  margin-top: 2rem;
  text-indent: 2em;
  font-weight: normal;
}
</style>
