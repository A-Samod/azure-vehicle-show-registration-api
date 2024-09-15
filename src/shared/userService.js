const User = require("../models/userModel");

// Create a new user
exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Get a user by ID
exports.getUserById = async (id) => {
  return await User.findById(id);
};

// Get a user by NIC
exports.getUserByNIC = async (nic) => {
  return await User.findOne({ nic });
};

// Get a user by vehicle number
exports.getUserByVehicleNo = async (vehicleNo) => {
  return await User.findOne({ vehicle_no: vehicleNo });
};

// Get all users with pagination
exports.getUsers = async (vehicleNo, page, limit) => {
  const skip = (page - 1) * limit;
  let query = {};
  if (vehicleNo) {
    query.vehicle_no = { $regex: vehicleNo, $options: "i" }; // Case-insensitive search
  }
  const users = await User.find(query).skip(skip).limit(limit);
  const totalUsers = await User.countDocuments(query);
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    currentPage: page,
    totalPages,
    totalUsers,
    limit,
  };
};

// Update a user by ID
exports.updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a user by ID
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

// Validate if a vehicle number exists
exports.validateVehicleNo = async (vehicleNo) => {
  return await User.findOne({ vehicle_no: vehicleNo });
};
