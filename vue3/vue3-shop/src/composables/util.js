import { ElNotification } from "element-plus";

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
