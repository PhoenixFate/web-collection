<template>
  <el-main class="image-main" v-loading="loading">
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col
          :span="6"
          :offset="0"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-card
            shadow="always"
            class="relative mb-3"
            :body-style="{ padding: 0 }"
          >
            <el-image
              :src="item.url"
              fit="cover"
              style="width: 100%"
              :lazy="true"
              :preview-src-list="[item.url]"
              :initial-index="0"
              class="w-full h-[150px]"
            >
            </el-image>
            <div class="image-title">{{ item.name }}</div>
            <div class="flex items-center justify-center p-2">
              <el-button type="primary" size="default" text @click=""
                >重命名</el-button
              >
              <el-button type="danger" size="default" text @click=""
                >删除</el-button
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev,paper,next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.limit"
        @current-change="getImageData"
      />
    </div>
  </el-main>
</template>
<script setup>
import { reactive, ref } from "vue";
import { getImageList } from "~/api/image.js";
// 分页
const page = reactive({
  currentPage: 1,
  total: 0,
  limit: 10,
});
const list = ref([]);
const loading = ref(false);
const imageClassId = ref(0);

//获取左侧图片分类接口信息
function getImageData(p = null) {
  if (typeof p == "number") {
    page.currentPage = p;
  }
  loading.value = true;
  getImageList(Object.assign(page, { id: imageClassId.value }))
    .then((response) => {
      console.log(response);
      list.value = response.list;
      page.total = response.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 根据分类id重新加载图片列表
const loadData = (id) => {
  page.currentPage = 1;
  imageClassId.value = id;
  getImageData();
};
defineExpose({
  loadData,
});
</script>
<style scoped>
.image-main {
  position: relative;
}
.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: scroll;
}
.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
.image-title {
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>
