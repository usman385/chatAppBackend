const jwt = require("jsonwebtoken");
const Users = require("../models/UserModel");

exports.protect = async (req, res, next) => {
  let token;
  if (req.authorization && req.headers.authorization.startswith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decode token id

      const decoded = jwt.verify(token, "dont-show-this");
      req.user = await Users.findById(decoded._id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized...");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No token");
  }
};
