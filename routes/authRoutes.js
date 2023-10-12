const express = require("express");
const cinemaPlayUserData = require("../database-models/userData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtAuth = require("../middleware/jwtAuth");

const router = express.Router();

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    const isUserExists = await cinemaPlayUserData.findOne({ email: email });

    if (isUserExists !== null) {
      const comparePassword = await bcrypt.compare(
        password,
        isUserExists.password
      );

      if (comparePassword) {
        const payload = {
          id: isUserExists._id,
        };

        const jwtToken = jwt.sign(payload, "CINEMA_LOGIN", {
          expiresIn: "24hr",
        });

        return response
          .status(200)
          .json({ token: jwtToken, message: "Successfully Logged in" });
      } else {
        return response.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return response.status(400).json({ message: "Invalid Email" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signup", async (request, response) => {
  try {
    const { email, password, phoneNumber, name } = request.body;

    const isUserExists = await cinemaPlayUserData.findOne({ email: email });

    if (isUserExists === null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new cinemaPlayUserData({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
      });
      await user.save();
      return response.status(200).json({ message: "Registration Success" });
    } else {
      return response.status(400).json({ message: "User Already Exists" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/profile", jwtAuth, async (request, response) => {
  const userData = await cinemaPlayUserData.findOne({ _id: request.userId });
  return response.send(userData);
});

module.exports = router;
