<template>
  <!-- 行提供 gutter 属性来指定列之间的间距，其默认值为0 -->
  <el-row :gutter="0" class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>此站点是 vue3+vite 商城后端管理项目前端</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#626aef"
            class="w-[250px]"
            type="primary"
            @click="onSubmit()"
            :loading="loading"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
//如果在main.js中统一引入了element-plus-icons，则不需要单独引入某个icon
// import { Lock, User } from "@element-plus/icons-vue";

// 在vue3 setup中，不能通过this.$router.push来跳转页面
// 而应该通过引入useRouter创建router实例来跳转页面
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { showMessage } from "~/composables/util";

const router = useRouter();
const store = useStore();
const form = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度必须为3-20", trigger: "blur" },
  ],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
};

const formRef = ref();

const loading = ref(false);

const onSubmit = () => {
  formRef.value.validate((valid) => {
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
};

function onKeyUp(e) {
  if(e.key==='Enter') onSubmit()
}

// 添加键盘监听事件
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});
// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
</script>
<style scoped>
.login-container {
  @apply bg-indigo-500 min-h-screen;
}

.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}

.login-container .right {
  @apply flex-col bg-light-50;
}

.left > div > div {
  @apply font-bold text-5xl text-light-50 mb-4;
}

.left > div > div:last-child {
  @apply text-gray-200 text-sm;
}

.right .title {
  @apply font-bold text-3xl text-gray-800;
}

.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
