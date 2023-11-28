const repairsServices = require("./repairs.service");

exports.findAll = async (req, res) => {
  try {
    const { requestTime } = req;
    const repairs = await repairsServices.findAll();
    return res.status(200).json({
      requestTime,
      repairs,
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
    const { date, userId } = req.body;
    const newRepair = await repairsServices.create({
      date,
      userId,
    });
    return res.status(201).json({
      requestTime,
      data: newRepair,
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
    const repair = await repairsServices.findOne(id);
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id #${id} has been not found`,
      });
    }
    return res.status(200).json({
      requestTime,
      repair,
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
    const repair = await repairsServices.findOne(id);
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `User with id #${id} has been not found`,
      });
    }
    const repairUpdated = await repairsServices.update(repair);
    return res.status(200).json({
      requestTime,
      repairUpdated,
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
    const repair = await repairsServices.findOneForDelete(id);
    if (repair.status == "completed") {
      return res.status(500).json({
        status: "fail",
        message: `The repair with id #${id} has been completed`,
      });
    }
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id #${id} has been not found`,
      });
    }
    await repairsServices.delete(repair);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Oops! Something has been failed",
      error: error,
    });
  }
};