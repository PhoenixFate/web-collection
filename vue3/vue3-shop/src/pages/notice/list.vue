<template>
  <el-card shadow="always" class="border-0">
    <!-- 新增 刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="公告标题" width="200" />
      <el-table-column prop="content" label="公告内容" />
      <el-table-column prop="create_time" label="发布时间" width="180" />
      <el-table-column label="操作" width="180" aign="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            text
            @click="handleEdit(scope.row)"
            >修改</el-button
          >

          <el-popconfirm
            title="你确定要删除公告吗"
            confirmButtonText="确认"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex items-center justify-center mt-5">
      <el-pagination
        background
        layout="prev,pager,next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.limit"
        @current-change="getData"
      />
    </div>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            v-model="form.content"
            placeholder="公告内容"
            type="textarea"
            :row="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
<script setup>
import {
  getNoticeList,
  createNotice,
  updateNotice,
  deleteNotice,
} from "~/api/notice";
import FormDrawer from "~/components/FormDrawer.vue";
import {
  useInitializeTable,
  useInitializeCreateOrUpdateForm,
} from "~/composables/useCommon";
import ListHeader from "~/components/ListHeader.vue";

const { tableData, loading, page, getData, handleDelete } = useInitializeTable({
  title: "公告",
  getList: getNoticeList,
  delete: deleteNotice,
});

const {
  form,
  drawerTitle,
  formDrawerRef,
  formRef,
  rules,
  handleSubmit,
  handleCreate,
  handleEdit,
} = useInitializeCreateOrUpdateForm({
  form: {
    title: "",
    content: "",
  },
  rules: {
    title: [
      {
        required: true,
        message: "公告标题不能为空",
        trigger: "blur",
      },
    ],
    content: [
      {
        required: true,
        message: "公告内容不能为空",
        trigger: "blur",
      },
    ],
  },
  getData,
  title: "公告",
  create: createNotice,
  update: updateNotice,
});
</script>
