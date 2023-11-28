const usersServices = require("./users.service");

exports.findAll = async (req, res) => {
  try {
    const { requestTime } = req;
    const users = await usersServices.findAll();
    return res.status(200).json({
      requestTime,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Oops! Something has been failed",
      error: error,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { requestTime } = req;
    const { name, email, password, role } = req.body;
    const userFinded = await usersServices.validationEmail(email);
    if (userFinded) {
      return res.status(500).json({
        status: "fail",
        message: `The user with email: ${email} has already been registered`,
      });
    }
    const newUser = await usersServices.create({
      name,
      email,
      password,
      role,
    });
    return res.status(201).json({
      requestTime,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Oops! Something has been failed",
      error: error,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { requestTime } = req;
    const { id } = req.params;
    const user = await usersServices.findOne(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id #${id} has been not found`,
      });
    }
    return res.status(200).json({
      requestTime,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Oops! Something has been failed",
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { requestTime } = req;
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await usersServices.findOne(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id #${id} has been not found`,
      });
    }
    const userUpdated = await usersServices.update(user, { name, email });
    return res.status(200).json({
      requestTime,
      userUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Oops! Something has been failed",
      error: error,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersServices.findOne(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id #${id} has been not found`,
      });
    }
    await usersServices.delete(user);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Oops! Something has been failed",
      error: error,
    });
  }
};