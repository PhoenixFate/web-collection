<template>
  <el-card shadow="always" class="border-0">
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
    <el-tree
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
      v-loading="loading"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <el-tag size="small" :type="data.menu ? '' : 'info'">
            {{ data.menu ? "菜单" : "权限" }}
          </el-tag>
          <el-icon v-if="data.icon" :size="16" class="ml-2">
            <component :is="data.icon"></component>
          </el-icon>
          <span class="ml-2">{{ data.name }}</span>
          <div class="ml-auto">
            <el-switch
              :modelValue="data.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange($event, data)"
            >
            </el-switch>
            <el-button
              text
              type="primary"
              size="small"
              @click.stop="addChild(data.id)"
              >新增</el-button
            >
            <el-button
              text
              type="warning"
              size="small"
              @click.stop="handleEdit(data)"
              >修改</el-button
            >

            <el-popconfirm
              title="你确定要删除该管理员吗"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="handleDelete(data.id)"
            >
              <template #reference>
                <el-button text type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>
    </el-tree>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="120px"
        :inline="false"
      >
        <el-form-item label="上级菜单" prop="rule_id">
          {{ form.rule_id }}
          <el-cascader
            :options="dropdownRules"
            v-model="form.rule_id"
            clearable
            :props="{
              value: 'id',
              label: 'name',
              children: 'child',
              checkStrictly: true,
              emitPath: false,
            }"
            placeholder="请选择上级菜单"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="菜单/规则" prop="menu">
          <el-radio-group v-model="form.menu">
            <el-radio :label="1"> 菜单 </el-radio>
            <el-radio :label="0"> 规则 </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单/权限名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-if="form.menu == 1">
          <IconSelect v-model="form.icon"></IconSelect>
        </el-form-item>
        <el-form-item
          label="前端路由"
          prop="frontpath"
          v-if="form.menu == 1 && form.rule_id > 0"
        >
          <el-input
            v-model="form.frontpath"
            placeholder="请输入前端路由"
          ></el-input>
        </el-form-item>
        <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0">
          <el-input
            v-model="form.condition"
            placeholder="请输入后端规则"
          ></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="method" v-if="form.menu == 0">
          <el-select v-model="form.method" placeholder="请选择请求方式">
            <el-option
              v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
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
  </el-card>
</template>
<script setup>
import { ref } from "vue";
import ListHeader from "~/components/ListHeader.vue";
import {
  getRuleList,
  createRule,
  updateRule,
  deleteRule,
  updateRuleStatus,
} from "~/api/rule.js";
import {
  useInitializeTable,
  useInitializeCreateOrUpdateForm,
} from "~/composables/useCommon.js";
import FormDrawer from "~/components/FormDrawer.vue";
import IconSelect from "~/components/IconSelect.vue";

const defaultExpandedKeys = ref([]);

const dropdownRules = ref([]);

const { tableData, loading, getData, handleDelete, handleStatusChange } =
  useInitializeTable({
    getList: getRuleList,
    onGetListSuccess: (response) => {
      console.log(response);
      dropdownRules.value = response.rules;
      tableData.value = response.list;
      defaultExpandedKeys.value = response.list.map((o) => o.id);
    },
    delete: deleteRule,
    updateStatus: updateRuleStatus,
    title: "菜单权限",
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
    rule_id: 0,
    menu: 0,
    name: "",
    condition: "",
    method: "GET",
    status: 1,
    order: 50,
    icon: "",
    frontPath: "",
  },
  rules: {},
  getData,
  title: "菜单权限",
  create: createRule,
  update: updateRule,
});

// 增加子分类
const addChild = (id) => {
  //先触发表单，handleCreate中会先重置表单
  handleCreate();
  form.rule_id = id;
  form.status = 1;
};
</script>
<style scoped>
:deep(.el-tree-node__label) {
  flex: 1;
}
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-right: 8px;
}
:deep(.el-tree-node__content) {
  padding: 20px 0;
}
</style>
