import { QDialogOptions } from "quasar";

export const notifyConfig = {
  success: {
    message: "Success !",
    timeout: 5000,
    actions: [
      { label: "close", color: "dark" }
    ],
    color: "green",
    type: "positive",
    caption: "Success",
    icon: "sentiment_very_satisfied",
    progress: true,
    position: "top-left",
  } as any,
  err: {
    message: "An error occured !",
    timeout: 5000,
    actions: [
      { label: "Close", color: "dark" }
    ],
    type: "warning",
    caption: "Error",
    icon: "report_problem",
    progress: true,
    position: "top-left",
  } as any
}

export const confirmSettings: QDialogOptions = {
  title: "آیا اطمینان به حذف دارید ؟",
  message: "درصورت اطمینان از عملیات خود، بر روی دکمه قبول، کلیک کنید",
  focus: "cancel",
  position: "top",
  cancel: {
    color: "primary",
  },
  ok: {
    flat: true,
  }
}
