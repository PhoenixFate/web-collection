<template>
  <div
    class="layout-menu"
    :style="{ width: $store.state.asideWidth }"
    :class="{ 'aside-remove-menu': !($store.state.asideWidth == '250px') }"
  >
    <el-menu
      :collapse="$store.state.isCollapse"
      :collapse-transition="false"
      :default-active="defaultActive"
      :unique-opened="false"
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
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const route = useRoute();

//默认选中当前路由
const defaultActive = ref(route.path);

//计算菜单是否折叠
const isCollapse = computed(() => {
  // return !(store.state.asideWidth == "250px");
  return store.state.isCollapse;
});

const asideMenus = computed(() => {
  return store.state.menus;
});

const asideMenus2 = [
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
<style>
.layout-menu {
  transition: all 0.6s;
  top: 64px;
  bottom: 0;
  left: 0;
  padding-left: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
}
/* 设置菜单的滚动条的宽度为0 */
.layout-menu::-webkit-scrollbar {
  width: 0px;
}
</style>
