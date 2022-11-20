<template>
  <div
    class="personal-calendar"
    :class="{ 'personal-calendar-active': personalCalendarFlag }"
  >
    <div class="personal-calendar-content" @click="tempClick">
      <div class="personal-calendar-item" v-if="solar2lunarData">
        <h1>
          <span>农历</span>
        </h1>
        <h2>
          <span>{{ solar2lunarData.yearCn }}</span>
          <span>{{ solar2lunarData.monthCn }}</span>
          <span>{{ solar2lunarData.dayCn }}</span>
        </h2>
        <h3>{{ solar2lunarData.animal }}年</h3>
        <div class="animal">
          <img
            :src="'\\image\\calendar\\' + solar2lunarData.animal + '.png'"
            alt=""
          />
        </div>
        <div class="yi-ji">
          <div class="yi-ji-row">
            <div class="row-left">宜:</div>
            <div class="row-right">
              <span>{{ huangli.yi }}</span>
            </div>
          </div>
          <div class="yi-ji-row">
            <div class="row-left">忌:</div>
            <div class="row-right">
              <span>{{ huangli.ji }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import solarLunar from "solarLunar";

const year = ref();
const month = ref();
const day = ref();
const solar2lunarData = ref();
let timeNow = new Date();
year.value = timeNow.getFullYear();
month.value = timeNow.getMonth() + 1;
day.value = timeNow.getDate();
// 输入的日子为公历
solar2lunarData.value = solarLunar.solar2lunar(
  year.value,
  month.value,
  day.value
);

const huangli = reactive({
  id: "1657",
  yangli: "2014-09-11",
  yinli: "甲午(马)年八月十八",
  wuxing: "井泉水 建执位",
  chongsha: "冲兔(己卯)煞东",
  baiji: "乙不栽植千株不长 酉不宴客醉坐颠狂",
  jishen: "官日 六仪 益後 月德合 除神 玉堂 鸣犬",
  yi: "祭祀 出行 扫舍 馀事勿取",
  xiongshen: "月建 小时 土府 月刑 厌对 招摇 五离",
  ji: "诸事不忌",
});
const tempClick=()=>{
  console.log('-content')
}
defineProps({
  personalCalendarFlag: {
    type: Boolean,
  },
});
</script>
<style scoped lang="scss">
.personal-calendar {
  position: fixed;
  z-index: 100;
}

.personal-calendar:before,
.personal-calendar:after {
  content: "";
  position: fixed;
  right: 190px;
  top: calc(100px - 0rem);
  width: 180px;
  height: 0px;
  background-color: rgba(80, 77, 84, 0.1);
  border-bottom-left-radius: 60%;
  border-bottom-right-radius: 60%;
  z-index: -1;
  transition: border-radius linear 0.4s,
    width cubic-bezier(0.77, 0, 0.175, 1) 0.32s,
    height cubic-bezier(0.77, 0, 0.175, 1) 0.32s;
}

.personal-calendar:after {
  background-color: #eb4847;
  background-image: url("/image/calendar/calendar_background.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 96% 98%;
  transition-delay: 0.1s;
  box-shadow: -6px 7px 28px 0 rgba(40, 40, 40, 0.4);
}

.personal-calendar:before {
  transition-delay: 0.24s;
}

.personal-calendar-active.personal-calendar:before,
.personal-calendar-active.personal-calendar:after {
  width: 180px;
  height: 280px;
  border-radius: 14px;
}

.personal-calendar-active.personal-calendar:after {
  -webkit-transition-delay: 0.24s;
  transition-delay: 0.24s;
}

.personal-calendar-active.personal-calendar:before {
  -webkit-transition-delay: 0.1s;
  transition-delay: 0.1s;
}
.personal-calendar-active.personal-calendar {
  visibility: visible;
}
.personal-calendar-content {
  position: fixed;
  right: 190px;
  top: calc(100px - 0rem);
  width: 180px;
  height: 280px;
  visibility: hidden;
  padding: 10px;
}

.personal-calendar-item {
  width: 160px;
  height: 80px;
  opacity: 0;
  line-height: 1.2;
  transform: translate(0%, -20%);
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
  margin-top: 24px;
  text-align: center;
  font-family: "katong", sans-serif;
  h1 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #fff98d;
  }
  h2 {
    font-size: 0.8rem;
    color: #fffede;
  }
  h3 {
    color: #fff98d;
    font-size: 0.9rem;
    margin-top: 2px;
  }
  .animal {
    width: 64px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    margin-left: 50px;
    margin-top: 6px;
    margin-bottom: 6px;
    @apply flex items-center justify-center relative;
    transition: all 0.4s linear;
    img {
      width: 60px;
      height: 10px;
      transition: all 0.4s linear;
      position: relative;
    }
  }
  .yi-ji {
    font-size: 0.8rem;
    .yi-ji-row {
      width: 100%;
      height: 40px;
      .row-left {
        width: 30px;
        height: 100%;
        text-align: right;
        float: left;
      }
      .row-right {
        width: 120px;
        height: 100%;
        float: left;
        text-align: left;
        word-break: keep-all;
        margin-left: 6px;
      }
    }
    .yi-ji-row:nth-child(1) {
      color: #fff98d;
    }
    .yi-ji-row:nth-child(2) {
      color: #fffede;
    }
  }
}
.personal-calendar-active {
  .personal-calendar-content {
    visibility: visible;
    .personal-calendar-item {
      opacity: 1;
      height: 260px;
      transform: translateY(0%);
      transition-delay: 0.4s;
      .animal {
        height: 64px;
        transition: all 0.4s linear;
        transition-delay: 0.4s;
        img {
          height: 60px;
          transition: all 0.6s linear;
          transition-delay: 0.4s;
        }
      }
    }
  }
}
</style>
