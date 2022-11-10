<template>
  <el-container class="app-main">
    <el-aside width="400px" class="flex pl-3 h-[100%] relative">
      <div class="left-main">
        <div class="left-logo">
          <img src="/logo.png" alt="" />
        </div>

        <div class="left-menu">
          <div
            class="left-menu-item"
            v-for="(item, index) in $store.state.menus"
            :class="[
              { 'left-menu-item-active': index == bigMenuIndex },
              { 'left-menu-item-temp': tempFlag && index == bigMenuLastIndex },
            ]"
            :key="index"
            @click="chooseBigMenu(index)"
          >
            <el-icon :size="25">
              <component :is="item.icon" />
            </el-icon>
            <span class="mt-1">{{ item.name }}</span>
            <div></div>
          </div>
        </div>
      </div>
      <div class="flex-1 h-[100%] relative">
        <div class="middle-logo">
          <div class="bounce">
            <span class="letter">O</span>
            <span class="letter mr-2">A</span>
            <span class="letter">办</span>
            <span class="letter">公</span>
            <span class="letter">系</span>
            <span class="letter">统</span>
          </div>
        </div>
        <div class="middle-menu">
          <ul class="cards">
            <li
              class="card"
              v-for="(item, index) in $store.state.menus"
              :class="[
                { 'card-current': index == bigMenuIndex },
                { 'card-next': index == middleNextIndex },
                { 'card-third': index == middleThirdIndex },
                { 'card-last-temp': index == middleLastIndex },
                { 'card-out': index == middleOutIndex },
              ]"
              :key="index"
            >
              <ul v-if="item.child">
                <li v-for="(childMenu, index2) in item.child" :key="index2">
                  <el-icon :size="25">
                    <component :is="childMenu.icon" />
                  </el-icon>
                  <span>{{ childMenu.name }}</span>
                </li>
              </ul>
              <span v-else>当前菜单无子菜单</span>
            </li>

            <!-- <li class="card card--current">
              <h1>系统管理</h1>
              <ul>
                <li>用户管理</li>
                <li>菜单管理</li>
                <li>日志管理</li>
                <li>角色管理</li>
                <li>权限管理</li>
                <li>定时任务管理</li>
              </ul>
            </li>
            <li class="card card--next">
              <h1>系统管理</h1>
              <ul>
                <li>用户管理</li>
                <li>菜单管理</li>
                <li>日志管理</li>
                <li>角色管理</li>
                <li>权限管理</li>
                <li>定时任务管理</li>
              </ul>
            </li>
            <li class="card">
              <h1>系统管理</h1>
              <ul>
                <li>用户管理</li>
                <li>菜单管理</li>
                <li>日志管理</li>
                <li>角色管理</li>
                <li>权限管理</li>
                <li>定时任务管理</li>
              </ul>
            </li>
            <li class="card">
              <h1>系统管理</h1>
              <ul>
                <li>用户管理</li>
                <li>菜单管理</li>
                <li>日志管理</li>
                <li>角色管理</li>
                <li>权限管理</li>
                <li>定时任务管理</li>
              </ul>
            </li> -->
          </ul>
        </div>
      </div>
    </el-aside>
    <el-main class="p-0 0 relative">
      <div class="right-header"></div>
    </el-main>
  </el-container>

  <!-- <el-container class="app-main">
    <el-header class="h-[64px]">
      <LayoutHeaderVue ></LayoutHeaderVue>
    </el-header>
    <el-container class="main-container">
      <el-aside :width="$store.state.asideWidth">
        <LayoutMenuVue ></LayoutMenuVue>
      </el-aside>
      <el-main class="main-right">
        <div class="main-body">
          <LayoutTagListVue ></LayoutTagListVue>
          <div class="main-body-main">

            <router-view v-slot="{ Component }">
            
              <transition name="fade">

                <keep-alive :max="20">
                  <component :is="Component"></component>
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container> -->
</template>
<script setup>
import { storeKey } from "vuex";
import LayoutHeaderVue from "./components/LayoutHeader.vue";
import LayoutMenuVue from "./components/LayoutMenu.vue";
import LayoutTagListVue from "./components/LayoutTagList.vue";
import { ref } from "vue";

import store from "~/store";

const bigMenuIndex = ref(0);
//左侧菜单上一次点击的index，用于动画切换
const bigMenuLastIndex = ref(0);
//用于左侧动画
const tempFlag = ref(false);

