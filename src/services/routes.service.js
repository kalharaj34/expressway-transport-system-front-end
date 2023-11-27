import httpService from "./http.service";

export default {
  getRoutes(payload) {
    return httpService.get(
      `routes?search=${payload.filter}&page=${payload.pagination.page}&perPage=${payload.pagination.itemsPerPage}`
    );
  },
  createRoute(payload) {
    return httpService.post(`routes`, payload);
  },
  updateRoute(id, payload) {
    return httpService.put(`routes/${id}`, payload);
  },
  deleteRoute(id) {
    return httpService.delete(`routes/${id}`);
  },
  getRoute(id) {
    return httpService.get(`routes/${id}`);
  },
};
