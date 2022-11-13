<template>
  <div class="login-title">
    <h2>
      <span class="text-gray">极</span>
      <span class="text-gray">客</span>
      <span class="text-golden ml-2">O</span>
      <span class="text-golden mr-2">A</span>
      <span class="text-gray">办</span>
      <span class="text-gray">公</span>
      <span class="text-gray">系</span>
      <span class="text-gray">统</span>
    </h2>
    <div class="sub-title">
      <div></div>
      <h3>统一认证中心</h3>
      <div></div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.login-title {
  text-align: center;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @apply mb-12;
}
.login-title h2 {
  font-size: 2.4rem;
  font-family: "hlb", sans-serif;
  background: #2d2d2d -webkit-linear-gradient(
      left,
      #2d2d2d,
      #bb9010 40%,
      #f1ed04 70%,
      #2d2d2d
    ) no-repeat 0 0;
  background-size: 20% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: underline;
  -webkit-animation: slideShine 12s linear infinite;
  animation: slideShine 12s linear infinite;
}
.login-title h3 {
  font-size: 1rem;
  @apply text-gray-400;
}
.sub-title {
  @apply flex justify-center items-center;
}
.sub-title div {
  height: 1px;
  width: 60px;
  @apply bg-gray-200;
}

.sub-title div:nth-child(1) {
  @apply mr-4;
}

.sub-title div:nth-child(3) {
  @apply ml-4;
}

.text-golden {
  background: linear-gradient(to right, #eccc6d, #e89906);
  /*背景被裁剪到文字*/
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 2.8rem;
  /*设置文字的填充颜色*/
  -webkit-text-fill-color: transparent;
}
.text-golden:hover {
  background: linear-gradient(to right, #bb9010, #f1ed04);
  /*背景被裁剪到文字*/
  -webkit-background-clip: text;
  background-clip: text;
  /*设置文字的填充颜色*/
  -webkit-text-fill-color: transparent;
}
.text-gray {
  @apply text-gray-800;
}
.text-gray:hover {
  background: linear-gradient(to right, #eccc6d, #e89906);
  /*背景被裁剪到文字*/
  -webkit-background-clip: text;
  background-clip: text;
  /*设置文字的填充颜色*/
  -webkit-text-fill-color: transparent;
}

@-webkit-keyframes slideShine {
  0% {
    background-position: -30% -30%;
  }
  74% {
    background-position: -30% -30%;
  }
  100% {
    background-position: 130% 130%;
  }
}

@keyframes slideShine {
  0% {
    background-position: -30% -30%;
  }
  74% {
    background-position: -30% -30%;
  }
  100% {
    background-position: 130% 130%;
  }
}
</style>
