import { useStore } from "vuex";
import { getBigMenuIndex, setBigMenuIndex } from "@/composables/storage.js";
export function useMenu() {
  console.log("-----------use menu---------");

  const store = useStore();
  let cookieBigMenuIndex = getBigMenuIndex();
  if (cookieBigMenuIndex) {
    store.commit("SET_BIG_MENU_INDEX", cookieBigMenuIndex);
  }

  const chooseBigMenu = (index) => {
    if (index == store.state.bigMenuIndex) {
      return;
    }
    store.commit("SET_BIG_MENU_INDEX", index);
    setBigMenuIndex(index);
  };

  return {
    chooseBigMenu,
  };
}
