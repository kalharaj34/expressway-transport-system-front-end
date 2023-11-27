import LoginView from "@/views/auth/Login.view";

export default [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      publicPage: true,
    },
  },
];
