<template>
  <div class="right-header-top">
    <div class="header-btn">
      <el-tooltip effect="dark" content="折叠与展开菜单" placement="bottom">
        <div class="header-btn-body" @click="toggleMenu()">
          <div
            class="umbrella"
            :class="{ 'umbrella-active': !$store.state.isCollapse }"
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
          <el-icon class="icon-btn" :size="24">
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
              <el-icon :size="24">
                <FullScreen color="#555" />
              </el-icon>
            </div>
          </el-tooltip>
        </div>
        <div class="header-btn" v-if="isFullscreen">
          <el-tooltip effect="dark" content="退出全屏" placement="bottom">
            <div class="header-btn-body" @click="toggle()">
              <el-icon :size="24">
                <Aim color="#555" />
              </el-icon>
            </div>
          </el-tooltip>
        </div>
      </div>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-gray-800">
          <el-avatar
            class="mr-3 user-avatar"
            :size="62"
            :src="$store.state.user.avatar"
          />
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
      </el-dropdown>
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
import { useChangePassword,useLogout } from "~/composables/useManager";
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
  store.commit("HANDLE_ASIDE_WIDTH");
  store.commit("COLLAPSE_MENU");
};

const { handlerLogout } = useLogout();

const toPersonal=()=>{
  console.log("to personal")
}

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

.user-avatar {
  animation: breathe 16s linear infinite;
}

.user-info {
  width: 80px;
  @apply flex justify-center items-center flex-col;
}
.user-info span:nth-child(1) {
  font-family: "jxht", sans-serif;
  @apply mb-1 text-xl;
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
</style>
