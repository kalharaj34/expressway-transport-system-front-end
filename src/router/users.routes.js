import CreateView from "@/views/users/CreateView";
import EditView from "@/views/users/EditView";
import ListView from "@/views/users/ListView";

export default [
  {
    path: "/users/create",
    name: "createUser",
    component: CreateView,
    meta: {
      permission: "store_user",
    },
  },
  {
    path: "/users/:id/edit",
    name: "editUser",
    component: EditView,
    meta: {
      permission: "update_user",
    },
  },
  {
    path: "/users",
    name: "users",
    component: ListView,
    meta: {
      permission: "index_users",
    },
  },
];
