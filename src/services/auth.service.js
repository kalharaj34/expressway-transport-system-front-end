import store from "@/store";
import httpService from "./http.service";

export default {
  login(payload) {
    return httpService.post("auth/login", payload).then((response) => {
      if (response.data.token) {
        store.commit("auth/SET_USER", response.data.user);
        localStorage.setItem("token", response.data.token);
      }
    });
  },
  logout() {
    return httpService.post("auth/logout", null);
  },
  getUser() {
    return httpService.get("auth/user").then((response) => {
      if (response.data) {
        store.commit("auth/SET_USER", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    });
  },
  resetPassword(payload) {
    return httpService.post("auth/reset-password", payload);
  },
};
