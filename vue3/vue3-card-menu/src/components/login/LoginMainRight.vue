<template>
  <div class="login-main-right">
    <LoginMainRightTitle></LoginMainRightTitle>
    <LoginMainRightType
      :loginType="loginType"
      @chooseLoginType="chooseLoginType"
    ></LoginMainRightType>
    <div class="login-form-main">
      <div class="login-form-content">
        <LoginMainRightFrom1
          :form="form"
          ref="formRef1"
          class="float-left"
          :class="{ 'login-form-username': loginType == 'username' }"
          :rules="rules1"
        ></LoginMainRightFrom1>
        <LoginMainRightFrom2
          :form="form"
          class="float-right"
          ref="formRef2"
          :class="{ 'login-form-mobile': loginType == 'mobile' }"
          :rules="rules2"
          :sendMobileCodeFlag="sendMobileCodeFlag"
          :totalTimeout="totalTimeout"
          @sendMobileCode="sendMobileCode"
        ></LoginMainRightFrom2>
      </div>
      <div class="login-type">
        <CheckBox
          @inputChange="inputChange1"
          v-model:checkBoxChecked="keepLogin"
          :scale="0.74"
        ></CheckBox>
        <span class="mr-5" :class="{ 'text-selected': keepLogin }"
          >保持登录</span
        >
        <CheckBox
          @inputChange="inputChange2"
          v-model:checkBoxChecked="loginSuperAdmin"
          :scale="0.74"
        ></CheckBox>
        <span :class="{ 'text-selected': loginSuperAdmin }">超级管理员</span>
      </div>
    </div>
    <LoginSubmit :loading="loading" @onSubmit="onSubmit"></LoginSubmit>
    <LoginNotChrome v-if="!isChrome"></LoginNotChrome>
  </div>
</template>
<script setup>
import LoginMainRightTitle from "~/components/login/LoginMainRightTitle.vue";
import LoginMainRightType from "~/components/login/LoginMainRightType.vue";
import LoginNotChrome from "~/components/login/LoginNotChrome.vue";
import LoginSubmit from "./LoginSubmit.vue";
import LoginMainRightFrom1 from "~/components/login/LoginMainRightForm1.vue";
import LoginMainRightFrom2 from "~/components/login/LoginMainRightForm2.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useLogin } from "~/composables/useManager";
import CheckBox from "~/components/common/CheckBox.vue";

const {
  loginType,
  sendMobileCodeFlag,
  form,
  totalTimeout,
  rules1,
  rules2,
  formRef1,
  formRef2,
  loading,
  sendMobileCode,
  chooseLoginType,
  onSubmit,
} = useLogin();

function onKeyUp(e) {
  if (e.key === "Enter") onSubmit();
}

const keepLogin = ref(true);
const loginSuperAdmin = ref(false);

const inputChange1 = (e) => {
  console.log(keepLogin.value);
  console.log("bbb1");
};

const inputChange2 = (e) => {
  console.log("bbb");
};

const isChrome = ref(false);
// 添加键盘监听事件
onMounted(() => {
  if (navigator.userAgent.indexOf("Chrome") > -1) {
    //是谷歌浏览器
    isChrome.value = true;
  } else {
    //不是谷歌浏览器
    isChrome.value = false;
  }
  document.addEventListener("keyup", onKeyUp);
});
// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
</script>
<style scoped lang="scss">
.login-main-right {
  width: 50%;
  height: 100%;
  position: relative;
  @apply flex flex-col items-center justify-center pb-6;
}
.login-form-main {
  width: 340px;
  height: 166px;
  overflow: hidden;
  .login-type {
    height: 30px;
    width: 250px;
    margin-left: 45px;
    font-size: 0.6rem;
    @apply flex justify-start items-center  pl-4 text-gray-300;
    .text-selected {
      @apply text-blue-300;
    }
  }
  .login-form-content {
    width: 630px;
    height: 126px;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .login-form-content:has(.login-form-username) {
    transform: translateX(5px);
  }
  .login-form-content:has(.login-form-mobile) {
    transform: translateX(-295px);
  }
}
</style>
