<template>
  <el-form ref="formRef2" :model="form" :rules="rules" class="login-form">
    <el-form-item prop="mobile">
      <el-input v-model="form.mobile" placeholder="请输入手机号">
        <template #prefix>
          <el-icon class="el-input__icon">
            <Iphone />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <div class="send-code-row">
      <div class="send-code-left">
        <el-form-item prop="mobileCode">
          <el-input v-model="form.mobileCode" placeholder="请输入短信验证码">
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </div>
      <div class="send-code-right">
        <div
          class="send-code-right-button"
          v-if="!sendMobileCodeFlag"
          @click="$emit('sendMobileCode')"
        >
          发送
        </div>
        <div class="send-code-right-number" v-if="sendMobileCodeFlag">
          {{ totalTimeout }}s
        </div>
      </div>
    </div>
  </el-form>
</template>
<script setup>
import { ref } from "vue";
const formRef2 = ref();
defineProps({
  form: {
    type: Object,
  },
  rules: {
    type: Object,
  },
  sendMobileCodeFlag: {
    type: Boolean,
  },
  totalTimeout: {
    type: Number,
  },
});
defineEmits(["sendMobileCode"]);
defineExpose({
  formRef2,
});
</script>
<style scoped>
.login-form {
  width: 250px;
}
.login-form :deep(.el-input) {
  font-size: 1rem;
}
.login-form :deep(.el-input__inner) {
  height: 40px;
}

.login-form :deep(.el-input__wrapper) {
  border-radius: 20px;
}

.send-code-row {
  @apply flex;
}
.send-code-left {
  width: 190px;
}
.send-code-right {
  width: 60px;
  @apply flex justify-end;
}

.send-code-right-button {
  width: 50px;
  height: 30px;
  border-radius: 14px;
  margin-top: 6px;
  border: 1px solid #38bdf8;
  cursor: pointer;
  @apply text-light-blue-400 flex justify-center items-center text-xs;
}

.send-code-right-number {
  width: 60px;
  height: 42px;
  font-size: 1rem;
  font-weight: bold;
  @apply text-blue-500 flex justify-center items-center;
  animation: becomeBigger 2s linear infinite;
}

@-webkit-keyframes becomeBigger {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

@keyframes becomeBigger {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
