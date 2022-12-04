<template>
  <div class="user-info-dropdown">
    <div
      @mouseenter="$emit('showPersonalImage')"
      @mouseleave="$emit('hidePersonalImage')"
    >
      <img
        :src="$store.state.user.avatar"
        alt=""
        v-if="$store.state.user.avatar"
      />
      <img
        src="/image/header/avatar-default-man.png"
        v-if="!$store.state.user.avatar"
      />
    </div>
    <div
      @mouseenter="$emit('showPersonalMenu')"
      @mouseleave="$emit('hidePersonalMenu')"
    >
      <span>管理员</span>
    </div>
  </div>
</template>
<script setup>
defineEmits([
  "showPersonalImage",
  "hidePersonalImage",
  "showPersonalMenu",
  "hidePersonalMenu",
]);
</script>
<style scoped lang="scss">
.user-info-dropdown {
  width: 180px;
  height: 80px;
  @apply flex justify-start items-center;
  div {
    width: 80px;
    height: 80px;
    @apply flex justify-center items-center;
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      cursor: pointer;
      animation: breathe 16s linear infinite;
    }
    span {
      font-family: "jxht", sans-serif;
      cursor: pointer;
      @apply text-2xl;
    }
  }
  div:nth-child(2) {
    height: 40px;
  }
}

@-webkit-keyframes breathe {
  0% {
    box-shadow: 0 0 0px #fcd34d;
  }
  20% {
    box-shadow: 0 0 0px #fcd34d;
  }
  40% {
    box-shadow: 0 0 10px #fcd34d;
  }
  50% {
    box-shadow: 0 0 26px #f8f40f;
  }
  60% {
    box-shadow: 0 0 10px #fcd34d;
  }
  80% {
    box-shadow: 0 0 0px #fcd34d;
  }
  100% {
    box-shadow: 0 0 0px #fcd34d;
  }
}
@keyframes breathe {
  0% {
    box-shadow: 0 0 0px #fcd34d;
  }
  20% {
    box-shadow: 0 0 0px #fcd34d;
  }
  40% {
    box-shadow: 0 0 10px #fcd34d;
  }
  50% {
    box-shadow: 0 0 26px #f8f40f;
  }
  60% {
    box-shadow: 0 0 10px #fcd34d;
  }
  80% {
    box-shadow: 0 0 0px #fcd34d;
  }
  100% {
    box-shadow: 0 0 0px #fcd34d;
  }
}
</style>
