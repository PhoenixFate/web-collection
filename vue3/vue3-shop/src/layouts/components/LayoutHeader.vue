<template>
  <div class="flex layout-header">
    <span class="logo">
      <el-icon class="mr-2"> <Pear /> </el-icon>Vue3-Shop
    </span>
    <el-tooltip effect="dark" content="折叠菜单" placement="bottom" v-if="$store.state.asideWidth == '250px'">
      <el-icon class="icon-btn" @click="collpaseMenu()">
        <Fold  />
      </el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="展开菜单" placement="bottom" v-else>
      <el-icon class="icon-btn" @click="extendMenu()">
        <Expand/>
      </el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh()">
        <Refresh />
      </el-icon>
    </el-tooltip>

    <!-- ml-auto = margin-left:auto -->
    <div class="ml-auto flex justify-center items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn mr-4" @click="toggle()">
          <FullScreen v-if="!isFullscreen" /><Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="46" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
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
</template>
<script setup>
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "~/components/FormDrawer.vue";
import { useChangePassword } from "~/composables/useManager";
import { useLogout } from "~/composables/useManager";
import { useStore } from "vuex";
const store = useStore();
const {
  // 是否是全屏
  isFullscreen,
  // 切换全屏
  toggle,
} = useFullscreen();

const {
  formDrawerRef,
  form,
  rules,
  formRef,
  onSubmitChangePassword,
  openChangePasswordForm,
} = useChangePassword();

function handleRefresh() {
  //原生js
  location.reload();
}

const collpaseMenu = () => {
  store.commit("HANDLE_ASIDE_WIDTH");
  setTimeout(()=>{
    store.commit("COLLAPSE_MENU");
  },500)
};

const extendMenu=()=>{
  store.commit("HANDLE_ASIDE_WIDTH");
  setTimeout(()=>{
    store.commit("COLLAPSE_MENU");
  },160)
}

const { handlerLogout } = useLogout;

function toPersonal() {}

const handleCommand = (command) => {
  console.log(command);
  switch (command) {
    case "logout":
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
<style scoped>
.layout-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 pr-5;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.layout-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center;
}
</style>
