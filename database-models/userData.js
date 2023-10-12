const mongoose = require("mongoose");

const { Schema } = mongoose;

const userDetailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const cinemaPlayUserData = mongoose.model(
  "cinemaPlayUserData",
  userDetailsSchema
);

module.exports = cinemaPlayUserData;
