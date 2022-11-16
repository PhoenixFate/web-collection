<template>
  <div class="right-header-top">
    <div class="header-btn">
      <el-tooltip effect="dark" content="折叠与展开菜单" placement="bottom">
        <div class="header-btn-body" @click="toggleMenu()">
          <div
            class="umbrella"
            :class="[
              { 'umbrella-active': !$store.state.isCollapse },
              { 'umbrella-animate': $store.state.umbrellaAnimate },
            ]"
          >
            <div class="canopy"></div>
            <div class="shaft"></div>
          </div>
        </div>
      </el-tooltip>
    </div>
    <div class="header-btn">
      <el-tooltip effect="dark" content="刷新页面" placement="bottom">
        <div class="header-btn-body" @click="handleRefresh()">
          <el-icon class="icon-btn">
            <Refresh color="#555" />
          </el-icon>
        </div>
      </el-tooltip>
    </div>

    <div class="ml-auto flex justify-center items-center h-[100%]">
      <div class="mr-4 h-[100%]">
        <div class="header-btn" v-if="!isFullscreen">
          <el-tooltip effect="dark" content="全屏" placement="bottom">
            <div class="header-btn-body" @click="toggle()">
              <el-icon>
                <FullScreen color="#555" />
              </el-icon>
            </div>
          </el-tooltip>
        </div>
        <div class="header-btn" v-if="isFullscreen">
          <el-tooltip effect="dark" content="退出全屏" placement="bottom">
            <div class="header-btn-body" @click="toggle()">
              <el-icon>
                <Aim color="#555" />
              </el-icon>
            </div>
          </el-tooltip>
        </div>
      </div>

      <div class="clock">
        <div class="clock__circle">
          <span class="clock__twelve"></span>
          <span class="clock__three"></span>
          <span class="clock__six"></span>
          <span class="clock__nine"></span>
          <div class="clock__rounder"></div>
          <div class="clock__hour" ref="clockHour"></div>
          <div class="clock__minutes" ref="clockMinute"></div>
          <div class="clock__seconds" ref="clockSecond"></div>
        </div>
        <div class="clock-text">
          <h2>
            <span>{{ year }}-{{ month }}-{{ day }}</span>
          </h2>
          <h3>
            <span>{{ $filters.padTwoZero(hour) }}</span
            ><span>:</span>
            <span>{{ $filters.padTwoZero(minute) }}</span>
          </h3>
          <h4 v-if="solar2lunarData">
            <span>{{ solar2lunarData.ncWeek }}</span>
            <span>{{ solar2lunarData.monthCn}}</span>
            <span>{{ solar2lunarData.dayCn}}</span>
          </h4>
        </div>
      </div>

      <div class="user-info-dropdown">
        <div @mouseenter="showPersonalImage" @mouseleave="hidePersonalImage">
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
        <div @mouseenter="showPersonalMenu" @mouseleave="hidePersonalMenu">
          <span>管理员</span>
        </div>
      </div>
    </div>

    <LayoutRightHeaderPersonal
      :personalMenuFlag="personalMenuFlag"
      @showPersonalMenu="showPersonalMenu"
      @hidePersonalMenu="hidePersonalMenu"
      @toPersonalMenu="toPersonalMenu"
    >
    </LayoutRightHeaderPersonal>

    <LayoutRightHeaderImageDropdown
      :personalImageFlag="personalImageFlag"
      @showPersonalImage="showPersonalImage"
      @hidePersonalImage="hidePersonalImage"
    >
    </LayoutRightHeaderImageDropdown>

    <FormDrawer
      title="修改密码"
      ref="formDrawerRef"
      size="45%"
      :closeOnClickModal="true"
      :destoryOnClose="true"
      confirmText="确认提交"
      @submit="onSubmitChangePassword"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="w-[80%]"
        label-width="120px"
        size="large"
      >
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input
            v-model="form.oldPassword"
            type="password"
            placeholder="请输入原密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input
            v-model="form.newPassword"
            type="password"
            show-password
            placeholder="请输入新密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="checkNewPassword" label="确认密码">
          <el-input
            v-model="form.checkNewPassword"
            type="password"
            show-password
            placeholder="请确认新密码"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useFullscreen } from "@vueuse/core";
