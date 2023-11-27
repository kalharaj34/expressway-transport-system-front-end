import router from "@/router";
import authService from "@/services/auth.service";

export default {
  logout({ commit }) {
    return authService
      .logout()
      .then(() => {
        localStorage.removeItem("token");
        commit("SET_USER", null);
        if (
          router.currentRoute.name !== "login" &&
          !router.currentRoute.meta.publicPage
        ) {
          router.push({ name: "login" });
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        commit("SET_USER", null);
      });
  },
};
