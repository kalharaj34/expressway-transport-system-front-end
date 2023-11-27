import store from "@/store";

export default (el, binding) => {
  const { value } = binding;

  if (value) {
    if (!store.getters["auth/can"](value)) {
      el.classList.add("d-none");
    }
  } else {
    throw new Error(
      `Permissions are required! Example: v-permission="['create user','edit user']"`
    );
  }
};