const middleNextIndex = ref(-1);
const middleThirdIndex = ref(-1);
//初始化有用，其他时候没用
const middleLastIndex = ref(-1);
const middleOutIndex = ref(-1);
if (!store.state.menus || store.state.menus.length == 1) {
  //card动画一个4个card，当menus只有一个，只显示第一个card-current
} else if (store.state.menus.length == 2) {
  //当menus只有两个的时候，只显示card-current card-next
  middleNextIndex.value = 1;
} else if (store.state.menus.length == 3) {
  //当menus只有三个的时候，只显示card-current card-next card-third
  middleNextIndex.value = 1;
  middleThirdIndex.value = 2;
} else {
  //当menus大于等于4个的时候只显示card-current card-next card-third card-last-temp
  middleNextIndex.value = 1;
  middleThirdIndex.value = 2;
  middleLastIndex.value = store.state.menus.length - 1;
}

const chooseBigMenu = (index) => {
  console.log(store.state.menus[index]);
  if (index == bigMenuIndex.value) {
    return;
  }
  tempFlag.value = true;
  setTimeout(() => {
    tempFlag.value = false;
  }, 200);
  bigMenuLastIndex.value = bigMenuIndex.value;
  bigMenuIndex.value = index;

  //middle 的4个card动画切换
  middleLastIndex.value = -1;
  //上一个middle菜单添加飞出去的动画，当前的index，添加card-current
  middleOutIndex.value = bigMenuLastIndex.value;
  if (store.state.menus.length == 2) {
    //当menus只有两个的时候，只显示card-current card-out
  } else if (store.state.menus.length == 3) {
    //当menus只有两个的时候，只显示card-current card-next card-out
    const indexArray = []
    store.state.menus.forEach((menu, i) => {
       if(i != bigMenuLastIndex.value && i != bigMenuIndex.value){
        indexArray.push(i)
       }
    });
    middleNextIndex.value = indexArray[0];
  } else {
    //当menus有4个及4个以上的时候
    const indexArray=[]
    store.state.menus.forEach((menu, i) => {
      if(i != bigMenuLastIndex.value && i != bigMenuIndex.value){
        indexArray.push(i)
      }
    });
    console.log(indexArray)
    middleNextIndex.value = indexArray[0];
    middleThirdIndex.value = indexArray[1];
  }
};
</script>
<style>
.app-main {
  @apply bg-gray-200;
  height: 100vh;
  width: 100vw;
}
.left-main {
  @apply w-[140px] h-[100%] bg-blue-gray-600  rounded-2xl relative;
}

.left-logo {
  width: 124px;
  height: 120px;
  @apply bg-white rounded-l-3xl absolute right-0 top-3 flex justify-center items-center;
}

.left-menu {
  height: calc(100vh - 260px);
  width: 124px;
  z-index: 100;
  top: 170px;
  @apply absolute right-0 overflow-y-auto;
}
.left-menu::-webkit-scrollbar {
  display: none;
}
.left-menu-item {
  font-weight: 500;
  color: white;
  @apply flex flex-col justify-center items-center p-y-2  text-lg mb-3 pr-4 rounded-l-xl relative;
  font-family: "jxht", sans-serif;
}

.left-menu-item > div {
  transition: all 0.3s;
  background-color: white;
  left: 124px;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 0;
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

.left-logo img {
  width: 60px;
  height: 60px;
}

.middle-logo {
  width: 100%;
  height: 120px;
  @apply absolute left-0 right-0 top-3 bg-white pb-12;
}

.middle-menu {
  width: 100%;
  height: calc(100% - 100px - 1rem);
  @apply absolute bottom-2 left-0;
}

.right-header {
  height: 120px;
  width: 100%;
  @apply absolute right-3 top-3 bg-white rounded-r-3xl;
}

.cards {
  position: absolute;
  top: -30px;
  left: -10px;
  width: 86%;
  list-style-type: none;
  height: calc(100% - 20px);
}
.card > ul > li {
  margin: 20px auto;
  height: 40px;
}
.cards-out {
  animation: cards-out 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8);
  animation-fill-mode: forwards;
}

.cards-in {
  animation: cards-in 0.6s cubic-bezier(0.3, 0.6, 0.8, 0.8);
}

.card {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: white;
  border-radius: 30px;
  padding: 40px;
  width: 90%;
  box-shadow: 0 0 1px 1px #c5c5c5;
  height: 100%;
  overflow: hidden;
  transform: translateY(25px) rotate(3deg) translateX(20px) scale(1);
  transform-origin: 0 0;
  transition: transform 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8) 0.1s;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.card-current {
  position: relative;
  z-index: 10;
  opacity: 1;
  background: white;
  transform: translateX(0%) scale(1);
  box-shadow: 0 0 4px 2px #cbcbcb;
}

