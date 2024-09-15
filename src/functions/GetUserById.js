const userService = require("../shared/userService");

module.exports = async function (context, req) {
  try {
    const user = await userService.getUserById(req.params.id);
    context.res = {
      status: 200,
      body: user
    };
  } catch (error) {
    context.res = {
      status: 404,
      body: { error: "User not found" }
    };
  }
};
