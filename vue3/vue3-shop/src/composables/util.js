import { ElNotification, ElMessageBox } from "element-plus";
import nProgress from "nprogress";
// 消息提示
export function showMessage(
  message,
  type = "success",
  dangerouslyUseHTMLString = true
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
  nProgress.start();
}

// 隐藏全屏loading
export function hideFullScreenLoading() {
  nProgress.done();
}

// 弹出输入框
export function showPrompt(tip, value = "") {
  return ElMessageBox.prompt(tip, "", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    inputValue: value,
  });
}
