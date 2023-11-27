export default {
  copyValues(source, target) {
    return source
      ? Object.assign(
          {},
          target,
          ...Object.keys(target).map(
            (key) => key in source && { [key]: source[key] }
          )
        )
      : {};
  },
  formatPhoneNumber(phoneNumber) {
    return phoneNumber
      ? "+94 " + phoneNumber.replace(/^(.{2})(.{2})(.{2})(.*)$/, "$1 $2 $3 $4")
      : "";
  },
};
