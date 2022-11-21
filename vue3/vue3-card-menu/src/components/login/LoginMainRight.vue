<template>
  <div class="login-main-right">
    <LoginMainRightTitle></LoginMainRightTitle>
    <LoginMainRightType
      :loginType="loginType"
      @chooseLoginType="chooseLoginType"
    ></LoginMainRightType>

    <div class="login-form">
      <div class="login-form-content">
        <LoginMainRightFrom1
          :form="form"
          ref="formRef1"
          class="mb-2 float-left"
          :class="{'login-form-username':loginType == 'username'}"
          :rules="rules1"
        ></LoginMainRightFrom1>
        <LoginMainRightFrom2
          :form="form"
          class="mb-2 float-right"
          ref="formRef2"
          :class="{'login-form-mobile':loginType == 'mobile'}"
          :rules="rules2"
          :sendMobileCodeFlag="sendMobileCodeFlag"
          :totalTimeout="totalTimeout"
          @sendMobileCode="sendMobileCode"
        ></LoginMainRightFrom2>
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

const isChrome = ref(false);
// 添加键盘监听事件
onMounted(() => {
  console.log("-----login mounted-------");
  console.log(navigator.userAgent);
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
.login-form {
  width: 250px;
  height: 126px;
  overflow: hidden;
  .login-form-content {
    width: 540px;
    height: 126px;
    transition: all .3s ease-in-out;
  }
  .login-form-content:has(.login-form-username){
    transform: translateX(0)
  }
  .login-form-content:has(.login-form-mobile){
    transform: translateX(-290px)
  }
}

</style>