.card-next {
  z-index: 5;
  transform: translateY(10px) rotate(1deg) translateX(10px) scale(1);
  background: white;
  box-shadow: 0 0 4px 2px #a6a5a5;
}

.card-third {
  box-shadow: 0 0 4px 2px #a6a5a5;
}

.card-out {
  -webkit-animation: card-out 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8);
  animation: card-out 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8);
  transform: translateY(40px) rotate(4deg) translateX(40px) scale(0.95);
  z-index: 1;
  background: #dcdcdc;
  box-shadow: 0 0 4px 2px #a6a5a5;
}

.card-last-temp {
  transform: translateY(46px) rotate(5deg) translateX(40px) scale(0.95);
  z-index: 1;
  background: #dcdcdc;
  box-shadow: 0 0 4px 2px #a6a5a5;
}

/*@-webkit-keyframes card-out {*/
/*    0% {*/
/*        z-index: 20;*/
/*        transform: translateY(0px) rotate(-4deg)*/
/*    }*/

/*    50% {*/
/*        transform: translateY(-120%) rotate(-5deg) translateX(-40px)*/
/*        */
/*    }*/

/*    80% {*/
/*        z-index: 1*/
/*    }*/

/*    100% {*/
/*        !*transform: translateY(-50px) rotate(8deg) translateX(55px) scale(0.95)*!*/
/*        transform: translateY(-50px) rotate(8deg) translateX(55px) scale(1)*/

/*    }*/
/*}*/

@keyframes card-out {
  0% {
    z-index: 200;
    transform: translateY(0px) rotate(-4deg);
  }

  50% {
    transform: translateY(-10%) rotate(-6deg) translateX(120%);
  }

  80% {
    z-index: 1;
  }

  100% {
    transform: translateY(-50px) rotate(8deg) translateX(55px) scale(0.7);
  }
}

@keyframes cards-out {
  0% {
    transform: translateY(0) translateX(0);
  }

  50% {
    transform: translateY(0) translateX(-140px) scale(0.6);
    opacity: 0.6;
  }

  100% {
    transform: translateY(0) translateX(-200px) scale(0.1);
    opacity: 0;
  }
}

@keyframes cards-in {
  0% {
    transform: translateY(0) translateX(-200px) scale(0.1);
    opacity: 0;
  }

  50% {
    transform: translateY(0) translateX(-140px) scale(0.6);
    opacity: 0.6;
  }

  100% {
    transform: translateY(0) translateX(0);
  }
}

.bounce {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  color: white;
  height: 100%;
  font: normal bold 6rem "Product Sans", sans-serif;
  white-space: nowrap;
  padding-left: 0.5rem;
}

.letter {
  animation: bounce 20s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
  display: inline-block;
  transform: translate3d(0, 0, 0);
  text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.1em;
  font: normal 600 2rem "Varela Round", sans-serif;
  font-family: "hlb", sans-serif;
  @apply text-warm-gray-800;
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

@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
  }

  98% {
    transform: translate3d(0, 0, 0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
  }

  100% {
    transform: translate3d(0, -1em, 0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 1em 0.35em;
  }
}

.el-aside {
  transition: all 0.6s;
  /* transition: max-width 0.5s ease-out; */
}
.main-container {
  height: calc(100vh - 64px);
  background-color: #f4f6f8;
}
.main-right {
  transition: all 0.6s;
  @apply p-4;
  box-shadow: 0 0 6px -4px inset #000;
  background-color: #f4f6f8;
}
.main-body {
  height: 100%;
  background-color: white;
  @apply rounded-2xl;
  box-shadow: 0 0 10px -4px #000;
  padding: 1rem;
}
.main-body-main {
  height: 100%;
  width: 100%;
  padding: 1rem;
  overflow-y: scroll;
}

/* 进入之前的动画效果 开始 */
.fade-enter-from {
  opacity: 0;
}
/* 进入之前的动画效果 结束 */
.fade-enter-to {
  opacity: 1;
}
/* 离开之前的动画效果 开始 */
.fade-leave-from {
  opacity: 1;
}
/* 离开之前的动画效果 结束 */
.fade-leave-to {
  opacity: 0;
}
/* 动画时长 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
/* 进入的动画延迟3秒 */
.fade-enter-active {
  transition-delay: 0.3s;
}
</style>
