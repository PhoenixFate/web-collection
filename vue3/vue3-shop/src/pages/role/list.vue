<template>
  <el-card shadow="always" class="border-0">
    <!-- 新增 刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="角色名称" width="200" />
      <el-table-column prop="desc" label="角色描述" />
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
      <el-table-column label="操作" width="280" aign="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            text
            @click="openSetRule(scope.row)"
            >配置权限</el-button
          >
          <el-button
            type="primary"
            size="small"
            text
            @click="handleEdit(scope.row)"
            >修改</el-button
          >

          <el-popconfirm
            title="你确定要删除角色吗"
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input
            v-model="form.desc"
            placeholder="角色描述"
            type="textarea"
            :row="5"
          ></el-input>
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

    <!-- 权限配置 -->
    <FormDrawer
      ref="setRuleFormDrawerRef"
      title="权限配置"
      @submit="handleSetRuleSubmit"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-tree-v2
          ref="elTreeRef"
          node-key="id"
          :default-expanded-keys="defaultExpandedKeys"
          :check-strictly="checkStrictly"
          :data="ruleList"
          :props="{ label: 'name', children: 'child' }"
          show-checkbox
          :height="treeHeight"
          @check="handleTreeCheck"
        >
          <template #default="{ node, data }">
            <div class="flex items-center">
              <el-tag :type="data.menu ? '' : 'info'" size="small">
                {{ data.menu ? "菜单" : "权限" }}
              </el-tag>
              <span class="ml-2 text-sm">{{ data.name }}</span>
            </div>
          </template>
        </el-tree-v2>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
<script setup>
import {
  getRoleList,
  createRole,
  updateRole,
  deleteRole,
  updateRoleStatus,
  setRoleRules,
} from "~/api/role";
import FormDrawer from "~/components/FormDrawer.vue";
import {
  useInitializeTable,
  useInitializeCreateOrUpdateForm,
} from "~/composables/useCommon";
import ListHeader from "~/components/ListHeader.vue";
import { ref } from "vue";
import { getRuleList } from "~/api/rule";
import { showMessage } from "~/composables/util.js";

const { tableData, loading, page, getData, handleDelete, handleStatusChange } =
  useInitializeTable({
    title: "角色",
    getList: getRoleList,
    delete: deleteRole,
    updateStatus: updateRoleStatus,
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
    name: "",
    desc: "",
    status: 1,
  },
  rules: {
    name: [
      {
        required: true,
        message: "角色名称不能为空",
        trigger: "blur",
      },
    ],
  },
  getData,
  title: "角色",
  create: createRole,
  update: updateRole,
});

const setRuleFormDrawerRef = ref();
const ruleList = ref([]);
const treeHeight = ref(0);
const roleId = ref(0);

const checkStrictly = ref(false);

const defaultExpandedKeys = ref([]);
// 当前角色拥有的权限id
const ruleIds = ref([]);
const elTreeRef = ref();
const openSetRule = (row) => {
  roleId.value = row.id;
  treeHeight.value = window.innerHeight - 180;
  //请求数据之前，默认不关联
  checkStrictly.value = true;
  getRuleList(1).then((response) => {
    ruleList.value = response.list;
    defaultExpandedKeys.value = response.list.map((o) => o.id);
    setRuleFormDrawerRef.value.open();
    //获取当前角色拥有的权限id
    ruleIds.value = row.rules.map((o) => o.id);
    setTimeout(() => {
      elTreeRef.value.setCheckedKeys(ruleIds.value);
      //获得数据之后，默认为关联
      checkStrictly.value = false;
    }, 150);
  });
};

const handleTreeCheck = (...e) => {
  console.log(e);
  const { checkedKeys, halfCheckedKeys } = e[1];
  ruleIds.value = [...checkedKeys, ...halfCheckedKeys];
};

//提交按钮
const handleSetRuleSubmit = () => {
  setRuleFormDrawerRef.value.showLoading();
  setRoleRules(roleId.value, ruleIds.value)
    .then((response) => {
      showMessage("配置权限成功！");
      getData();
      setRuleFormDrawerRef.value.close();
    })
    .finally(() => {
      setRuleFormDrawerRef.value.hideLoading();
    });
};
</script>
<style lang="scss" scoped></style>
