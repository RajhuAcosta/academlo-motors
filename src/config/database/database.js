const { Sequelize } = require("sequelize");
const { envs } = require("../environments/environments");

const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

const auth = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been authenticated successfully");
  } catch (error) {
    console.log(error);
  }
};

const sync = async () => {
  try {
    await sequelize.sync(); // { force: true }
    console.log("Connection has been synchronized successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  auth,
  sync,
  sequelize,
};