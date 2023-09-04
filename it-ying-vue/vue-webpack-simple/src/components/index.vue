<template>
  <div>
    <h3>hello this is index page</h3>
    <button @click="toBase">vue base</button>
    <br />
    <button @click="toDouble">vue 双向绑定; 获取dom节点</button>
    <br />
    <button @click="toEvent">event事件</button>
    <button @click="toDoList">to do list</button>
    <br>
  </div>
</template>

<script>
export default {
  methods: {
    toBase() {
      console.log("to base");
      this.$router.push("/base");
    },
    toDouble() {
      console.log("to double");
      this.$router.push("/doubleBind");
    },
    toEvent() {
      console.log("to event");
      this.$router.push("/event");
    },
    toDoList() {
      this.$router.push("/toDoList");
    }
  }
};
</script>
<style>
</style>