import store from "@/store";
import notificationsUtility from "@/utilities/notifications.utility";
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import authRoutes from "./auth.routes";
import busesRoutes from "./buses.routes";
import routesRoutes from "./routes.routes";
import tripsRoutes from "./trips.routes";
import reportsRoutes from "./reports.routes";
import usersRoutes from "./users.routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  ...authRoutes,
  ...usersRoutes,
  ...busesRoutes,
  ...routesRoutes,
  ...tripsRoutes,
  ...reportsRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("token");
  if (!to.meta.publicPage) {
    if (!isLoggedIn) {
      notificationsUtility.pushNotification({
        message: "Log in required",
        type: "error",
      });
      if (from.name !== "login") {
        return next("/login");
      }
    }
    if (to.meta.permission && !store.getters["auth/can"](to.meta.permission)) {
      notificationsUtility.pushNotification({
        message: "You do not have permissions",
        type: "error",
      });
      return next(from);
    }
  }
  return next();
});

export default router;
