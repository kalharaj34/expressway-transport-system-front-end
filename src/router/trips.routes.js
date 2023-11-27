import CreateView from "@/views/trips/CreateView";
import EditView from "@/views/trips/EditView";
import ListView from "@/views/trips/ListView";

export default [
  {
    path: "/trips/create",
    name: "createTrip",
    component: CreateView,
    meta: {
      permission: "store_trip",
    },
  },
  {
    path: "/trips/:id/edit",
    name: "editTrip",
    component: EditView,
    meta: {
      permission: "update_trip",
    },
  },
  {
    path: "/trips",
    name: "trips",
    component: ListView,
    meta: {
      permission: "index_trips",
    },
  },
];
