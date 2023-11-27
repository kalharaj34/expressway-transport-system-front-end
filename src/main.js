import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify.plugin";
import i18n from "./plugins/locales.plugin";
import validator from "./plugins/validator.plugin";
import moment from "./plugins/moment.plugin";
import permissionDirective from "./directives/permission.directive";
import excel from "vue-excel-export";

import "./scss/main.scss";

Vue.use(moment);
Vue.use(validator);
Vue.directive("permissions", permissionDirective);
Vue.use(excel);

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
