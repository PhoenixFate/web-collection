<template>
  <div class="main-right-top">
    <div class="main-right-top-left">
      <LayoutRightTopUmbrella></LayoutRightTopUmbrella>
      <LayoutRightTopBreadCrumb class="ml-4"></LayoutRightTopBreadCrumb>
      <div class="ml-auto flex justify-center items-center h-[100%]">
        <LayoutRightTopFullScreen></LayoutRightTopFullScreen>
        <LayoutRightTopRefresh class="mr-4"></LayoutRightTopRefresh>
        <LayoutRightHeaderClock
          @showPersonalCalendar="showPersonalCalendar"
          @hidePersonalCalendar="hidePersonalCalendar"
        ></LayoutRightHeaderClock>
      </div>
    </div>
    <div class="main-right-top-right">
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
  </div>
</template>
<script setup>
import LayoutRightTopUmbrella from "./header/LayoutRightTopUmbrella.vue";
import LayoutRightTopBreadCrumb from "./header/LayoutRightTopBreadCrumb.vue";
import LayoutRightTopFullScreen from "./header/LayoutRightTopFullScreen.vue";
import LayoutRightTopRefresh from "./header/LayoutRightTopRefresh.vue";
import LayoutRightHeaderCalendarDropdown from "./header/LayoutRightHeaderCalendarDropdown.vue";
import LayoutRightHeaderUserinfo from "./header/LayoutRightHeaderUserinfo.vue";
import LayoutRightHeaderPersonalDropdown from "./header/LayoutRightHeaderPersonalDropdown.vue";
import LayoutRightHeaderImageDropdown from "./header/LayoutRightHeaderImageDropdown.vue";

import {
  usePersonalMenuDropdown,
  usePersonalImageDropdown,
  usePersonalCalendarDropdown,
} from "@/composables/header/useDropdown";
import LayoutRightHeaderClock from "./header/LayoutRightHeaderClock.vue";
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
<style lang="scss" scoped>
.main-right-top {
  position: absolute;
  width: calc(100% + 16px);
  height: 120px;
  left: -16px;
  top: 0.75rem;
  z-index: 10;
  @apply flex justify-between items-center;
  .main-right-top-left {
    height: 100%;
    width: calc(100% - 300px);
    border-radius: 25px;
    padding-left: 20px;
    padding-right: 20px;
    @apply bg-white flex items-center justify-start;
  }
  .main-right-top-right {
    height: 100%;
    width: 200px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    background: linear-gradient(to right, #bf9dff, #764fe1);
  }
}
</style>
