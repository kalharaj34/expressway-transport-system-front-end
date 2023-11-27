import ListView from "@/views/reports/ListView";

export default [
  {
    path: "/reports",
    name: "reports",
    component: ListView,
    meta: {
      permission: "index_reports",
    },
  },
];
