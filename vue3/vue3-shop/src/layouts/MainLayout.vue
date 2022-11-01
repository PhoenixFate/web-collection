<template>
  <el-container>
    <el-header>
      <LayoutHeaderVue />
    </el-header>
    <el-container>
      <el-aside>
        <LayoutMenuVue />
      </el-aside>
      <el-main>
        <LayoutTagListVue />
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import LayoutHeaderVue from "./components/LayoutHeader.vue";
import LayoutMenuVue from "./components/LayoutMenu.vue";
import LayoutTagListVue from "./components/LayoutTagList.vue";
</script>
