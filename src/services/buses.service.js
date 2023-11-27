import httpService from "./http.service";

export default {
  getBuses(payload) {
    return httpService.get(
      `buses?search=${payload.filter}&page=${payload.pagination.page}&perPage=${payload.pagination.itemsPerPage}`
    );
  },
  createBus(payload) {
    return httpService.post(`buses`, payload);
  },
  updateBus(id, payload) {
    return httpService.put(`buses/${id}`, payload);
  },
  deleteBus(id) {
    return httpService.delete(`buses/${id}`);
  },
  getBus(id) {
    return httpService.get(`buses/${id}`);
  },
};
