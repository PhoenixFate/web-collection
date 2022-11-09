<template>
  <div v-if="isInteger">
    {{ d.num.toFixed(0) }}
  </div>
  <div v-else>
    {{ d.num.toFixed(2) }}
  </div>
</template>
<script setup>
import { reactive, watch, computed } from "vue";
import gsap from "gsap";

const isInteger = computed(() => {
  return parseInt(props.value) == parseFloat(props.value);
});

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});

const d = reactive({
  num: 0,
});

function animateToValue() {
  // gsap.to: 数字滚动动画，duration动画持续时长，
  // num需要滚动的数据，props.value最终滚动到的数字
  gsap.to(d, {
    duration: 0.5,
    num: props.value,
  });
}
animateToValue();

//监听props中的value，如果发生变化，重新执行滚动动画
watch(
  () => props.value,
  () => animateToValue()
);
</script>
