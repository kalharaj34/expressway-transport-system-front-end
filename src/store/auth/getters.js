export default {
  isLoggedIn: (state) => {
    return !!state.user;
  },
  can: (state) => (permissions) => {
    if (permissions instanceof Array) {
      return permissions.some((permission) =>
        state.user?.permissions.includes(permission)
      );
    }
    return state.user?.permissions.includes(permissions);
  },
};
