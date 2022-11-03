<template>
  <div class="layout-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      :collapse="$store.state.isCollapse"
      :collapse-transition="false"
      :unique-opened="true"
      class="border-0"
      @select="handleSelect"
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu
          :index="item.name"
          v-if="item.child && item.child.length > 0"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span> {{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon>
              <component :is="item2.icon" />
            </el-icon>
            <span> {{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span> {{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
//计算菜单是否折叠
const isCollapse = computed(() => {
  // return !(store.state.asideWidth == "250px");
  return store.state.isCollapse;
});

const asideMenus = [
  {
    name: "后台面版",
    icon: "help",
    child: [
      {
        name: "主控台",
        icon: "home-filled",
        frontpath: "/",
      },
    ],
  },
  {
    name: "商城管理",
    icon: "shopping-bag",
    child: [
      {
        name: "商品管理",
        icon: "shopping-cart-full",
        frontpath: "/goods/list",
      },
    ],
  },
];

const handleSelect = (e) => {
  console.log(e);
  router.push(e);
};
</script>
<style scoped>
.layout-menu {
  transition: all 0.6s;
  /* transition: max-width 0.5s ease-out; */
  top: 64px;
  bottom: 0;
  left: 0;
  padding-left: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
}
</style>
