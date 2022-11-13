<template>
  <div class="login-type">
    <div
      :class="{ 'login-type-active': loginType == 'username' }"
      @click="$emit('chooseLoginType','username')"
    >
      账号
    </div>
    <div></div>
    <div
      :class="{ 'login-type-active': loginType == 'mobile' }"
      @click="$emit('chooseLoginType','mobile')"
    >
      手机号
    </div>
  </div>
</template>
<script setup>
defineProps({
  loginType: {
    type: String,
  },
});
defineEmits(["chooseLoginType"]);
</script>
<style scoped>
.login-type {
  height: 30px;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 2px;
  margin-left: 26px;
  @apply flex justify-center items-center mb-4 text-gray-300;
}

.login-type-active {
  @apply text-blue-400;
}

.login-type div {
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.login-type div:nth-child(2) {
  height: 16px;
  width: 1px;
  @apply bg-gray-300;
}

.login-type div:nth-child(1),
.login-type div:nth-child(3) {
  @apply px-6;
}
</style>
