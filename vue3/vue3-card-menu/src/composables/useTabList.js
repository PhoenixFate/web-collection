import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import { router } from "~/router";
export function useTabList() {
  const route = useRoute();
  const cookie = useCookies();

  const activeTab = ref(route.path);
  const tabList = ref([
    {
      title: "后台首页",
      path: "/",
      icon: "home-filled",
    },
    {
      title: "商城管理",
      path: "/goods/list",
      icon: "shopping-cart-full",
    },
  ]);

  //添加标签导航
  function addTab(tab) {
    let noTab = tabList.value.findIndex((item) => item.path == tab.path) == -1;
    if (noTab) {
      tabList.value.push(tab);
    }
    cookie.set("tabList", tabList.value);
  }

  const changeTab = (path) => {
    console.log(path);
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
          title: "后台首页",
          path: "/",
        },
      ];
    } else if (command == "clearOther") {
      //过滤只剩下首页和当前激活的
      tabList.value = tabList.value.filter(
        (tab) => tab.path == "/" || tab.path == activeTab.value
      );
    }
    cookie.set("tabList", tabList.value);
  };

  //初始化标签导航列表
  function initTabList() {
    let cookieTabList = cookie.get("tabList");
    if (cookieTabList) {
      tabList.value = cookieTabList;
    }
  }

  initTabList();

  onBeforeRouteUpdate((to, from) => {
    console.log(to);
    activeTab.value = to.path;
    addTab({ title: to.meta.title, path: to.path, icon: to.meta.icon });
  });

  const removeTab = (tag) => {
    console.log(tag);
    let tabs = tabList.value;
    console.log(tabs);
    let activeValue = activeTab.value;
    console.log(activeValue);
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
    cookie.set("tabList", tabList.value);
  };

  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose,
  };
}
