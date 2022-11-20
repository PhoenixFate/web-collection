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
            :class="{ 'border-blue-500': item.checked }"
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
              <el-checkbox
                v-if="openChoose"
                v-model="item.checked"
                @change="handleChooseChange(item)"
              ></el-checkbox>

              <el-button
                class="ml-4"
                type="primary"
                size="default"
                text
                @click="handleEdit(item)"
                >重命名</el-button
              >
              <el-popconfirm
                title="是否要删除该图片?"
                confirmButtonText="确认"
                cancelButtonText="取消"
                @confirm="handleDelete(item.id)"
              >
                <template #reference>
                  <el-button type="danger" size="default" text>删除</el-button>
                </template>
              </el-popconfirm>
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

  <el-drawer v-model="drawer" title="上传图片">
    <UploadFile
      :data="{ image_class_id: imageClassId }"
      @success="handleUploadSuccess"
    ></UploadFile>
  </el-drawer>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import { getImageList, updateImage, deleteImage } from "~/api/image.js";
import { showPrompt, showMessage } from "~/composables/util";
import UploadFile from "~/components/UploadFile.vue";

//上传图片隐藏与显示
const drawer = ref(false);

const openUploadFile = () => {
  drawer.value = true;
};

// 分页
const page = reactive({
  currentPage: 1,
  total: 0,
  limit: 12,
});
const list = ref([]);
const loading = ref(false);
const imageClassId = ref(0);

//上传图片成功
const handleUploadSuccess = () => {
  getImageData(1);
};

//获取右侧图库列表数据
function getImageData(p = null) {
  if (typeof p == "number") {
    page.currentPage = p;
  }
  loading.value = true;
  getImageList(Object.assign(page, { id: imageClassId.value }))
    .then((response) => {
      console.log(response);
      list.value = response.list.map((o) => {
        o.checked = false;
        return o;
      });
      page.total = response.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 重命名
const handleEdit = (item) => {
  console.log(item);
  showPrompt("重命名", item.name).then(({ value }) => {
    loading.value = true;
    updateImage(item.id, value)
      .then((response) => {
        showMessage("修改成功！");
        getImageData();
      })
      .finally(() => {
        loading.value = false;
      });
  });
};

// 删除图片
const handleDelete = (id) => {
  loading.value = true;
  deleteImage([id])
    .then((res) => {
      showMessage("删除成功");
      getImageData();
    })
    .finally(() => {
      loading.value = false;
    });
};

// 根据分类id重新加载图片列表
const loadData = (id) => {
  page.currentPage = 1;
  imageClassId.value = id;
  getImageData();
};

//选中的图片
const checkedImage = computed(() => list.value.filter((o) => o.checked));
const handleChooseChange = (item) => {
  if (item.checked && checkedImage.value.length > 1) {
    item.checked = false;
    showMessage("最多只能选中一张图片", "error");
  } else {
    emit("chooseImage", checkedImage.value);
  }
};

defineProps({
  openChoose: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["chooseImage"]);

defineExpose({
  loadData,
  openUploadFile,
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
