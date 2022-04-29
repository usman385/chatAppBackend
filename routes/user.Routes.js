const { Router } = require("express");
const express = require("express");
const rfr = require("rfr");
const routes = express.Router();

const userController = rfr("/controllers/user.controller.js");
const usermiddleware = rfr("/middleware/authmiddleware.js");

routes.post("/signUp", userController.signUp);
routes.post("/login", userController.login);
routes.get("/searchUser", usermiddleware.protect, userController.searchUser);

module.exports = routes;
