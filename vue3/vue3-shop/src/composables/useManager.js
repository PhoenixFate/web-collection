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
      });
    });
  }
  return {
    handlerLogout,
  };
}
