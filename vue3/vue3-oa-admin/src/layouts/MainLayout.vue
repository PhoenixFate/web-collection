<template>
  <el-container class="app-main">
    <el-aside
      class="app-main-aside"
      :class="{ 'app-main-aside-collapsed': $store.state.isCollapse }"
    >
      <div class="left-menu">
        <div class="left-logo">
          <img
            src="/images/logo.png"
            :class="{ 'img-rocket-run': rocketAnimateFlag }"
            alt=""
            @mouseenter="rocketRun"
          />
        </div>
        <div class="left-empty"></div>
        <div class="left-content">
          <div class="left-content-top-cover"></div>
          <div class="left-content-scroll">
            <ul>
              <div class="mine-selector" ref="selector">
                <div class="left"></div>
                <div class="right"></div>
                <div class="left1"></div>
                <div class="right1"></div>
              </div>
              <li v-for="i in 20" @click="selectBigMenu(i)">
                <span>abc</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
  nextTick(() => {
    selector.value.style.top = activeIndex.value * 80 + 20 + "px";
  });
};

onMounted(() => {
  nextTick(() => {
    selector.value.style.top = activeIndex.value * 80 + 20 + "px";
  });
});
</script>
<style lang="scss">
.app-main {
  height: 100%;
  width: 100%;
  position: relative;
  --background-main-color: #ededfb;
  background-color: var(--background-main-color);
}

.app-main-aside {
  transition: all 1.2s;
  width: 400px;
  padding-left: 1rem;
  @apply flex h-[100%] relative overflow-hidden;

  .left-menu {
    width: 160px;
    background-color: #fff;

    .left-logo {
      width: 160px;
      height: 160px;
      @apply flex justify-center items-center;
    }
    .left-logo img {
      width: 100px;
      height: 100px;
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
        top:-20px;
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
      ul li {
        height: 80px;
        width: 160px;
        list-style-type: none;
        text-align: center;
        line-height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.4s;
      }
      ul li span {
        position: relative;
      }

      .active {
        height: 80px;
      }

      li.active {
        padding-left: 30px;
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
}
</style>
