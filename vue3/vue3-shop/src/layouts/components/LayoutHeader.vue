<template>
  <div class="flex layout-header">
    <span class="logo">
      <el-icon class="mr-2"> <Pear /> </el-icon>Vue3-Shop
    </span>
    <el-tooltip effect="dark" content="折叠菜单" placement="bottom">
      <el-icon class="icon-btn">
        <Fold />
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
  <el-drawer
    v-model="showChangePasswordDrawer"
    title="修改密码"
    size="45%"
    :close-on-click-modal="false"
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
      <el-form-item>
        <el-button
          class="w-[250px]"
          type="primary"
          @click="onSubmitChangePassword"
          :loading="changePasswordLoading"
          >提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup>
import { showMessageBox, showMessage } from "~/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import { useFullscreen } from "@vueuse/core";
import { updatePassword } from "~/api/manager";
const {
  // 是否是全屏
  isFullscreen,
  // 切换全屏
  toggle,
} = useFullscreen();

const router = useRouter();
const store = useStore();

const showChangePasswordDrawer = ref(false);

const form = reactive({
  oldPassword: "",
  newPassword: "",
  checkNewPassword: "",
});
const changePasswordLoading = ref(false);

const rules = {
  oldPassword: [
    { required: true, message: "原密码不能为空", trigger: "blur" },
    { min: 3, max: 30, message: "原密码长度必须为6-30", trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: "新密码不能为空", trigger: "blur" },
    { min: 3, max: 30, message: "新密码长度必须为6-30", trigger: "blur" },
  ],
  checkNewPassword: [
    { required: true, message: "确认密码不能为空", trigger: "blur" },
    { min: 3, max: 30, message: "确认密码长度必须为6-30", trigger: "blur" },
  ],
};

const formRef = ref();
function handlerLogout() {
  showMessageBox("是否要退出登录？").then(() => {
    //用户点击了确认
    console.log("用户退出登录");
    store.dispatch("logoutAction").then(() => {
      //返回首页
      router.push("/login");
      //提示退出登录成功
      showMessage("退出登录成功", "success");
    });
  });
}

function handleRefresh() {
  //原生js
  location.reload();
}

function toPersonal() {}

const onSubmitChangePassword = () => {
  formRef.value.validate((valid) => {
    console.log(valid);
    if (!valid) {
      return false;
    }
    console.log("验证通过");
    //显示正在加载
    changePasswordLoading.value = true;
    updatePassword(form)
      .then((response) => {
        showMessage("修改密码成功，请重新登录");
        //退出登录
        store.dispatch("logoutAction");
        //跳转回登录页
        router.push("/push");
      })
      .finally(() => {
        //取消正在加载
        changePasswordLoading.value = false;
      });
  });
};

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
      showChangePasswordDrawer.value = true;
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
