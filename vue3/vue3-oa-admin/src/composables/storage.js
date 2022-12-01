const TabListKey = "systemTabList";
const BigMenuIndexKey = "systemBigMenuIndex";

//获取打开的菜单tab
export function getTabList() {
  return JSON.parse(localStorage.getItem(TabListKey));
}

//存储打开的菜单tab
export function setTabList(tabList) {
  return localStorage.setItem(TabListKey, JSON.stringify(tabList));
}

//清除打开的菜单tab
export function removeTabList() {
  return localStorage.removeItem(TabListKey);
}

//获取左侧点击的菜单
export function getBigMenuIndex() {
  return localStorage.getItem(BigMenuIndexKey);
}

//存储左侧点击的菜单
export function setBigMenuIndex(bigMenuIndex) {
  return localStorage.setItem(BigMenuIndexKey, bigMenuIndex);
}

//清除左侧点击的菜单
export function removeBigMenuIndex() {
  return localStorage.removeItem(BigMenuIndexKey);
}
