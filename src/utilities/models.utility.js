exports.userModel = {
  name: null,
  username: null,
  email: null,
  image_file: null,
  roles: [],
};

exports.branchModel = {
  name: null,
  code: null,
  branch_head_id: null,
};

exports.busModel = {
  name: null,
  reg_number: null,
  chassis_no: null,
  engine_no: null,
  seat_count: null,
  bus_model_id: null,
};

exports.routeModel = {
  name: null,
  description: null,
  start_location_id: null,
  end_location_id: null,
  distance: null,
};

exports.tripModel = {
  name: null,
  description: null,
  bus_id: null,
  route_id: null,
  start_time: null,
  end_time: null,
};
