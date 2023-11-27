const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  user.permissions = [].concat
    .apply(
      [],
      user.roles.map((role) => role.permissions)
    )
    .map((permission) => permission.name);
}

export default {
  user,
};
