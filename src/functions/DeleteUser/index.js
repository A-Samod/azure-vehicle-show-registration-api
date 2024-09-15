const userService = require("../shared/userService");

module.exports = async function (context, req) {
  try {
    await userService.deleteUser(req.params.id);
    context.res = {
      status: 200,
      body: { message: "User deleted" }
    };
  } catch (error) {
    context.res = {
      status: 404,
      body: { error: "User not found" }
    };
  }
};
