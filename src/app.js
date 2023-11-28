const router_users = require("./users/users.route");
const router_repairs = require("./repairs/repairs.route");
const express = require("express");
const app = express();
const calculateRequestTime = (req, res, next) => {
  const requestTime = new Date().toISOString();
  req.requestTime = requestTime;
  next();
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(calculateRequestTime);
app.use("/api/v1", router_users);
app.use("/api/v1", router_repairs);

module.exports = app;