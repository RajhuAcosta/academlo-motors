const usersModel = require("./users.model");

class usersServices {
  static async findAll() {
    return await usersModel.findAll({
      where: {
        status: "available",
      },
    });
  }
  static async validationEmail(email) {
    return await usersModel.findOne({
      where: {
        email: email,
      },
    });
  }
  static async create(data) {
    return await usersModel.create(data);
  }
  static async findOne(id) {
    return await usersModel.findOne({
      where: {
        id: id,
        status: "available",
      },
    });
  }
  static async update(user, data) {
    return await user.update(data);
  }
  static async delete(user) {
    return await user.update({
      status: "disabled",
    });
  }
}

module.exports = usersServices;