import CreateView from "@/views/routes/CreateView";
import EditView from "@/views/routes/EditView";
import ListView from "@/views/routes/ListView";

export default [
  {
    path: "/routes/create",
    name: "createRoute",
    component: CreateView,
    meta: {
      permission: "store_route",
    },
  },
  {
    path: "/routes/:id/edit",
    name: "editRoute",
    component: EditView,
    meta: {
      permission: "update_route",
    },
  },
  {
    path: "/routes",
    name: "routes",
    component: ListView,
    meta: {
      permission: "index_routes",
    },
  },
];
