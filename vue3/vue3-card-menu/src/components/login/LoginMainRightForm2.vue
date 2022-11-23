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
          <span
            :class="{ 'send-code-right-number-animate': numberTenAnimateFlag }"
            >{{ parseInt(totalTimeout / 10) }}</span
          ><span
            :class="{ 'send-code-right-number-animate': numberAnimateFlag }"
            >{{ totalTimeout % 10 }}</span
          ><span>s</span>
        </div>
      </div>
    </div>
  </el-form>
</template>
<script setup>
import { ref, watch } from "vue";
const formRef2 = ref();
const numberAnimateFlag = ref(false);
const numberTenAnimateFlag = ref(false);

const props = defineProps({
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
watch(
  () => props.totalTimeout,
  (newValue, oldValue) => {
    numberAnimateFlag.value = true;
    setTimeout(() => {
      numberAnimateFlag.value = false;
    }, 500);
  }
);
watch(
  () => parseInt(props.totalTimeout / 10),
  (newValue, oldValue) => {
    numberTenAnimateFlag.value = true;
    setTimeout(() => {
      numberTenAnimateFlag.value = false;
    }, 500);
  }
);
defineEmits(["sendMobileCode"]);
defineExpose({
  formRef2,
});
</script>
<style scoped>
.login-form {
  width: 250px;
  margin-right: 40px;
}
.login-form :deep(.el-input) {
  font-size: 0.9rem;
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
  margin-right: 1px;
  @apply text-light-blue-400 flex justify-center items-center text-xs;
}

.send-code-right-number {
  width: 60px;
  height: 42px;
  font-size: 1.1rem;
  font-weight: bold;
  @apply text-blue-500 flex justify-center items-center;
}

.send-code-right-number-animate {
  animation: bounce2 0.5s ease-in infinite;
}

@keyframes bounce2 {
  from,
  to {
    animation-timing-function: ease-in;
    transform: translate(0, 0);
  }

  33% {
    animation-timing-function: ease-out;
    transform: translate(0.1rem, 0.1rem);
  }

  67% {
    animation-timing-function: ease-in;
    transform: translate(-0.05rem, -0.05rem);
  }
}
</style>
