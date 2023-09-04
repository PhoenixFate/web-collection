<template>
  <div>
    <input type="text" v-model="todo" @keydown="doAdd($event)" />
    <br />
    <hr />
    <br />
    <h2>进行中</h2>
    <ul>
      <li v-for="(item,key) in list" :key="key">
        <template v-if="!item.checked">
          <input type="checkbox" v-model="item.checked"  @change="saveList()"/>
          {{item.title}} ----
          <button @click="removeData(key)">删除</button>
        </template>
      </li>
    </ul>

    <br />
    <h2>已完成</h2>
    <ul class="finish">
      <li v-for="(item,key) in list" :key="key">
        <template v-if="item.checked">
          <input type="checkbox" v-model="item.checked" @change="saveList()"/>
          {{item.title}} ----
          <button @click="removeData(key)">删除</button>
        </template>
      </li>
    </ul>

    <h2 v-if="ok">这是一个ok</h2>

    <h2 v-if="!ok">这是一个No</h2>

    <button @click="getList()">获取list的值</button>
  </div>
</template>

<script>
import mineStorage from "../model/storage";
import storage from "../model/storage";
console.log(mineStorage);
export default {
  data() {
    return {
      ok: false,
      todo: "",
      list: [
        {
          title: "录制nodejs",
          checked: true
        },
        {
          title: "录制ionic",
          checked: false
        }
      ]
    };
  },
  methods: {
    doAdd(e) {
      console.log(e.keyCode);
      if (e.keyCode == 13) {
        //1、获取文本框输入的值   2、把文本框的值push到list里面
        this.list.push({
          title: this.todo,
          checked: false
        });
        this.todo = "";
        storage.set("list", this.list);
      }
    },
    removeData(key) {
      // alert(key)
      //splice  js操作数组的方法
      this.list.splice(key, 1);
      storage.set("list", this.list);
    },
    getList() {
      console.log(this.list);
    },
    saveList() {
      storage.set("list", this.list);
    }
  },
  mounted() {
    /*生命周期函数       vue页面刷新就会触发的方法*/
    var list = storage.get("list");
    if (list) {
      /*注意判断*/
      this.list = list;
    }
  }
};
</script>


<style lang="scss">
.finish {
  li {
    background: #eee;
  }
}
</style>