<template>
  <el-form :model="form" :rules="rules" ref="formRef1" class="login-form">
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
  </el-form>
</template>
<script setup>
import { ref } from "vue";
const formRef1 = ref();
defineProps({
  form: {
    type: Object,
  },
  rules: {
    type: Object,
  },
});
defineExpose({
  formRef1,
});
</script>
<style scoped>
.login-form {
  width: 250px;
}
.login-form :deep(.el-input__inner) {
  height: 40px;
}

.login-form :deep(.el-input__wrapper) {
  border-radius: 20px;
}
</style>
