import { useStore } from "vuex";
import { getBigMenuIndex, setBigMenuIndex } from "@/composables/storage.js";
export function useMenu() {
  console.log("-----------use menu---------");

  const store = useStore();
  let cookieBigMenuIndex = getBigMenuIndex();
  if (cookieBigMenuIndex) {
    store.commit("SET_BIG_MENU_INDEX", cookieBigMenuIndex);
  }

  if (!store.state.menus || store.state.menus.length == 1) {
    //card动画一个4个card，当menus只有一个，只显示第一个card-current
  } else if (store.state.menus.length == 2) {
    //当menus只有两个的时候，只显示card-current card-next
    let indexArray = [];
    store.state.menus.forEach((menu, i) => {
      if (i != store.state.bigMenuLastIndex && i != store.state.bigMenuIndex) {
        indexArray.push(i);
      }
    });
    store.commit("SET_MIDDLE_NEXT_INDEX", indexArray[0]);
  } else if (store.state.menus.length == 3) {
    //当menus只有三个的时候，只显示card-current card-next card-third
    let indexArray = [];
    store.state.menus.forEach((menu, i) => {
      if (i != store.state.bigMenuLastIndex && i != store.state.bigMenuIndex) {
        indexArray.push(i);
      }
    });
    store.commit("SET_MIDDLE_NEXT_INDEX", indexArray[0]);
    store.commit("SET_MIDDLE_THIRD_INDEX", indexArray[1]);
  } else {
    //当menus大于等于4个的时候只显示card-current card-next card-third card-last-temp
   

    let indexArray = [];
    store.state.menus.forEach((menu, i) => {
      if (i != store.state.bigMenuLastIndex && i != store.state.bigMenuIndex) {
        indexArray.push(i);
      }
    });
    console.log(indexArray);
    store.commit("SET_MIDDLE_NEXT_INDEX", indexArray[0]);
    store.commit("SET_MIDDLE_THIRD_INDEX", indexArray[1]);
    store.commit("SET_MIDDLE_LAST_INDEX", indexArray[indexArray.length-1]);
  }

  const chooseBigMenu = (index) => {
    if (index == store.state.bigMenuIndex) {
      return;
    }
    store.commit("SET_LEFT_MENU_ANIMATION_FLAG", true);
    setTimeout(() => {
      store.commit("SET_LEFT_MENU_ANIMATION_FLAG", false);
    }, 200);
    store.commit("SET_BIG_MENU_LAST_INDEX", store.state.bigMenuIndex);
    store.commit("SET_BIG_MENU_INDEX", index);
    setBigMenuIndex(index);
    //middle 的4个card动画切换 middleLastIndex就初始化的时候用一下，初始化不动画，其他不用
    store.commit("SET_MIDDLE_LAST_INDEX", -1);
    //上一个middle菜单添加飞出去的动画，当前的index，添加card-current
    store.commit("SET_MIDDLE_OUT_INDEX", store.state.bigMenuLastIndex);
    if (store.state.menus.length == 2) {
      //当menus只有两个的时候，只显示card-current card-out
    } else if (store.state.menus.length == 3) {
      //当menus只有两个的时候，只显示card-current card-next card-out
      const indexArray = [];
      store.state.menus.forEach((menu, i) => {
        if (
          i != store.state.bigMenuLastIndex &&
          i != store.state.bigMenuIndex
        ) {
          indexArray.push(i);
        }
      });
      store.commit("SET_MIDDLE_NEXT_INDEX", indexArray[0]);
    } else {
      //当menus有4个及4个以上的时候
      const indexArray = [];
      store.state.menus.forEach((menu, i) => {
        if (
          i != store.state.bigMenuLastIndex &&
          i != store.state.bigMenuIndex
        ) {
          indexArray.push(i);
        }
      });
      store.commit("SET_MIDDLE_NEXT_INDEX", indexArray[0]);
      store.commit("SET_MIDDLE_THIRD_INDEX", indexArray[1]);
    }
  };

  return {
    chooseBigMenu,
  };
}