import { useStore } from "vuex";
import FormDrawer from "~/components/FormDrawer.vue";
import { useChangePassword } from "~/composables/useManager";
import LayoutRightHeaderPersonal from "./LayoutRightHeaderPersonal.vue";
import LayoutRightHeaderImageDropdown from "./LayoutRightHeaderImageDropdown.vue";
import solarLunar from "solarLunar";



const {
  formDrawerRef,
  form,
  rules,
  formRef,
  onSubmitChangePassword,
  openChangePasswordForm,
} = useChangePassword();

const store = useStore();
const {
  // 是否是全屏
  isFullscreen,
  // 切换全屏
  toggle,
} = useFullscreen();

const handleRefresh = () => {
  //原生js
  window.location.reload();
};
const toggleMenu = () => {
  //开启伞的折叠动画
  store.commit("SET_UMBRELLA_ANIMATE", true);
  setTimeout(() => {
    //关闭伞的折叠动画
    store.commit("SET_UMBRELLA_ANIMATE", false);
  }, 1200);
  store.commit("COLLAPSE_MENU");
};

const toPersonal = () => {
  console.log("to personal");
};
const toLoginLog = () => {
  console.log("to login log");
};
const toSystemSettings = () => {
  console.log("to system settings");
};
const personalMenuFlag = ref(false);
const personalMenuHoverTimeout = ref("");
const personalMenuTempFlag = ref(false);
const showPersonalMenu = () => {
  personalMenuTempFlag.value = true;
  personalMenuHoverTimeout.value = setTimeout(() => {
    personalMenuFlag.value = true;
  }, 400);
};
const hidePersonalMenu = () => {
  personalMenuTempFlag.value = false;
  if (personalMenuHoverTimeout.value) {
    clearTimeout(personalMenuHoverTimeout.value);
  }
  setTimeout(() => {
    if (!personalMenuTempFlag.value) {
      personalMenuFlag.value = false;
    }
  }, 500);
};

const hidePersonalMenuNow = () => {
  personalMenuFlag.value = false;
};

const personalImageFlag = ref(false);
const personalImageHoverTimeout = ref("");
const personalImageTempFlag = ref(false);
const showPersonalImage = () => {
  personalImageTempFlag.value = true;
  personalImageHoverTimeout.value = setTimeout(() => {
    personalImageFlag.value = true;
  }, 600);
};
const hidePersonalImage = () => {
  personalImageTempFlag.value = false;
  if (personalImageHoverTimeout.value) {
    clearTimeout(personalImageHoverTimeout.value);
  }
  setTimeout(() => {
    if (!personalImageTempFlag.value) {
      personalImageFlag.value = false;
    }
  }, 400);
};

const toPersonalMenu = (index) => {
  switch (index) {
    case 0:
      toPersonal();
      hidePersonalMenuNow();
      break;
    case 1:
      openChangePasswordForm();
      hidePersonalMenuNow();
      break;
    case 2:
      toLoginLog();
      hidePersonalMenuNow();
      break;
    case 3:
      toSystemSettings();
      hidePersonalMenuNow();
      break;
  }
};

const clockHour = ref();
const clockSecond = ref();
const clockMinute = ref();
const year = ref();
const month = ref();
const day = ref();
const hour = ref();
const minute = ref();
const solar2lunarData=ref();
onMounted(() => {
  let timeNow = new Date();
  year.value = timeNow.getFullYear();
  month.value = timeNow.getMonth() + 1;
  day.value = timeNow.getDate();
  solar2lunarData.value = solarLunar.solar2lunar(year.value, month.value, day.value); // 输入的日子为公历

  const setDate = () => {
    const now = new Date();
    hour.value = now.getHours();
    minute.value = now.getMinutes();


    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360;
    if (clockSecond.value && clockSecond.value.style) {
      clockSecond.value.style.transform = `rotate(${secondsDegrees}deg)`;
    }
    const mins = now.getMinutes();
    const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6;
    if (clockMinute.value && clockMinute.value.style) {
      clockMinute.value.style.transform = `rotate(${minsDegrees}deg)`;
    }
    const tempHour = now.getHours();
    const hourDegrees = (tempHour / 12) * 360 + (mins / 60) * 30;
    if (clockHour.value && clockHour.value.style) {
      clockHour.value.style.transform = `rotate(${hourDegrees}deg)`;
    }
  };
  setInterval(setDate, 1000);
  setDate();
});
</script>
<style scoped src="../../assets/css/layout/header/umbrella.css" />
<style scoped lang="scss">
.right-header-top {
  width: 100%;
  height: 80px;
  @apply flex items-center justify-start;
}

