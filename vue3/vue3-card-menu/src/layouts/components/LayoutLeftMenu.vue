<template>
  <div class="left-main">
    <LayoutLeftLogo></LayoutLeftLogo>
    <div class="left-menu">
      <div class="left-menu-top-cover"></div>
      <div class="left-menu-content" ref="leftMenuContent">
        <div class="h-[30px]"></div>
        <div
          class="left-menu-item"
          v-for="(item, index) in $store.state.menus"
          :class="[
            { 'left-menu-item-active': index == $store.state.bigMenuIndex },
            {
              'left-menu-item-temp':
                $store.state.leftMenuAnimationFlag &&
                index == $store.state.bigMenuLastIndex,
            },
          ]"
          :key="index"
          @click="chooseBigMenu(index)"
        >
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span class="mt-1">{{ item.name }}</span>
          <div></div>
        </div>
        <div class="h-[30px]"></div>
      </div>
      <div class="left-menu-bottom-cover"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { nextTick } from "vue";
import { useStore } from "vuex";
import LayoutLeftLogo from "./LayoutLeftLogo.vue";
import { useMenu } from "@/composables/useMenu.js";
const { chooseBigMenu } = useMenu();

const store = useStore();

const leftMenuContent = ref();
onMounted(() => {
  nextTick(() => {
    leftMenuContent.value.scrollTop =
      (store.state.bigMenuIndex - 2 < 0 ? 0 : store.state.bigMenuIndex - 2) *
      60;
  });
});
</script>
<style scoped lang="scss">
.left-main {
  width: 160px;
  height: 100%;
  @apply bg-blue-gray-800  rounded-3xl relative;
}

.left-menu {
  height: calc(100vh - 240px);
  width: 144px;
  z-index: 30;
  top: 180px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @apply absolute right-0 overflow-hidden;

  .left-menu-top-cover {
    width: 140px;
    height: 36px;
    top: -4px;
    left: 0;
    z-index: 10;
    background-image: linear-gradient(rgb(30, 41, 59), transparent);
    @apply absolute;
  }
  .left-menu-bottom-cover {
    width: 148px;
    height: 40px;
    bottom: -6px;
    left: 0;
    z-index: 10;
    background-image: linear-gradient(transparent, rgb(30, 41, 59));
    transform: rotate(3deg) scale(1);
    transform-origin: 0 0;
    @apply absolute;
  }
  .left-menu-content {
    width: 144px;
    height: 100%;
    @apply overflow-y-auto overflow-x-hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.left-menu-item {
  font-weight: 500;
  color: white;
  @apply flex flex-col justify-center items-center p-y-2  text-xl mb-3 pr-4 rounded-l-xl relative;
  font-family: "jxht", sans-serif;
}
.left-menu-item :deep(.el-icon) {
  height: 30px;
  width: 30px;
  line-height: 30px;
}
.left-menu-item :deep(.el-icon svg) {
  height: 30px;
  width: 30px;
}

.left-menu-item > div {
  transition: all 0.3s;
  background-color: white;
  left: 154px;
  height: 100%;
  width: calc(100% + 10px);
  position: absolute;
  @apply rounded-l-xl;
}

.left-menu-item > span,
.left-menu-item > i {
  z-index: 5;
}

.left-menu-item-active {
  @apply relative rounded-l-xl text-gray-800;
}

.left-menu-item-temp > span,
.left-menu-item-temp > i {
  mix-blend-mode: difference;
}

.left-menu-item-active > div {
  left: 0;
}

.left-menu-item:hover {
  animation: headShake 1.4s;
}

@-webkit-keyframes headShake {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  6.5% {
    -webkit-transform: translateX(-6px) rotateY(-9deg);
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    -webkit-transform: translateX(5px) rotateY(7deg);
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    -webkit-transform: translateX(-3px) rotateY(-5deg);
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    -webkit-transform: translateX(2px) rotateY(3deg);
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes headShake {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  6.5% {
    -webkit-transform: translateX(-6px) rotateY(-9deg);
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    -webkit-transform: translateX(5px) rotateY(7deg);
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    -webkit-transform: translateX(-3px) rotateY(-5deg);
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    -webkit-transform: translateX(2px) rotateY(3deg);
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

</style>
