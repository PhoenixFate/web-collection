<template>
    <div>
      测试页面 <br />
      <button type="primary" @click="addCount()">{{ count }}</button> <br />
      <button type="primary" @click="addAge()">{{ form.age }}</button>
      <HelloWorld />
    </div>
  </template>
  <script setup>
  // 引入组件即可使用，无需声明
  import HelloWorld from "~/components/HelloWorld.vue";
  // vue3提供了两个响应式api：ref和reactive
  import { ref, reactive } from "vue";
  
  let count = ref(1);
  let form = reactive({
    age: 1,
  });
  function addCount() {
    console.log("addCount");
    //ref包装之后是个对象，需要使用.value获得所属的值
    count.value++;
  }
  function addAge() {
    console.log("addAge");
    form.age++;
  }
  </script>
  