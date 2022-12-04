<template>
  <div class="right-header-top">
    <LayoutRightTopUmbrella></LayoutRightTopUmbrella>
    <LayoutRightTopBreadCrumb class="ml-4"></LayoutRightTopBreadCrumb>

    <div class="ml-auto flex justify-center items-center h-[100%]">
      <LayoutRightTopFullScreen></LayoutRightTopFullScreen>
      <LayoutRightTopRefresh class="mr-4"></LayoutRightTopRefresh>
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
    <LayoutRightHeaderImageDropdown
      :personalImageFlag="personalImageFlag"
      @showPersonalImage="showPersonalImage"
      @hidePersonalImage="hidePersonalImage"
    >
    </LayoutRightHeaderImageDropdown>
    <LayoutRightHeaderPersonalDropdown
      :personalMenuFlag="personalMenuFlag"
      @showPersonalMenu="showPersonalMenu"
      @hidePersonalMenu="hidePersonalMenu"
      @toPersonalMenu="toPersonalMenu"
    >
    </LayoutRightHeaderPersonalDropdown>

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
import FormDrawer from "@/components/FormDrawer.vue";
import { useChangePassword } from "@/composables/useManager";
import LayoutRightHeaderPersonalDropdown from "./header/LayoutRightHeaderPersonalDropdown.vue";
import LayoutRightHeaderImageDropdown from "./header/LayoutRightHeaderImageDropdown.vue";
import LayoutRightHeaderCalendarDropdown from "./header/LayoutRightHeaderCalendarDropdown.vue";
import LayoutRightHeaderClock from "./header/LayoutRightHeaderClock.vue";
import LayoutRightHeaderUserinfo from "./header/LayoutRightHeaderUserinfo.vue";
import LayoutRightTopBreadCrumb from "./header/LayoutRightTopBreadCrumb.vue";
import LayoutRightTopUmbrella from "./header/LayoutRightTopUmbrella.vue";
import LayoutRightTopFullScreen from "./header/LayoutRightTopFullScreen.vue";
import LayoutRightTopRefresh from "./header/LayoutRightTopRefresh.vue";

import {
  usePersonalMenuDropdown,
  usePersonalImageDropdown,
  usePersonalCalendarDropdown,
} from "@/composables/header/useDropdown";
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
<style scoped lang="scss">
.right-header-top {
  width: 100%;
  height: 100px;
  padding-left: 20px;
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
</style>
