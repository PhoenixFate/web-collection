import { ref } from "vue";

export function usePersonalMenuDropdown() {
  //显示隐藏个人中心下拉框动画
  const personalMenuFlag = ref(false);
  const personalMenuHoverTimeout = ref("");
  //防止先mouseEnter再mouseLeave又mouseEnter不断触发动画效果
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
  return {
    personalMenuFlag,
    showPersonalMenu,
    hidePersonalMenu,
    hidePersonalMenuNow,
  };
}

export function usePersonalImageDropdown() {
  //显示隐藏个人头像下拉框动画
  const personalImageFlag = ref(false);
  const personalImageHoverTimeout = ref("");
  //防止先mouseEnter再mouseLeave又mouseEnter不断触发动画效果
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
  return {
    personalImageFlag,
    showPersonalImage,
    hidePersonalImage,
  };
}

export function usePersonalCalendarDropdown() {
  //显示隐藏个人黄历下拉框动画
  const personalCalendarFlag = ref(false);
  const personalCalendarHoverTimeout = ref("");
  //防止先mouseEnter再mouseLeave又mouseEnter不断触发动画效果
  const personalCalendarTempFlag = ref(false);
  const showPersonalCalendar = () => {
    personalCalendarTempFlag.value = true;
    personalCalendarHoverTimeout.value = setTimeout(() => {
      personalCalendarFlag.value = true;
    }, 1000);
  };
  const hidePersonalCalendar = () => {
    personalCalendarTempFlag.value = false;
    if (personalCalendarHoverTimeout.value) {
      clearTimeout(personalCalendarHoverTimeout.value);
    }
    setTimeout(() => {
      if (!personalCalendarTempFlag.value) {
        personalCalendarFlag.value = false;
      }
    }, 400);
  };

  return {
    personalCalendarFlag,
    showPersonalCalendar,
    hidePersonalCalendar,
  };
}
