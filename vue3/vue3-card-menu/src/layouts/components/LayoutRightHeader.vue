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

      <div
        class="user-info-dropdown"
        @mouseenter="showPersonalMenu"
        @mouseleave="hidePersonalMenu"
      >
        <img
          :src="$store.state.user.avatar"
          alt=""
          v-if="$store.state.user.avatar"
        />
        <img
          src="/image/header/avatar-default-man.png"
          v-if="!$store.state.user.avatar"
        />
        <span>管理员</span>
      </div>

      <!-- <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-gray-800">
          <el-avatar class="mr-3 user-avatar" :src="$store.state.user.avatar" />
          <div class="user-info">
            <span>{{ $store.state.user.username }}</span>
            <span>信息中心</span>
          </div>
          <el-icon class="el-icon--right" :size="16">
            <arrow-down color="#555" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="changePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item divided command="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </div>

    <div
      class="personal-menu"
      :class="{ 'personal-menu-active': personalMenuFlag }"
      @mouseenter="showPersonalMenu"
      @mouseleave="hidePersonalMenu"
    >
      <div class="personal-menu-content">
        <div class="personal-menu-item personal-menu-userinfo">
          <div class="user-info-left">
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
          <div class="user-info-right">
            <h2>管理员</h2>
            <h4>{{ $store.state.user.username }}</h4>
            <h5>信息公司</h5>
            <h5>信息中心</h5>
          </div>
        </div>
        <div class="personal-menu-item personal-menu-item-middle">
          <div>
            <svg-icon
              name="personal-user"
              size="1.2rem"
              color="rgb(75, 85, 99)"
            /><span>个人中心</span>
          </div>
        </div>
        <div class="personal-menu-item personal-menu-item-middle">
          <div>
            <svg-icon
              name="personal-password"
              size="1.2rem"
              color="rgb(75, 85, 99)"
            /><span>修改密码</span>
          </div>
        </div>
        <div class="personal-menu-item personal-menu-item-middle">
          <div>
            <svg-icon
              name="personal-login-log"
              size="1.2rem"
              color="rgb(75, 85, 99)"
            /><span>登录日志</span>
          </div>
        </div>
        <div class="personal-menu-item personal-menu-item-middle">
          <div>
            <svg-icon
              name="personal-settings"
              size="1.2rem"
              color="rgb(75, 85, 99)"
            /><span>系统设置</span>
          </div>
        </div>
      </div>
    </div>

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
import { useFullscreen } from "@vueuse/core";
import { useStore } from "vuex";
import FormDrawer from "~/components/FormDrawer.vue";
import { useChangePassword, useLogout } from "~/composables/useManager";
import { ref } from "vue";
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

const { handlerLogout } = useLogout();

const toPersonal = () => {
  console.log("to personal");
};
const personalMenuFlag = ref(true);
const personalMenuTempFlag = ref(false);
const showPersonalMenu = () => {
  personalMenuTempFlag.value = true;
  personalMenuFlag.value = true;
};
const hidePersonalMenu = () => {
  // personalMenuTempFlag.value = false;
  // setTimeout(() => {
  //   if (!personalMenuTempFlag.value) {
  //     personalMenuFlag.value = false;
  //   }
  // }, 500);
};

const handleCommand = (command) => {
  console.log(command);
  switch (command) {
    case "logout":
      console.log(handlerLogout);
      handlerLogout();
      break;
    case "personal":
      toPersonal();
      break;
    case "changePassword":
      console.log("changePassword");
      openChangePasswordForm();
      break;
  }
};
</script>
<style scoped src="../../assets/css/layout/header/umbrella.css" />
<style scoped>
.right-header-top {
  width: 100%;
  height: 80px;
  @apply flex items-center justify-start pr-6;
}

.header-btn {
  height: 100%;
  width: 40px;
  @apply py-3;
}

.header-btn-body {
  width: 100%;
  height: 100%;
  @apply flex justify-center items-center;
}

