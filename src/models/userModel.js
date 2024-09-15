const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

// Function to get current time in Sri Lankan timezone (UTC+5:30)
const getSriLankanTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 330); // Add 330 minutes (5 hours 30 minutes) to convert UTC to SLT
  return now;
};

// Define the User schema
const userSchema = new Schema({
  user_id: { type: Number }, // Auto-increment field
  user_name: { type: String, required: true },
  nic: { type: String, required: true, unique: true }, // Unique NIC number
  mobile: { type: String, required: true },
  vehicle_no: { type: String, required: true, unique: true }, // Unique vehicle number
  vehicle_model: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: getSriLankanTime // Set default time to Sri Lankan time
  },
  updatedAt: {
    type: Date,
    required: true,
    default: getSriLankanTime // Set default time to Sri Lankan time
  }
});

// Auto-increment the `user_id` field
userSchema.plugin(AutoIncrement, { inc_field: "user_id" });

// Pre-save hook to update `updatedAt` field to Sri Lankan time
userSchema.pre("save", function (next) {
  this.updatedAt = getSriLankanTime();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
