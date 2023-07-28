const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");
const MinigameDashboard = require("../../../models/minigames/MinigameDashboard");

const getAllPlayCounts = async (req, res) => {
  const { id } = req.user;

  const counts = await MinigameDashboard.getAllPlayCounts(id);

  if (!counts) {
    throw new BadRequestError(`There was a problem in getting all your play counts.`);
  }

  res.status(StatusCodes.OK).json(counts);
};
module.exports = { getAllPlayCounts };
