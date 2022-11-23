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

    <el-breadcrumb class="ml-4">
      <TransitionGroup
        appear
        enter-active-class="animate__animated animate__fadeInRight"
      >
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item+index">
          <span>{{ item }} </span>
        </el-breadcrumb-item>
      </TransitionGroup>
    </el-breadcrumb>

    <div class="ml-auto flex justify-center items-center h-[100%]">
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
      <div class="header-btn mr-4">
        <el-tooltip effect="dark" content="刷新页面" placement="bottom">
          <div class="header-btn-body" @click="handleRefresh()">
            <el-icon class="icon-btn">
              <Refresh color="#555" />
            </el-icon>
          </div>
        </el-tooltip>
      </div>
      <LayoutRightHeaderClock
        @showPersonalCalendar="showPersonalCalendar"
        @hidePersonalCalendar="hidePersonalCalendar"
      ></LayoutRightHeaderClock>
      <LayoutRightHeaderUserinfo
        @showPersonalMenu="showPersonalMenu"
        @hidePersonalMenu="hidePersonalMenu"
        @showPersonalImage="showPersonalImage"
        @hidePersonalImage="hidePersonalImage"
      >
      </LayoutRightHeaderUserinfo>
    </div>

    <LayoutRightHeaderCalendarDropdown
      :personalCalendarFlag="personalCalendarFlag"
    >
    </LayoutRightHeaderCalendarDropdown>

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
import { ref } from "vue";
import { useFullscreen } from "@vueuse/core";
import { useStore } from "vuex";
import FormDrawer from "~/components/FormDrawer.vue";
import { useChangePassword } from "~/composables/useManager";
import LayoutRightHeaderPersonal from "./LayoutRightHeaderPersonal.vue";
import LayoutRightHeaderImageDropdown from "./LayoutRightHeaderImageDropdown.vue";
import LayoutRightHeaderCalendarDropdown from "./LayoutRightHeaderCalendarDropdown.vue";
import LayoutRightHeaderClock from "./LayoutRightHeaderClock.vue";
import LayoutRightHeaderUserinfo from "./LayoutRightHeaderUserinfo.vue";
import {
  usePersonalMenuDropdown,
  usePersonalImageDropdown,
  usePersonalCalendarDropdown,
} from "~/composables/header/useDropdown";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const store = useStore();
const route = useRoute();
const router = useRouter();
let breadcrumbList = computed(() => {
  let temp = [];
  if (
    router.currentRoute.value.meta &&
    router.currentRoute.value.meta.bigMenuIndex
  ) {
    temp.push(
      store.state.menus[router.currentRoute.value.meta.bigMenuIndex[0]].name
    );
    if (router.currentRoute.value.meta.bigMenuIndex.length > 1) {
      temp.push(
        store.state.menus[router.currentRoute.value.meta.bigMenuIndex[0]].child[
          router.currentRoute.value.meta.bigMenuIndex[1]
        ].name
      );
    }
    temp.push(router.currentRoute.value.meta.title);
  }
  console.log(temp);
  return temp;
});

const {
  formDrawerRef,
  form,
  rules,
  formRef,
  onSubmitChangePassword,
  openChangePasswordForm,
} = useChangePassword();

const {
  personalMenuFlag,
  showPersonalMenu,
  hidePersonalMenu,
  hidePersonalMenuNow,
} = usePersonalMenuDropdown();

const { personalImageFlag, showPersonalImage, hidePersonalImage } =
  usePersonalImageDropdown();

const { personalCalendarFlag, showPersonalCalendar, hidePersonalCalendar } =
  usePersonalCalendarDropdown();

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
</script>
<style scoped src="../../assets/css/layout/header/umbrella.css" />
<style scoped lang="scss">
.right-header-top {
  width: 100%;
  height: 80px;
  @apply flex items-center justify-start;
  :deep(.el-breadcrumb) {
    font-size: 0.9rem;
    height: 30px;
    line-height: 30px;
  }
  :deep(.el-breadcrumb__item:nth-child(1)) {
    font-size: 1.1rem;
  }
  :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
    font-size: .9rem;
    font-weight: bold !important;
    color: black !important;
  }
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
</style>
