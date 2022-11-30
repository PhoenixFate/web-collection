<template>
  <div>
    <el-row :gutter="20">
      <template v-if="!panels || panels.length == 0">
        <el-col :span="6" :offset="0" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card
                shadow="always"
                class="border-0 index-card"
                :body-style="{ padding: '20px' }"
              >
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 30%" />
                    <el-skeleton-item variant="text" style="width: 20%" />
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 50%" />
                <el-divider />
                <div class="flex justify-between">
                  <el-skeleton-item variant="text" style="width: 30%" />
                  <el-skeleton-item variant="text" style="width: 20%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <el-col
        :span="6"
        :offset="0"
        v-for="(item, index) in panels"
        :key="index"
      >
        <el-card
          shadow="always"
          class="border-0 index-card"
          :body-style="{ padding: '20px' }"
        >
          <template #header>
            <div class="flex justify-between">
              <span>
                {{ item.title }}
              </span>
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <!-- {{ item.value }} -->
            <!-- 基于gas的封装的数字滚动动画 -->
            <CountTo :value="item.value"></CountTo>
          </span>
          <el-divider />
          <div class="flex justify-between">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <IndexNavs />

    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <IndexChart v-permission="['getStatistics3,GET']"/>
      </el-col>
      <el-col :span="12" :offset="0">
        <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" class="mb-4"/>
        <IndexCard title="交易提示" tip="需要立即处理的交易订单" :btns="order" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getStatistics1, getStatistics2 } from "~/api/index.js";
import CountTo from "~/components/CountTo.vue";
import IndexNavs from "~/components/IndexNavs.vue";
import IndexChart from "~/components/IndexChart.vue";
import IndexCard from "~/components/IndexCard.vue";

const panels = ref([]);
getStatistics1().then((response) => {
  console.log(response);
  panels.value = response.panels;
});

const goods = ref([]);
const order = ref([]);
getStatistics2().then((response) => {
  console.log(response);
  goods.value = response.goods;
  order.value = response.order;
});

const promiseArray=ref([])
for(let i=0;i<10;i++){
  promiseArray.value.push(getStatistics1())
}
console.log("----------  promise all start -------------- ")
Promise.all(promiseArray.value).then((response)=>{
  console.log(response)
  console.log("----------  promise all end -------------- ")
})

</script>
<style scoped>
.index-card:hover {
  @apply shadow-light-900 shadow-md;
  background-color: #f2f6fc;
}
</style>
