import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { router } from "@/router";
import { useMenu } from "@/composables/useMenu.js";
import { getTabList, setTabList } from "@/composables/storage.js";

export function useTabList() {
  const route = useRoute();

  const activeTab = ref(route.path);
  const tabList = ref([
    {
      title: "主控台",
      path: "/",
      icon: "home-filled",
      bigMenuIndex: [0],
    },
  ]);

  const dropdownVisible = ref(false);

  //添加标签导航
  function addTab(tab) {
    let noTab = tabList.value.findIndex((item) => item.path == tab.path) == -1;
    if (noTab) {
      tabList.value.push(tab);
    }
    setTabList(tabList.value);
  }

  const { chooseBigMenu } = useMenu();

  const changeTab = (path) => {
    console.log(path);

    let temp = tabList.value.find((item) => item.path == path);
    console.log("---------------");
    console.log(temp);
    if (temp && temp.bigMenuIndex && temp.bigMenuIndex.length > 0) {
      console.log(chooseBigMenu);
      chooseBigMenu(temp.bigMenuIndex[0]);
    }
    // 点击tab，进行了路由跳转
    router.push(path);
  };

  const handleClose = (command) => {
    if (command == "clearAll") {
      //标签切换状态切换回首页
      activeTab.value = "/";
      //标签只剩首页
      tabList.value = [
        {
          title: "主控台",
          path: "/",
          icon: "home-filled",
          bigMenuIndex: [0],
        },
      ];
    } else if (command == "clearOther") {
      //过滤只剩下首页和当前激活的
      tabList.value = tabList.value.filter(
        (tab) => tab.path == "/" || tab.path == activeTab.value
      );
    }
    setTabList(tabList.value);
  };

  //初始化标签导航列表
  function initTabList() {
    let cookieTabList = getTabList();
    if (cookieTabList) {
      tabList.value = cookieTabList;
    }
  }

  initTabList();

  onBeforeRouteUpdate((to, from) => {
    console.log(to);
    activeTab.value = to.path;
    addTab({
      title: to.meta.title,
      path: to.path,
      icon: to.meta.icon,
      bigMenuIndex: to.meta.bigMenuIndex,
    });
  });

  const removeTab = (tag) => {
    let tabs = tabList.value;
    let activeValue = activeTab.value;
    if (activeValue == tag) {
      tabs.forEach((item, index) => {
        if (item.path == tag) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            console.log(nextTab);
            activeValue = nextTab.path;
          }
        }
      });
    }
    activeTab.value = activeValue;
    tabList.value = tabList.value.filter((tab) => tab.path != tag);
    setTabList(tabList.value);
  };
  const visibleChange = (visible) => {
    console.log(visible);
    dropdownVisible.value = visible;
  };

  return {
    dropdownVisible,
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose,
    visibleChange,
  };
}
