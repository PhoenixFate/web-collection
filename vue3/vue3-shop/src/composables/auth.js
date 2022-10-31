// vue官方工具vueUse：提供一些把非响应式变为响应式的工具
import { useCookies } from "@vueuse/integrations/useCookies";

const TokenKey = "vue3-shop-admin-token";
const cookie = useCookies();

//获取token
export function getToken() {
  return cookie.get(TokenKey);
}

//设置token
export function setToken(token) {
  return cookie.set(TokenKey,token);
}

//清除token
export function deleteToken() {
  return cookie.remove(TokenKey);
}