.header-btn-body:hover {
  @apply bg-blue-100 rounded-lg;
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
  width: 160px;
  @apply flex justify-start items-center;
}
.user-info-dropdown img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  animation: breathe 16s linear infinite;
  @apply mr-4 ml-2;
}
.user-info-dropdown span {
  font-family: "jxht", sans-serif;
  @apply text-2xl;
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

.personal-menu {
  position: fixed;
  z-index: 100;
}

.personal-menu:before,
.personal-menu:after {
  content: "";
  position: fixed;
  right: 0.75rem;
  top: calc(100px - 0.5rem);
  width: 0;
  height: 0;
  background-color: rgba(80, 77, 84, 0.1);
  border-bottom-left-radius: 200%;
  z-index: -1;
  transition: border-radius linear 0.8s,
    width cubic-bezier(0.77, 0, 0.175, 1) 0.6s,
    height cubic-bezier(0.77, 0, 0.175, 1) 0.6s;
}

.personal-menu:after {
  background-color: white;
  background-image: url("/image/header/personal-dropdown.svg");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  transition-delay: 0.2s;
  box-shadow: -6px 7px 28px 0 rgba(40, 40, 40, 0.2);
}

.personal-menu:before {
  transition-delay: 0.26s;
}

.personal-menu-active.personal-menu:before,
.personal-menu-active.personal-menu:after {
  width: 250px;
  height: 350px;
  border-radius: 18px;
}

.personal-menu-active.personal-menu:after {
  -webkit-transition-delay: 0.26s;
  transition-delay: 0.26s;
}

.personal-menu-active.personal-menu:before {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
.personal-menu-active.personal-menu {
  visibility: visible;
}
.personal-menu-active .personal-menu-content {
  visibility: visible;
}
.personal-menu-content {
  position: fixed;
  right: 0.75rem;
  top: calc(100px - 0.5rem);
  width: 250px;
  height: 350px;
  visibility: hidden;
  border-radius: 18px;
  transition: all 0.3s;
}

.personal-menu-item {
  position: relative;
  display: block;
  width: 100%;
  height: 40px;
  transition-delay: 0.8s;
  opacity: 0;
  font-size: 1rem;
  letter-spacing: 2px;
  line-height: 1.2;
  transition: all 0.6s linear;
  transform: translate(30px, 0%);
  --webkit-transition: opacity 0.2s ease, --webkit-transform 0.3s ease;
  transition: opacity 0.2s ease, --webkit-transform 0.2s ease;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transition: opacity 0.2s ease, transform 0.2s ease,
    -webkit-transform 0.2s ease;
  z-index: 2;
}
.personal-menu-item-middle div {
  height: 100%;
  width: 100%;
  padding-left: 40px;
  transition: all 0.3s;
  @apply flex justify-start items-center;
}

.personal-menu-item-middle div:hover {
  padding-left: 60px;
  @apply bg-gray-100;
}
.personal-menu-item-middle div span {
  @apply ml-3 text-gray-600;
}

.personal-menu-active .personal-menu-item {
  opacity: 1;
  -webkit-transform: translateX(0%);
  transform: translateX(0%);
  -webkit-transition: opacity 0.3s ease, color 0.3s ease,
    -webkit-transform 0.3s ease;
  transition: opacity 0.3s ease, color 0.3s ease, -webkit-transform 0.3s ease;
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease,
    -webkit-transform 0.3s ease;
}

.personal-menu-active .personal-menu-item:nth-child(0) {
  transition-delay: 0.7s;
}

.personal-menu-active .personal-menu-item:nth-child(1) {
  transition-delay: 0.8s;
}

.personal-menu-active .personal-menu-item:nth-child(2) {
  transition-delay: 0.9s;
}

.personal-menu-active .personal-menu-item:nth-child(3) {
  transition-delay: 1s;
}

.personal-menu-active .personal-menu-item:nth-child(4) {
  transition-delay: 1.1s;
}

.personal-menu-userinfo {
  height: 120px;
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  z-index: 2;
  padding-left: 0;
  background-color: rgba(180, 180, 180, 0.2);
  @apply flex rounded-xl items-center;
}
.user-info-left {
  width: 80px;
  height: 80px;
  @apply flex justify-center items-center;
}
.user-info-left img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.user-info-right {
  padding-left: 10px;
  padding-top: 6px;
  @apply flex-1;
}

.user-info-right h2 {
  font-size: 1.3rem;
  font-family: "jxht", sans-serif;
}
.user-info-right h4 {
  font-weight: normal;
  font-size: 0.8rem;
  @apply text-gray-500;
}
.user-info-right h5 {
  font-size: 0.8rem;
}
.user-info-right h5:nth-child(3) {
  @apply mt-2;
}
</style>
