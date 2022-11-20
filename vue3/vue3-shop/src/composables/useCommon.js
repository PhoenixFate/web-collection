import { ref, reactive, computed } from "vue";
import { showMessage } from "~/composables/util";

// 列表、分页、搜索统一封装
export function useInitializeTable(option = {}) {
  let searchForm = null;
  let resetSearchForm = null;
  if (option.searchForm) {
    //这里一定要用解构的形式，否则传入的是个引用，下面无法resetSearchForm
    searchForm = reactive({ ...option.searchForm });
    resetSearchForm = () => {
      for (const key in option.searchForm) {
        searchForm[key] = option.searchForm[key];
      }
      getData();
    };
  }

  const tableData = ref([]);
  const loading = ref(false);
  // 分页
  const page = reactive({
    currentPage: 1,
    total: 0,
    limit: 10,
  });

  function getData(p = null) {
    if (typeof p == "number") {
      page.currentPage = p;
    }
    loading.value = true;
    option
      .getList(
        page.currentPage,
        Object.assign(searchForm ? searchForm : {}, { limit: page.limit })
      )
      .then((response) => {
        if (
          option.onGetListSuccess &&
          typeof option.onGetListSuccess == "function"
        ) {
          option.onGetListSuccess(response);
        } else {
          tableData.value = response.list;
          page.total = response.totalCount;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
  getData();

 // 删除
 const handleDelete = (id) => {
    loading.value = true;
    option
      .delete(id)
      .then((response) => {
        showMessage(`删除${option.title}成功`);
        getData();
      })
      .finally(() => {
        loading.value = false;
      });
  };

  //修改状态
  const handleStatusChange = (status, row) => {
    row.statusLoading = true;
    option
      .updateStatus(row.id, status)
      .then((response) => {
        showMessage(`修改${option.title}状态成功`);
        row.status = status;
      })
      .finally(() => {
        row.statusLoading = false;
      });
  };

  return {
    searchForm,
    tableData,
    loading,
    page,
    resetSearchForm,
    getData,
    handleDelete,
    handleStatusChange
  };
}

// 新增和修改统一封装
export function useInitializeCreateOrUpdateForm(option = {}) {
  const form = reactive({ ...option.form });
  const editId = ref(0);
  const drawerTitle = computed(() => {
    return (editId.value ? "修改" : "新增") + option.title;
  });

  const formDrawerRef = ref();
  const formRef = ref();
  const rules = option.rules || {};

  // 提交新增表单
  const handleSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) return;
      //提交按钮的loading
      formDrawerRef.value.showLoading();

      //根据新增还是修改调用不同的接口
      const fun = editId.value
        ? option.update(editId.value, form)
        : option.create(form);
      fun
        .then((response) => {
          showMessage(drawerTitle.value + "成功！");
          //新增刷新第一页，修改刷新当前页面
          option.getData(editId.value ? false : 1);
          formDrawerRef.value.close();
        })
        .finally(() => {
          formDrawerRef.value.hideLoading();
        });
    });
  };

  // 重置表单
  const resetForm = (item = false) => {
    if (formRef.value) {
      formRef.value.clearValidate();
    }
    if (item) {
      for (const key in form) {
        form[key] = item[key];
      }
    }
  };

  // 打开新增表单--表单弹出框
  const handleCreate = () => {
    editId.value = 0;
    resetForm({
      ...option.form,
    });
    formDrawerRef.value.open();
  };
  // 修改表单内容
  const handleEdit = (item) => {
    console.log(item)
    editId.value = item.id;
    resetForm(item);
    formDrawerRef.value.open();
  };

  return {
    form,
    drawerTitle,
    formDrawerRef,
    formRef,
    rules,
    handleSubmit,
    handleCreate,
    handleEdit,
  };
}
