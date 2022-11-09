<template>
  <el-drawer
    v-model="showChangePasswordDrawer"
    :title="title"
    :size="size"
    :destroy-on-close="destoryOnClose"
    :close-on-click-modal="closeOnClickModal"
  >
    <div class="form-drawer">
      <div class="form-body">
        <!-- 插槽 -->
        <slot></slot>
      </div>
      <div class="form-actions">
        <el-button type="primary" @click="submit" :loading="loading">{{
          confirmText
        }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<!-- 使用script setup 的组件是默认关闭的，也就是通过模板ref或者$parent链获取到的组件的公开实例，
    不会暴露任何在script setup中声明的绑定 -->
<script setup>
import { ref } from "vue";
const showChangePasswordDrawer = ref(false);
// 打开窗口
const open = () => {
  showChangePasswordDrawer.value = true;
};
// 关闭窗口
const close = () => {
  showChangePasswordDrawer.value = false;
};

const loading = ref(false);

const showLoading = () => {
  loading.value = true;
};

const hideLoading = () => {
  loading.value = false;
};

const submit = () => {
  emit("submit");
};

// 为了在script setup组件中明确要暴露出去的属性，需要使用defineExpose编译器宏
// 向父组件暴露以下方法
// 只有在script setup中才内置了defineExpose，其他中需要import defineExpose
defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
});

// 在script setup中必须使用defineProps和defineEmits api来声明props和emits，
// 在script setup中可以直接使用defineProps和defineEmits
const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "45%",
  },
  destoryOnClose: {
    type: Boolean,
    default: false,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "提交",
  },
});

const emit = defineEmits(["submit"]);
</script>
<style>
.form-drawer {
  height: 100%;
  width: 100%;
  position: relative;
  @apply flex flex-col;
}
.form-drawer .form-body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
.form-drawer .form-actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
