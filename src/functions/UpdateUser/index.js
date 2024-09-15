const userService = require("../shared/userService");

module.exports = async function (context, req) {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    context.res = {
      status: 200,
      body: updatedUser
    };
  } catch (error) {
    context.res = {
      status: 400,
      body: { error: error.message }
    };
  }
};
