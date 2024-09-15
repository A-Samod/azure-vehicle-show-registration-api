const User = require("../models/userModel");

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.getUsers = async (vehicleNo, page, limit) => {
  const skip = (page - 1) * limit;
  let query = {};
  if (vehicleNo) {
    query.vehicle_no = { $regex: vehicleNo, $options: 'i' };
  }

  const users = await User.find(query).skip(skip).limit(limit);
  const totalUsers = await User.countDocuments(query);
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    currentPage: page,
    totalPages,
    totalUsers,
    limit
  };
};

exports.updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

exports.validateVehicleNo = async (vehicleNo) => {
  return await User.findOne({ vehicle_no: vehicleNo });
};
