import router from "@/router";
import notificationsUtility from "@/utilities/notifications.utility";
import axios from "axios";
import store from "@/store";
import i18n from "@/plugins/locales.plugin";

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

HTTP.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
      locale: i18n.i18next.language,
    };
    store.commit("common/ADD_REQUEST");
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

HTTP.interceptors.response.use(
  (response) => {
    store.commit("common/REMOVE_REQUEST");
    if (response.config.method != "get") {
      notificationsUtility.pushNotification({
        message: response.data.message,
        type: "success",
      });
    }
    return response.data;
  },
  (error) => {
    store.commit("common/REMOVE_REQUEST");
    if (error.response.status === 422) {
      const errorKey = Object.keys(error.response.data.errors)[0];
      notificationsUtility.pushNotification({
        message: error.response.data.errors[errorKey][0],
        type: "error",
      });
    } else if (error.response.status === 401) {
      const isLoggedIn = localStorage.getItem("token");
      if (isLoggedIn) {
        store.dispatch("auth/logout");
        notificationsUtility.pushNotification({
          message: "Log in required",
          type: "error",
        });
      }
      if (
        router.currentRoute.name !== "login" &&
        !router.currentRoute.meta.publicPage
      ) {
        router.push({ name: "login" });
      }
    } else {
      notificationsUtility.pushNotification({
        message: error.response.data.message,
        type: "error",
      });
    }
    return Promise.reject(error);
  }
);

export default HTTP;
