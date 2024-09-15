const userService = require("../shared/userService");

module.exports = async function (context, req) {
  try {
    const vehicleNo = req.body.vehicle_no.toUpperCase();
    const user = await userService.validateVehicleNo(vehicleNo);

    if (user) {
      context.res = {
        status: 200,
        body: { valid: true }
      };
    } else {
      context.res = {
        status: 404,
        body: { valid: false }
      };
    }
  } catch (error) {
    context.res = {
      status: 400,
      body: { error: error.message }
    };
  }
};
