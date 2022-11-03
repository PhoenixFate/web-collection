<template>
  <el-container>
    <el-header class="h-[64px]">
      <LayoutHeaderVue />
    </el-header>
    <el-container>
      <el-aside :width="$store.state.asideWidth">
        <LayoutMenuVue />
      </el-aside>
      <el-main>
        <LayoutTagListVue />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import LayoutHeaderVue from "./components/LayoutHeader.vue";
import LayoutMenuVue from "./components/LayoutMenu.vue";
import LayoutTagListVue from "./components/LayoutTagList.vue";
</script>
<style>
.el-aside {
  transition: all 0.6s;
  /* transition: max-width 0.5s ease-out; */
}
</style>
