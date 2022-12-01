<template>
  <el-container class="app-main">
    <el-aside
      class="app-main-aside"
      :class="{ 'app-main-aside-collapsed': $store.state.isCollapse }"
    >
      <div class="left-menu">
        <div class="left-logo">
          <img
            src="/image/logo.png"
            :class="{ 'img-rocket-run': rocketAnimateFlag }"
            alt=""
            @mouseenter="rocketRun"
          />
        </div>
        <div class="left-empty"></div>
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
                {
                  'left-menu-item-temp':
                    $store.state.leftMenuAnimationFlag &&
                    index == $store.state.bigMenuLastIndex,
                },
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
        </div>
      </div>
      <div class="middle-menu"></div>
    </el-aside>
  </el-container>
</template>
<script setup>
import { onMounted, ref, nextTick, computed } from "vue";
const rocketAnimateFlag = ref(false);
const selector = ref();
const activeIndex = ref(0);

const selectBigMenu = (i) => {
  activeIndex.value = i - 1;

  selector.value.style.top = activeIndex.value * 80 + 20 + "px";
};

onMounted(() => {
  selector.value.style.top = activeIndex.value * 80 + 20 + "px";
});
</script>
<style lang="scss">
.app-main {
  height: 100%;
  width: 100%;
  position: relative;
  --background-main-color: #ededfb;
  background-color: var(--background-main-color);
  .el-aside {
    width: 500px;
  }
}

.app-main-aside {
  transition: all 1.2s;
  padding-left: 1rem;
  @apply flex h-[100%] relative overflow-hidden bg-red-200;

  .left-menu {
    width: 160px;
    background-color: #fff;

    .left-logo {
      width: 160px;
      height: 120px;
      @apply flex justify-center items-center;
    }
    .left-logo img {
      width: 80px;
      height: 80px;
    }

    .left-logo img.img-rocket-run {
      animation: rocketRun 2.4s;
    }
    .left-empty {
      height: 40px;
    }
    .left-content {
      height: calc(100% - 160px - 40px);
      width: 160px;
      overflow: hidden;
      position: relative;
    }
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
    .left-content-scroll {
      width: 160px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
      padding-top: 20px;
      &::-webkit-scrollbar-thumb {
        display: none;
      }
      &::-webkit-scrollbar {
        width: 0;
      }

      .left-menu-item {
        font-weight: 500;
        @apply flex flex-col justify-center items-center p-y-2  text-xl mb-3 pr-4 rounded-l-xl relative text-gray-500;
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

      .left-menu-item > span,
      .left-menu-item > i {
        z-index: 5;
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
        height: 80px;
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
  .middle-menu {
    width: 300px;
    margin-left: 20px;
    height: 100%;
    @apply bg-purple-500;
  }
}
</style>
