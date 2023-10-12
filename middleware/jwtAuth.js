const jwt = require("jsonwebtoken");

const jwtAuth = (request, response, next) => {
  let jwtToken;

  const authHeaders = request.headers["authorization"];

  if (authHeaders !== undefined) {
    jwtToken = authHeaders.split(" ")[1];
  }

  if (authHeaders === undefined) {
    return response.status(401).json({ message: "JWT token is not provided" });
  } else {
    jwt.verify(jwtToken, "CINEMA_LOGIN", (error, payload) => {
      if (error) {
        return response.status(401).json({ message: "Invalid JWT token" });
      } else {
        request.userId = payload.id;
        next();
      }
    });
  }
};

module.exports = jwtAuth;
