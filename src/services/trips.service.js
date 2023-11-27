import httpService from "./http.service";

export default {
  getTrips(payload) {
    return httpService.get(
      `trips?search=${payload.filter}&page=${payload.pagination.page}&perPage=${payload.pagination.itemsPerPage}`
    );
  },
  createTrip(payload) {
    return httpService.post(`trips`, payload);
  },
  updateTrip(id, payload) {
    return httpService.put(`trips/${id}`, payload);
  },
  deleteTrip(id) {
    return httpService.delete(`trips/${id}`);
  },
  getTrip(id) {
    return httpService.get(`trips/${id}`);
  },
};
