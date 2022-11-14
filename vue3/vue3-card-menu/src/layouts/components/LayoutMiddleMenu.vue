<template>
  <div class="middle-menu" v-if="!$store.state.isCollapse">
    <ul class="cards">
      <li
        class="card"
        v-for="(menu, index) in $store.state.menus"
        :class="[
          { 'card-current': index == $store.state.bigMenuIndex },
          { 'card-next': index == $store.state.middleNextIndex },
          { 'card-third': index == $store.state.middleThirdIndex },
          { 'card-last-temp': index == $store.state.middleLastIndex },
          { 'card-out': index == $store.state.middleOutIndex },
        ]"
        :key="index"
      >
        <el-menu
          :collapse="false"
          :collapse-transition="false"
          :default-active="defaultActive"
          :unique-opened="false"
          class="border-0 bg-transparent"
          v-if="menu.child"
          @select="handleSelect"
        >
          <template v-for="(item, menu) in menu.child" :key="index">
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
              <span class="ml-2"> {{ item.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const handleSelect = (e) => {
  router.push(e);
};
//默认选中当前路由
const defaultActive = computed(() => route.path);
</script>
<style scoped src="../../assets/css/layout/middleMenu/card.css" />
<style scoped>
.middle-menu {
  width: 240px;
  left: 154px;
  height: calc(100% - 100px - 1rem);
  @apply absolute bottom-2;
}

.card :deep(.el-icon) {
  height: 24px;
  width: 24px;
  line-height: 24px;
}
.card :deep(.el-icon svg) {
  height: 24px;
  width: 24px;
}


.card > ul > li:hover {
  transition: all 0.4s;
  padding-left: 1.6rem !important;
  @apply bg-gray-200 text-blue-gray-500;
}
.card > ul > li.is-active {
  animation: pulse 0.4s;
  @apply bg-blue-100 text-light-blue-600;
}
.card > ul > li.is-active:hover {
  @apply bg-blue-200 text-light-blue-800 ;
}

@-webkit-keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
