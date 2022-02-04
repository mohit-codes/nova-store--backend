const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  mobileNo: {
    type: String,
    trim: true,
    required: "Mobile number is required!",
  },
  address: {
    type: String,
    trim: true,
    required: "Address is required!",
  },
  pinCode: {
    type: String,
    trim: true,
    required: "Pin code is required!",
  },
  city: {
    type: String,
    trim: true,
    required: "City is required!",
  },
  state: {
    type: String,
    trim: true,
    required: "State is required!",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
