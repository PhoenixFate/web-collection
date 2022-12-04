<template>
  <div class="left-right" v-show="!$store.state.isCollapse">
    <div class="middle-logo">
      <div class="bounce">
        <span class="letter text-gray1">极</span>
        <span class="letter text-gray1 mr-2">客</span>
        <span class="letter text-golden">O</span>
        <span class="letter mr-2 text-golden">A</span>
        <span class="letter text-gray">办</span>
        <span class="letter text-gray">公</span>
        <span class="letter text-gray">中</span>
        <span class="letter text-gray">心</span>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.left-right {
  width: calc(460px - 160px - 0.75rem);
  left: calc(160px + 0.75rem);
  bottom: 0;
  @apply h-[100%] relative absolute;
}
.middle-logo {
  width: 100%;
  height: 140px;
  box-shadow: 3px 3px 3px rgb(209, 213, 209);
  @apply absolute left-0 right-0 top-3 bg-white pb-12 shadow-cool-gray-300;
}
.bounce {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  letter-spacing: 1px;
  white-space: nowrap;
  padding-left: 8px;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ and Edge */
  user-select: none; /* Standard syntax */
}

.letter {
  animation: bounce 20s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
  display: inline-block;
  transform: translate3d(0, 0, 0);
  font: normal 600 2rem "Varela Round", sans-serif;
  font-family: "hlb", sans-serif;
}

.letter:nth-child(1) {
  animation-delay: 0s;
}

.letter:nth-child(2) {
  animation-delay: 0.2s;
}

.letter:nth-child(3) {
  animation-delay: 0.4s;
}

.letter:nth-child(4) {
  animation-delay: 0.6s;
}

.letter:nth-child(5) {
  animation-delay: 0.8s;
}

.letter:nth-child(6) {
  animation-delay: 1s;
}

.letter:nth-child(7) {
  animation-delay: 1.2s;
}

.letter:nth-child(8) {
  animation-delay: 1.4s;
}

.text-golden {
  /* background: linear-gradient(to right, #edc69e, #f9ad0b); */
  background: linear-gradient(to right, #eccc6d, #e89906);
  /*背景被裁剪到文字*/
  -webkit-background-clip: text;
  background-clip: text;
  /*设置文字的填充颜色*/
  -webkit-text-fill-color: transparent;
}
.text-golden:hover {
  /* background: linear-gradient(to right, #edc69e, #f9ad0b); */
  background: linear-gradient(to right, #bb9010, #f1ed04);
  /*背景被裁剪到文字*/
  -webkit-background-clip: text;
  background-clip: text;
  /*设置文字的填充颜色*/
  -webkit-text-fill-color: transparent;
}
.text-gray1 {
  background: linear-gradient(45deg, #f6a46d 0%, #e62d6b 100%);
  /*背景被裁剪到文字*/
  -webkit-background-clip: text;
  background-clip: text;
  /*设置文字的填充颜色*/
  -webkit-text-fill-color: transparent;
}

.text-gray1:hover {
  /* background: linear-gradient(to right, #edc69e, #f9ad0b); */
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
  /* background: linear-gradient(to right, #edc69e, #f9ad0b); */
  background: linear-gradient(to right, #eccc6d, #e89906);
  /*背景被裁剪到文字*/
  -webkit-background-clip: text;
  background-clip: text;
  /*设置文字的填充颜色*/
  -webkit-text-fill-color: transparent;
}

@-webkit-keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
  }

  98% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(0, -1em, 0);
  }
}
@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
  }

  98% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(0, -1em, 0);
  }
}
</style>
