export default {
  SET_USER: (state, user) => {
    state.user = {
      ...user,
      permissions: user
        ? [].concat
            .apply(
              [],
              user.roles.map((role) => role.permissions)
            )
            .map((permission) => permission.name)
        : [],
    };
  },
};
