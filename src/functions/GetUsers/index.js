const userService = require("../shared/userService");

module.exports = async function (context, req) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const vehicleNo = req.query.vehicle_no;

    const users = await userService.getUsers(vehicleNo, page, limit);

    context.res = {
      status: 200,
      body: users
    };
  } catch (error) {
    context.res = {
      status: 404,
      body: { error: "User not found" }
    };
  }
};
