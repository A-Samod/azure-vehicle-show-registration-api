const userService = require("../shared/userService");

module.exports = async function (context, req) {
  try {
    const vehicleNo = req.body.vehicle_no.toUpperCase();

    // Check if the vehicle number already exists
    const checkVehicleNo = await userService.validateVehicleNo(vehicleNo);
    if (checkVehicleNo) {
      context.res = {
        status: 400,
        body: { error: "Vehicle number already exists" }
      };
      return;
    }

    const userData = { ...req.body, vehicle_no: vehicleNo };
    const newUser = await userService.createUser(userData);

    context.res = {
      status: 201,
      body: newUser
    };
  } catch (error) {
    context.res = {
      status: 400,
      body: { error: error.message }
    };
  }
};
