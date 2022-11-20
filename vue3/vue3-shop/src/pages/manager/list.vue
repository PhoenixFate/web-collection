<template>
  <el-card shadow="hover" class="border-0">
    <!-- 顶部搜索 -->
    <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="关键词">
            <el-input
              v-model="searchForm.keyword"
              placeholder="管理员昵称"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="flex items-center justify-end">
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <!-- 新增 刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="管理员" width="200">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-avatar :size="40" :src="row.avatar">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <div class="ml-3">
              <h6>{{ row.username }}</h6>
              <small>ID: {{ row.id }}</small>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属管理员" align="center" width="120">
        <template #default="{ row }">
          <div>
            {{ row.role?.name || "-" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <div>
            <el-switch
              :loading="row.statusLoading"
              :disabled="row.super == 1"
              :modelValue="row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange($event, row)"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="create_time" label="发布时间" width="180" />
      <el-table-column label="操作" width="180" aign="center">
        <template #default="scope">
          <small class="text-sm text-gray-500" v-if="scope.row.super == 1"
            >暂无操作</small
          >
          <div v-else>
            <el-button
              type="primary"
              size="small"
              text
              @click="handleEdit(scope.row)"
              >修改</el-button
            >

            <el-popconfirm
              title="你确定要删除该管理员吗"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>
          </div>
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
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ChooseImage v-model="form.avatar"></ChooseImage>
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select
            v-model="form.role_id"
            placeholder="选择所属角色"
            clearable
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
<script setup>
import { ref } from "vue";
import {
  getManagerList,
  updateManagerStatus,
  createManager,
  updateManager,
  deleteManager,
} from "~/api/manager";
import FormDrawer from "~/components/FormDrawer.vue";
import ChooseImage from "~/components/ChooseImage.vue";
import {
  useInitializeTable,
  useInitializeCreateOrUpdateForm,
} from "~/composables/useCommon";
import ListHeader from "~/components/ListHeader.vue";
const roles = ref([]);
const {
  searchForm,
  tableData,
  loading,
  page,
  resetSearchForm,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitializeTable({
  title: "管理员",
  searchForm: {
    keyword: "",
  },
  getList: getManagerList,
  onGetListSuccess: (response) => {
    console.log(response);
    tableData.value = response.list.map((o) => {
      o.statusLoading = false;
      return o;
    });
    page.total = response.totalCount;
    roles.value = response.roles;
  },
  delete: deleteManager,
  updateStatus: updateManagerStatus,
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
    username: "",
    password: "",
    role_id: null,
    status: 1,
    avatar: "",
  },
  rules: {
    username: [
      {
        required: true,
        message: "用户名不能为空",
        trigger: "blur",
      },
    ],
  },
  getData,
  title: "管理员",
  update: updateManager,
  create: createManager,
});
</script>
