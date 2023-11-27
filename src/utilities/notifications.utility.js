import store from "@/store";

export default {
  pushNotification(notification) {
    store.commit("common/SET_NOTIFICATION", notification);
  },
  showNotifications(data) {
    if (data.status_code && data.status_code === 422) {
      if (data.message) {
        store.commit("common/SET_NOTIFICATION", {
          message: data.message[0][0],
          type: "error",
        });
      }
    } else if (data) {
      store.commit("common/SET_NOTIFICATION", {
        message: data.message,
        type:
          data.status_code >= 200 && data.status_code < 300
            ? "success"
            : "error",
      });
    }
  },
};
