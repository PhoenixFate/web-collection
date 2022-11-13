import { ref, reactive } from "vue";
import { updatePassword } from "~/api/manager";
import { showMessage, showMessageBox } from "~/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export function useChangePassword() {
  const router = useRouter();
  const store = useStore();
  const formDrawerRef = ref();
  const form = reactive({
    oldPassword: "",
    newPassword: "",
    checkNewPassword: "",
  });
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
  const onSubmitChangePassword = () => {
    formRef.value.validate((valid) => {
      console.log(valid);
      if (!valid) {
        return false;
      }
      console.log("验证通过");
      //显示正在加载
      formDrawerRef.value.showLoading();
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
          formDrawerRef.value.hideLoading();
        });
    });
  };
  const openChangePasswordForm = () => {
    //调用子组件的方法
    formDrawerRef.value.open();
  };
  return {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmitChangePassword,
    openChangePasswordForm,
  };
}

export function useLogin() {
  const loginType = ref("username");
  const sendMobileCodeFlag = ref(false);

  const router = useRouter();
  const store = useStore();
  const form = reactive({
    username: "",
    password: "",
    mobile: "",
    mobileCode: "",
  });
  const totalTimeout = ref(60);

  const rules1 = {
    username: [
      { required: true, message: "用户名不能为空", trigger: "blur" },
      { min: 3, max: 20, message: "用户名长度必须为3-20", trigger: "blur" },
    ],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  };

  const rules2 = {
    mobile: [
      { required: true, message: "手机号不能为空", trigger: "blur" },
      { min: 11, max: 11, message: "手机号长度必须为11位", trigger: "blur" },
    ],
    mobileCode: [
      { required: true, message: "手机验证码不能为空", trigger: "blur" },
    ],
  };

  const formRef1 = ref();
  const formRef2 = ref();

  const loading = ref(false);

  const sendMobileCode = () => {
    //当前已经发送了，60秒之内不能再次发送
    if (!sendMobileCodeFlag) return;
    sendMobileCodeFlag.value = true;
    let clock = window.setInterval(() => {
      totalTimeout.value--;
      if (totalTimeout.value < 0) {
        //60秒之后可以重新发送
        window.clearInterval(clock);
        totalTimeout.value = 60;
        sendMobileCodeFlag.value = false;
      }
    }, 1000);
  };

  const chooseLoginType = (type) => {
    loginType.value = type;
  };

  const onSubmit = () => {
    console.log(form)
    if (loginType.value == "username") {
      formRef1.value.formRef1.validate((valid) => {
        if (!valid) {
          return false;
        }
        //显示正在加载
        loading.value = true;
        store
          .dispatch("loginAction", form)
          .then((response) => {
            //跳转到首页
            //提示成功
            showMessage("登录成功", "success");
            router.push("/loading");
          })
          .finally(() => {
            //取消正在加载
            loading.value = false;
          });
      });
    } else if (loginType.value == "mobile") {
      formRef2.value.formRef2.validate((valid) => {
        if (!valid) {
          return false;
        }
        //显示正在加载
        loading.value = true;
        store
          .dispatch("loginAction", form)
          .then((response) => {
            //跳转到首页
            //提示成功
            showMessage("登录成功", "success");
            router.push("/loading");
          })
          .finally(() => {
            //取消正在加载
            loading.value = false;
          });
      });
    }
  };

  return {
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
    onSubmit
  }
}

export function useLogout() {
  const router = useRouter();
  const store = useStore();
  function handlerLogout() {
    showMessageBox("是否要退出登录？").then(() => {
      //用户点击了确认
      console.log("用户退出登录");
      store.dispatch("logoutAction").then(() => {
        //返回首页
        router.push("/login");
        //提示退出登录成功
        showMessage("退出登录成功", "success");
        //当前router中有上个用户的信息，需要清除router中的路由
      });
    });
  }
  return {
    handlerLogout,
  };
}
