<template>
  <div class="login-type">
    <div
      :class="{ 'login-type-active1': loginType == 'username' }"
      @click="$emit('chooseLoginType', 'username')"
    >
      <span>账号</span>
    </div>
    <div
      :class="{ 'login-type-active2': loginType == 'mobile' }"
      @click="$emit('chooseLoginType', 'mobile')"
    >
      <span>手机号</span>
    </div>
    <label class="glider"></label>
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
<style scoped lang="scss">
.login-type {
  width: 250px;
  height: 42px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 2px;
  box-shadow: 0 0 1px 0 rgba(60, 107, 196, 0.15),
    0 4px 12px rgba(52, 109, 214, 0.15);
  border-radius: 21px;
  @apply flex justify-center items-center mb-8 text-gray-300 px-2 relative;
}

.login-type-active1,
.login-type-active2 {
  color: #1356d1;
  @apply text-light-blue-700;
  animation: pulse 0.4s;
}

.login-type div {
  height: 30px;
  width: 50%;
  z-index: 2;
  @apply flex justify-center items-center;
}

.glider {
  position: absolute;
  display: flex;
  height: 34px;
  left: 6px;
  width: 119px;
  background-color: #e9eff7;
  z-index: 1;
  border-radius: 17px;
  transition: 0.25s ease-out;
}

.login-type-active1 ~ .glider {
  transform: translateX(0);
}
.login-type-active2 ~ .glider {
  transform: translateX(100%);
}

@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
