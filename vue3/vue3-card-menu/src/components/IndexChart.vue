<template>
  <div>
    <el-card shadow="always" class="rounded-2xl">
      <template #header>
        <div class="flex justify-between">
          <span class="text-sm">订单统计</span>
          <div>
            <el-check-tag
              :checked="current == item.value"
              v-for="(item, index) in options"
              :key="index"
              @click="handelChoose(item.value)"
              >{{ item.text }}</el-check-tag
            >
          </div>
        </div>
      </template>
      <!-- echarts图表 -->
      <div id="chart" ref="chart" style="width: 100%; height: 300px"></div>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getStatistics3 } from "@/api/main.js";
import { useResizeObserver } from "@vueuse/core";
import { markRaw } from 'vue'

const current = ref("week");
const options = [
  {
    text: "近一个月",
    value: "month",
  },
  {
    text: "近一周",
    value: "week",
  },
  {
    text: "近24小时",
    value: "hour",
  },
];
const handelChoose = (value) => {
  current.value = value;
  getData();
};
var myChart;
onMounted(() => {
  let chart=document.getElementById("chart")
  if(chart){
    myChart = echarts.init(chart);
    getData();
  }
});

//vue组件被销毁之前，需要释放掉已经实例化的echart组件
onBeforeUnmount(() => {
  if (myChart) {
    //销毁实例
    echarts.dispose(myChart);
  }
});

function getData() {
  let option = {
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
  myChart.showLoading();
  getStatistics3(current.value)
    .then((resonpose) => {
      option.xAxis.data = resonpose.x;
      option.series[0].data = resonpose.y;
      myChart.setOption(option);
    })
    .finally(() => {
        myChart.hideLoading();
    });
}
const chart=ref()
useResizeObserver(chart, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  myChart?.resize({ width, height });
});
</script>
