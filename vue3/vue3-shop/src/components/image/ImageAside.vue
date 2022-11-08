<template>
  <el-aside width="200px" class="image-aside" v-loading="loading">
    <div class="top">
      <AsideList
        :active="activeId == item.id"
        v-for="(item, index) in list"
        :key="index"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
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
  <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="140px"
      :inline="false"
    >
      <el-form-item label="图库分类名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number
          v-model="form.order"
          :min="0"
          :max="1000"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>
<script setup>
import { ref, reactive } from "vue";
import AsideList from "~/components/image/AsideList.vue";
import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass,
} from "~/api/imageClass.js";
import FormDrawer from "~/components/FormDrawer.vue";

import { showMessage } from "~/composables/util.js";
import { computed } from "@vue/reactivity";

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
const formDrawerRef = ref(null);
const editId = ref(0);
const drawerTitle = computed(() => {
  if (editId.value > 0) return "修改";
  else return "新增";
});
const handleCreate = () => {
  editId.value = 0;
  form.name = "";
  form.order = 50;
  formDrawerRef.value.open();
};
const rules = reactive({
  name: [
    {
      required: true,
      message: "图库分类名称不能为空",
      trigger: "blur",
    },
  ],
});

const form = reactive({
  name: "",
  order: 50,
});

const formRef = ref(null);

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;
    formDrawerRef.value.showLoading();
    const fun = editId.value
      ? updateImageClass(editId.value, form)
      : createImageClass(form);
    fun
      .then((response) => {
        //提示新增成功
        showMessage(drawerTitle.value + "成功");
        //重新加载数据(新增加载第一页数据，修改加载当前页的数据)
        getImageClassData(editId.value ? page.currentPage : 1);
        //关闭新增页面
        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoading();
      });
  });
};

//获取左侧图片分类接口信息
function getImageClassData(p = null) {
  if (typeof p == "number") {
    page.currentPage = p;
  }
  loading.value = true;
  getImageClassList(page)
    .then((response) => {
      console.log(response);
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

//编辑图库分类
const handleEdit = (row) => {
  console.log(row);
  form.name = row.name;
  form.order = row.order;
  editId.value = row.id;
  formDrawerRef.value.open();
};

//删除图库分类
const handleDelete = (id) => {
  loading.value = true;
  deleteImageClass(id)
    .then((response) => {
        showMessage("删除成功")
        getImageClassData()
    })
    .finally(() => {
      loading.value = false;
    });
};

defineExpose({
  handleCreate,
});
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
