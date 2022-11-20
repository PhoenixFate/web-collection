<template>
  <div v-if="modelValue">
    <el-image
      :src="modelValue"
      fit="cover"
      class="w-[100px] h-[100px] rounded border"
    ></el-image>
  </div>
  <div class="choose-image-btn" @click="open()">
    <el-icon :size="25" class="text-gray-500"><Plus /> </el-icon>
  </div>
  <el-dialog title="选中图片" v-model="dialogVisable" width="80%" top="5vh">
    <el-container class="bg-white rounded" style="height: 70vh">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate"
          >新增图片分类</el-button
        >
        <el-button type="warning" size="small" @click="handleUploadImage"
          >上传图片</el-button
        >
      </el-header>
      <el-container>
        <ImageAside ref="imageAsideRef" @change="handleAsideChange" />
        <ImageMain
          ref="imageMainRef"
          @chooseImage="chooseImage"
          :openChoose="true"
        />
      </el-container>
    </el-container>
    <template #footer>
      <span>
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import ImageAside from "~/components/image/ImageAside.vue";
import ImageMain from "~/components/image/ImageMain.vue";
const dialogVisable = ref(false);
const open = () => {
  dialogVisable.value = true;
};
const close = () => {
  dialogVisable.value = false;
};

const imageAsideRef = ref(null);
const imageMainRef = ref(null);
const handleOpenCreate = () => {
  imageAsideRef.value.handleCreate();
};
const handleAsideChange = (imageClassId) => {
  imageMainRef.value.loadData(imageClassId);
};
const handleUploadImage = () => {
  imageMainRef.value.openUploadFile();
};

const prpos = defineProps({
  modelValue: [String, Array],
});

const emits = defineEmits(["update:modelValue"]);

let urls = [];
const chooseImage = (e) => {
  urls = e.map((o) => o.url);
};

const submit = () => {
  console.log(urls);
  if (urls.length) {
    console.log("update:modelValue");
    emits("update:modelValue", urls[0]);
    close();
  }
};
</script>
<style scoped>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}
.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
</style>
