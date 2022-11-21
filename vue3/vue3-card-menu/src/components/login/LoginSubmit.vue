<template>
  <div class="login-button" @click="$emit('onSubmit')" v-if="!loading">
    <span style="letter-spacing: 6px">登录</span>
  </div>
  <div class="login-button login-button-loading" v-if="loading">
    <span class="mr-2">正在登录</span>
    <div class="w-40px">
      <div class="login-button-three"></div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  loading: {
    type: Boolean,
  },
});
defineEmits(["onSubmit"]);
</script>
<style scoped>
.login-button {
  width: 250px;
  height: 42px;
  border-radius: 21px;
  letter-spacing: 4px;
  user-select: none;
  @apply mt-2 text-white relative flex justify-center items-center shadow-md shadow-blue-gray-400;
  background: linear-gradient(to right, #62a8ff, #0361fe);
}
.login-button.login-button-loading {
  background: linear-gradient(45deg, #89cbe3, #6ea0f5, #0361fe);
  animation: Gradient 2s ease infinite;
  background-size: 400% 400%;
}
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-button-three {
  width: 6px;
  height: 6px;
  background-color: #fff;
  border-radius: 50%;
  animation: loader3Animation 1s linear infinite;
}

@keyframes loader3Animation {
  0% {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 15px 0 0 0 rgba(255, 255, 255, 0.67),
      30px 0 0 0 rgba(255, 255, 255, 0.33);
  }

  17% {
    background-color: rgba(255, 255, 255, 0.67);
    box-shadow: 15px 0 0 0 rgba(255, 255, 255, 1),
      30px 0 0 0 rgba(255, 255, 255, 0.67);
  }

  33% {
    background-color: rgba(255, 255, 255, 0.33);
    box-shadow: 15px 0 0 0 rgba(255, 255, 255, 0.67),
      30px 0 0 0 rgba(255, 255, 255, 1);
  }

  50% {
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 15px 0 0 0 rgba(255, 255, 255, 0.33),
      30px 0 0 0 rgba(255, 255, 255, 0.67);
  }

  67% {
    background-color: rgba(255, 255, 255, 0.33);
    box-shadow: 15px 0 0 0 rgba(255, 255, 255, 0),
      30px 0 0 0 rgba(255, 255, 255, 0.33);
  }

  83% {
    background-color: rgba(255, 255, 255, 0.67);
    box-shadow: 15px 0 0 0 rgba(255, 255, 255, 0.33),
      30px 0 0 0 rgba(255, 255, 255, 0);
  }

  100% {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 15px 0 0 0 rgba(255, 255, 255, 0.67),
      30px 0 0 0 rgba(255, 255, 255, 0.33);
  }
}
</style>
