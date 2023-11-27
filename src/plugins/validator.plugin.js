import validationsUtility from "@/utilities/validations.utility";

export default function install(Vue) {
  Object.defineProperties(Vue.prototype, {
    $validator: {
      get() {
        return validationsUtility;
      },
    },
  });
}
