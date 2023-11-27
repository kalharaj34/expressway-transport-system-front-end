import i18n from "@/plugins/locales.plugin";
import moment from "moment";

const emailRegex = /.+@.+/;
const phoneRegex = /^\d{9}$/;
const newNicRegex = /^\d{9}[vVxX]$/;
const oldNicRegex = /^\d{12}$/;
const usernameRegex =
  /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export default {
  email: (v) => emailRegex.test(v) || !v || i18n.t("validations.email"),
  nic: (v) =>
    !v ||
    newNicRegex.test(String(v).toLowerCase()) ||
    oldNicRegex.test(String(v).toLowerCase()) ||
    i18n.t("validations.nic"),
  pastDate: (v) =>
    !v ||
    moment(v).isBefore(moment().startOf("day")) ||
    i18n.t("validations.pastDate"),
  phoneNumber: (v) =>
    !v ||
    phoneRegex.test(String(v).toLowerCase()) ||
    i18n.t("validations.phoneNumber"),
  required: (v) =>
    (v instanceof Array ? v.length > 0 : !!v) || i18n.t("validations.required"),
  username: (v) =>
    !v ||
    usernameRegex.test(String(v).toLowerCase()) ||
    i18n.t("validations.username"),
};
