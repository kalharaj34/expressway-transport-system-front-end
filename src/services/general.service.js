import httpService from "./http.service";

export default {
  getRoles() {
    return httpService.get("roles");
  },
  getEmployeeTypes() {
    return httpService.get("employee-types");
  },
  getSubjectClerks() {
    return httpService.get(`employees?employee_type=Subject_Clerk`);
  },
  getGsOfficers() {
    return httpService.get(`employees?employee_type=GS_Officer`);
  },
  getAllBranches() {
    return httpService.get(`branches`);
  },
  getAllSubjects() {
    return httpService.get(`subjects`);
  },
  getAllGsOffices() {
    return httpService.get(`gs-offices`);
  },
  getAllServiceTypes() {
    return httpService.get(`service-types`);
  },
  getAllCustomers() {
    return httpService.get(`customers`);
  },
  getAllBusModels() {
    return httpService.get(`bus-models`);
  },
  getAllRouteLocations() {
    return httpService.get(`locations`);
  },
  getAllRoutes() {
    return httpService.get(`routes`);
  },
  getAllBuses() {
    return httpService.get(`buses`);
  },
};
