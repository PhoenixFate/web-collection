<template>
  <div class="login-container">
    <div class="login-main">
      <LoginMainLeft></LoginMainLeft>
      <LoginMainRight></LoginMainRight>
    </div>
  </div>
</template>
<script setup>
import LoginMainLeft from "~/components/login/LoginMainLeft.vue";
import LoginMainRight from "~/components/login/LoginMainRight.vue";
</script>
<style scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  background: url("/image/login/login-background.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @apply flex justify-center items-center;
}
.login-main {
  width: 60%;
  height: 60%;
  background: url("/image/login/login-main-background.png") no-repeat;
  background-size: 101% 101%;
  box-shadow: 0 16px 50px -16px #649bd6;
  @apply rounded-3xl flex;
}
</style>
