<template>
  <el-aside width="200px" class="image-aside" v-loading="loading">
    <div class="top">
      <AsideList
        :active="activeId == item.id"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item.name }}
      </AsideList>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.limit"
        @current-change="getImageClassData"
      />
    </div>
  </el-aside>
  <FormDrawer title="新增" ref="formDrawerRef" @submit="handleSubmit">
    
    
  </FormDrawer>
</template>
<script setup>
import { ref, reactive } from "vue";
import AsideList from "@/components/image/AsideList.vue";
import { getImageClassList } from "@/api/imageClass.js";
import FormDrawer from "@/components/FormDrawer.vue";
// 加载动画
const loading = ref(false);
const list = ref([]);
const activeId = ref(0);

// 分页
const page = reactive({
  currentPage: 1,
  total: 0,
  limit: 10,
});
const formDrawerRef=ref(null)

const handleCreate=()=>{
  formDrawerRef.value.open()
}

const handleSubmit=()=>{
  console.log("提交表单")
}


//获取左侧图片分类接口信息
function getImageClassData(p = null) {
  console.log(p);
  console.log(typeof p);
  if (typeof p == "number") {
    page.currentPage = p;
  }
  loading.value = true;
  getImageClassList(page)
    .then((response) => {
      list.value = response.list;
      page.total = response.totalCount;
      if (list.value && list.value.length > 0) {
        let item = list.value[0];
        if (item) {
          activeId.value = item.id;
        }
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
getImageClassData();

defineExpose({
  handleCreate
})

</script>
<style scoped>
.image-aside {
  border-right: 1px solid #eee;
  position: relative;
}
.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: scroll;
}
.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>