.header-btn {
  height: 100%;
  width: 40px;
  cursor: pointer;
  @apply py-3;
}

.header-btn-body {
  width: 100%;
  height: 100%;
  @apply flex justify-center items-center;
  &:hover {
    @apply bg-blue-100 rounded-lg;
  }
}

.header-btn :deep(.el-icon) {
  height: 24px;
  width: 24px;
  line-height: 24px;
}
.header-btn :deep(.el-icon svg) {
  height: 24px;
  width: 24px;
}

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

.clock {
  @apply flex justify-center items-center;
  .clock__circle {
    position: relative;
    width: 70px;
    height: 70px;
    box-shadow: -2px -2px 5px #fff, 2px 2px 5px rgb(209, 209, 230),
      inset 2px 2px 5px rgb(209, 209, 230), inset -2px -2px 2px #fff;
    border-radius: 50%;
    justify-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .clock__twelve,
    .clock__three,
    .clock__six,
    .clock__nine {
      position: absolute;
      width: 0.3rem;
      height: 1px;
      background-color: rgb(155, 155, 176);
    }

    .clock__twelve,
    .clock__six {
      transform: translateX(-50%) rotate(90deg);
    }

    .clock__twelve {
      top: 0.41rem;
      left: 50%;
    }

    .clock__three {
      top: 50%;
      right: 0.25rem;
    }

    .clock__six {
      bottom: 0.41rem;
      left: 50%;
    }

    .clock__nine {
      left: 0.25rem;
      top: 50%;
    }

    .clock__rounder {
      width: 0.25rem;
      height: 0.25rem;
      background-color: rgb(59, 59, 191);
      border-radius: 50%;
      border: 0.1rem solid rgb(236, 236, 243);
      z-index: 10;
    }

    .clock__hour,
    .clock__minutes,
    .clock__seconds {
      position: absolute;
      display: flex;
      justify-content: center;
    }

    .clock__hour {
      width: 35px;
      height: 25px;
    }

    .clock__hour::before {
      content: "";
      position: absolute;
      background-color: rgb(79, 79, 100);
      width: 0.08rem;
      height: 1rem;
      border-radius: 0.25rem;
      z-index: 1;
    }

    .clock__minutes {
      width: 45px;
      height: 45px;
    }

    .clock__minutes::before {
      content: "";
      position: absolute;
      background-color: rgb(79, 79, 100);
      width: 0.08rem;
      height: 1.33rem;
      border-radius: 0.25rem;
      z-index: 1;
    }

    .clock__seconds {
      width: 42px;
      height: 42px;
    }

    .clock__seconds::before {
      content: "";
      position: absolute;
      background-color: rgb(59, 59, 191);
      width: 0.04rem;
      height: 1.67rem;
      border-radius: 0.25rem;
      z-index: 1;
    }
  }

  .clock-text {
    width: 100px;
    text-align: center;
    @apply ml-2 flex flex-col justify-center items-center;
    h2 {
      font-size: 0.9rem;
      @apply text-gray-400;
    }
    h3 {
      font-size: 1.2rem;
      color: rgb(61, 61, 124);
      @apply font-bold;
      span:nth-child(2){
        @apply mx-1;
      }
    }
    h4 {
      font-size: .7rem;
      @apply text-blue-gray-500;
      span {
        margin-right: .2rem;
      }
    }
  }
}
</style>
