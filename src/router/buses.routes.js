import CreateView from "@/views/buses/CreateView";
import EditView from "@/views/buses/EditView";
import ListView from "@/views/buses/ListView";

export default [
  {
    path: "/buses/create",
    name: "createBus",
    component: CreateView,
    meta: {
      permission: "store_bus",
    },
  },
  {
    path: "/buses/:id/edit",
    name: "editBus",
    component: EditView,
    meta: {
      permission: "update_bus",
    },
  },
  {
    path: "/buses",
    name: "buses",
    component: ListView,
    meta: {
      permission: "index_buses",
    },
  },
];
