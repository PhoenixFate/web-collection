<template>
  <div class="left-content">
    <div class="left-content-top-cover"></div>
    <div class="left-content-scroll">
      <div class="mine-selector" ref="selector">
        <div class="left"></div>
        <div class="right"></div>
        <div class="left1"></div>
        <div class="right1"></div>
      </div>

      <div
        class="left-menu-item"
        v-for="(item, index) in $store.state.menus"
        :class="[
          { 'left-menu-item-active': index == $store.state.bigMenuIndex },
        ]"
        :key="index"
        @click="selectBigMenu(index)"
      >
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span class="mt-1">{{ item.name }}</span>
      </div>
    </div>
    <div class="left-content-bottom-cover"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useMenu } from "@/composables/useMenu.js";
const { chooseBigMenu } = useMenu();

const store = useStore();
const selector = ref();
const selectBigMenu = (i) => {
  selector.value.style.top = i * 100 + 20 + "px";
  chooseBigMenu(i);
};
onMounted(() => {
  selector.value.style.top = store.state.bigMenuIndex * 100 + 20 + "px";
});
</script>
<style lang="scss" scoped>
.left-content {
  height: calc(100% - 160px - 40px);
  width: 160px;
  overflow: hidden;
  position: relative;
  .left-content-top-cover {
    position: absolute;
    top: -20px;
    left: 0;
    height: 40px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: #fff;
    width: 160px;
    z-index: 10;
  }
  .left-content-bottom-cover {
    position: absolute;
    bottom: -20px;
    left: 0;
    height: 40px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background-color: #fff;
    width: 160px;
    z-index: 10;
  }
  .left-content-scroll {
    width: 160px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
    &::-webkit-scrollbar-thumb {
      display: none;
    }
    &::-webkit-scrollbar {
      width: 0;
    }

    .left-menu-item {
      font-weight: 500;
      height: 100px;
      transition: all 0.3s 0.2s ease;
      @apply flex flex-col justify-center items-center  text-lg relative text-warm-gray-400;
      font-family: "jxht", sans-serif;
      span {
        position: relative;
      }
    }

    .left-menu-item span:before {
      content: "";
      position: absolute;
      width: 0px;
      height: 4px;
      background: linear-gradient(90deg, #ff9d87 0%, #ffedc0 100%);
      bottom: -10px;
      border-radius: 4px;
      transition: all 0.6s cubic-bezier(0.82, 0.02, 0.13, 1.26);
      left: 120%;
    }

    .left-menu-item:hover {
      color: #fb8a8a;
    }

    .left-menu-item:hover span:before {
      width: 40px;
      left: 10px;
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

    .left-menu-item-active {
      @apply text-yellow-500;
      span {
        background: linear-gradient(to right, #fd5c81, #ffaf79);
        /*背景被裁剪到文字*/
        -webkit-background-clip: text;
        background-clip: text;
        /*设置文字的填充颜色*/
        -webkit-text-fill-color: transparent;
      }
    }

    .mine-selector {
      position: absolute;
      transition-duration: 0.6s;
      transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
      background-color: var(--background-main-color);
      left: 0;
      height: 100px;
      width: 160px;
    }

    .mine-selector .right,
    .mine-selector .left {
      position: absolute;
      width: 25px;
      height: 25px;
      background-color: var(--background-main-color);
      right: 0px;
    }

    .mine-selector .right {
      top: -25px;
    }

    .mine-selector .left {
      bottom: -25px;
    }

    .mine-selector .right:before,
    .mine-selector .left:before {
      content: "";
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #fff;
    }

    .mine-selector .right:before {
      right: 0;
      top: -25px;
    }

    .mine-selector .left:before {
      right: 0;
      bottom: -25px;
    }

    .mine-selector .right1,
    .mine-selector .left1 {
      position: absolute;
      width: 25px;
      height: 25px;
      background-color: var(--background-main-color);
      left: 0;
    }

    .mine-selector .right1 {
      top: -25px;
    }

    .mine-selector .left1 {
      bottom: -25px;
    }

    .mine-selector .right1:before,
    .mine-selector .left1:before {
      content: "";
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #fff;
    }

    .mine-selector .right1:before {
      left: 0;
      top: -25px;
    }

    .mine-selector .left1:before {
      left: 0;
      bottom: -25px;
    }
  }
}
</style>
