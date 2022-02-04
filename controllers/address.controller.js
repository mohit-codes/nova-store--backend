const Address = require("../models/address.model");

const fetchAllAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const addressList = await Address.find({ user: userId });
    return res.json({
      success: true,
      addresses: addressList,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

const addNewAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newAddress } = req.body;
    const newUserAddress = new Address({
      ...newAddress,
      user: userId,
    });
    await newUserAddress.save();
    return res.json({
      success: true,
      newUserAddress,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    await Address.findByIdAndDelete(addressId);
    return res.json({
      success: true,
      message: "address deleted",
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { fetchAllAddresses, addNewAddress, deleteAddress };
