export default {
  SET_DRAWER_OPEN: (state, drawerOpen) => {
    state.drawerOpen = drawerOpen;
  },
  SET_NOTIFICATION: (state, notification) => {
    state.notification = notification;
  },
  REMOVE_NOTIFICATION: (state) => {
    state.notification = null;
  },
  ADD_REQUEST: (state) => {
    state.pendingRequestsCount += 1;
  },
  REMOVE_REQUEST: (state) => {
    state.pendingRequestsCount =
      state.pendingRequestsCount > 0 ? state.pendingRequestsCount - 1 : 0;
  },
};
