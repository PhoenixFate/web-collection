<template>
  <div
    class="clock"
    @mouseenter="$emit('showPersonalCalendar')"
    @mouseleave="$emit('hidePersonalCalendar')"
  >
    <div class="clock__circle">
      <span class="clock__twelve"></span>
      <span class="clock__three"></span>
      <span class="clock__six"></span>
      <span class="clock__nine"></span>
      <div class="clock__rounder"></div>
      <div class="clock__hour" ref="clockHour"></div>
      <div class="clock__minutes" ref="clockMinute"></div>
      <div class="clock__seconds" ref="clockSecond"></div>
    </div>
    <div class="clock-text">
      <h2>
        <span
          >{{ year }}-{{ $filters.padTwoZero(month) }}-{{
            $filters.padTwoZero(day)
          }}</span
        >
      </h2>
      <h3>
        <span>{{ $filters.padTwoZero(hour) }}</span
        ><span>:</span>
        <span>{{ $filters.padTwoZero(minute) }}</span>
      </h3>
      <h4>
        <span>{{ week }}</span>
      </h4>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
const clockHour = ref();
const clockSecond = ref();
const clockMinute = ref();
const year = ref();
const month = ref();
const day = ref();
const hour = ref();
const minute = ref();
const week = ref();
let timeNow = new Date();
year.value = timeNow.getFullYear();
month.value = timeNow.getMonth() + 1;
day.value = timeNow.getDate();
week.value = "星期" + "日一二三四五六".charAt(timeNow.getDay());

onMounted(() => {
  const setDate = () => {
    const now = new Date();
    hour.value = now.getHours();
    minute.value = now.getMinutes();
    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360;
    if (clockSecond.value && clockSecond.value.style) {
      clockSecond.value.style.transform = `rotate(${secondsDegrees}deg)`;
    }
    const mins = now.getMinutes();
    const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6;
    if (clockMinute.value && clockMinute.value.style) {
      clockMinute.value.style.transform = `rotate(${minsDegrees}deg)`;
    }
    const tempHour = now.getHours();
    const hourDegrees = (tempHour / 12) * 360 + (mins / 60) * 30;
    if (clockHour.value && clockHour.value.style) {
      clockHour.value.style.transform = `rotate(${hourDegrees}deg)`;
    }
  };
  setInterval(setDate, 1000);
  setDate();
});

defineEmits(["showPersonalCalendar", "hidePersonalCalendar"]);
</script>
<style scoped lang="scss">
.clock {
  cursor: pointer;
  @apply flex justify-center items-center;
  .clock__circle {
    position: relative;
    width: 70px;
    height: 70px;
    box-shadow: -2px -2px 5px #fff, 2px 2px 5px rgb(209, 209, 230),
      inset 2px 2px 5px rgb(209, 209, 230), inset -2px -2px 2px #fff;
    border-radius: 50%;
    justify-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .clock__twelve,
    .clock__three,
    .clock__six,
    .clock__nine {
      position: absolute;
      width: 0.3rem;
      height: 1px;
      background-color: rgb(155, 155, 176);
    }

    .clock__twelve,
    .clock__six {
      transform: translateX(-50%) rotate(90deg);
    }

    .clock__twelve {
      top: 0.41rem;
      left: 50%;
    }

    .clock__three {
      top: 50%;
      right: 0.25rem;
    }

    .clock__six {
      bottom: 0.41rem;
      left: 50%;
    }

    .clock__nine {
      left: 0.25rem;
      top: 50%;
    }

    .clock__rounder {
      width: 0.25rem;
      height: 0.25rem;
      background-color: rgb(59, 59, 191);
      border-radius: 50%;
      border: 0.1rem solid rgb(236, 236, 243);
      z-index: 10;
    }

    .clock__hour,
    .clock__minutes,
    .clock__seconds {
      position: absolute;
      display: flex;
      justify-content: center;
    }

    .clock__hour {
      width: 35px;
      height: 25px;
    }

    .clock__hour::before {
      content: "";
      position: absolute;
      background-color: rgb(79, 79, 100);
      width: 0.08rem;
      height: 1rem;
      border-radius: 0.25rem;
      z-index: 1;
    }

    .clock__minutes {
      width: 45px;
      height: 45px;
    }

    .clock__minutes::before {
      content: "";
      position: absolute;
      background-color: rgb(79, 79, 100);
      width: 0.08rem;
      height: 1.33rem;
      border-radius: 0.25rem;
      z-index: 1;
    }

    .clock__seconds {
      width: 42px;
      height: 42px;
    }

    .clock__seconds::before {
      content: "";
      position: absolute;
      background-color: rgb(59, 59, 191);
      width: 0.04rem;
      height: 1.67rem;
      border-radius: 0.25rem;
      z-index: 1;
    }
  }

  .clock-text {
    width: 100px;
    text-align: center;
    @apply ml-2 flex flex-col justify-center items-center;
    h2 {
      font-size: 0.9rem;
      @apply text-gray-400;
    }
    h3 {
      font-size: 1.2rem;
      color: rgb(61, 61, 124);
      @apply font-bold;
      span:nth-child(2) {
        @apply mx-1;
      }
    }
    h4 {
      font-size: 0.7rem;
      @apply text-blue-gray-500;
      span {
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
