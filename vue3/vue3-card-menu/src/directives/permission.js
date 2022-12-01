import store from "@/store";

function hasPermission(value, el = false) {
  if (!Array.isArray(value)) {
    throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`);
  }
  //有权限，即store.state.rulesNames中包含传入的value
  const hasAuth =
    value.findIndex((v) => store.state.ruleNames.includes(v)) != -1;
  console.log(hasAuth);
  if (el && !hasAuth) {
    //没有权限，则移除该节点
    el.parentNode && el.parentNode.removeChild(el);
  }
  return hasAuth;
}

export default {
  // 这个app就是main.js中创建的app
  install(app) {
    app.directive("permission", {
      mounted(el, binding) {
        hasPermission(binding.value, el);
      },
    });
  },
};
