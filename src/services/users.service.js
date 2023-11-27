import httpService from "./http.service";

export default {
  getUsers(payload) {
    return httpService.get(
      `users?search=${payload.filter}&page=${payload.pagination.page}&perPage=${payload.pagination.itemsPerPage}`
    );
  },
  createUser(payload) {
    return httpService.post(`users`, payload);
  },
  updateUser(id, payload) {
    return httpService.put(`users/${id}`, payload);
  },
  deleteUser(id) {
    return httpService.delete(`users/${id}`);
  },
  getUser(id) {
    return httpService.get(`users/${id}`);
  },
};
