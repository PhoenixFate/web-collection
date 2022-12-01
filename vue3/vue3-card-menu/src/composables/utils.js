import { ElNotification, ElMessageBox } from "element-plus";
import NProgress from "nprogress";

NProgress.configure({
  minimum: 0.3, //default: 0.08  Changes the minimum percentage used upon starting
  easing: "ease", //default: ease
  speed: 200, // 速度设置毫秒ms default: 200
  trickleSpeed: 100 
});

// 消息提示
export function showMessage(
  message,
  type = "success",
  dangerouslyUseHTMLString = false
) {
  ElNotification({
    message,
    type,
    duration: 3000,
    dangerouslyUseHTMLString,
  });
}

// 弹出提示框
export function showMessageBox(
  content = "提示内容",
  type = "warning",
  title = ""
) {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type,
  });
}

// 显示全屏loading
export function showFullScreenLoading() {
  NProgress.start();
}

// 隐藏全屏loading
export function hideFullScreenLoading() {
  NProgress.done();
}
