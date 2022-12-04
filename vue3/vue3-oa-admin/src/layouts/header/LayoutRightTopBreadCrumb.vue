<template>
  <el-breadcrumb>
    <TransitionGroup
      appear
      enter-active-class="animate__animated animate__fadeInRight"
    >
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="item + index"
      >
        <span>{{ item }} </span>
      </el-breadcrumb-item>
    </TransitionGroup>
  </el-breadcrumb>
</template>
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const store = useStore();

const breadcrumbList = computed(() => {
  let temp = [];
  if (
    store.state.menus &&
    router.currentRoute.value.meta &&
    router.currentRoute.value.meta.bigMenuIndex
  ) {
    temp.push(
      store.state.menus[router.currentRoute.value.meta.bigMenuIndex[0]].name
    );
    if (router.currentRoute.value.meta.bigMenuIndex.length > 1) {
      temp.push(
        store.state.menus[router.currentRoute.value.meta.bigMenuIndex[0]].child[
          router.currentRoute.value.meta.bigMenuIndex[1]
        ].name
      );
    }
    temp.push(router.currentRoute.value.meta.title);
  }
  console.log(temp);
  return temp;
});
</script>
<style lang="scss" scoped>
:deep(.el-breadcrumb) {
  font-size: 1rem;
  height: 30px;
  line-height: 30px;
}
:deep(.el-breadcrumb__item:nth-child(1)) {
  font-size: 1rem;
}
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  font-size: 1.2rem;
  font-weight: bold !important;
  color: black !important;
}
</style>
