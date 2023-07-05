const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");
const MinigameDashboard = require("../../../models/minigames/MinigameDashboard");

const getAllPlayCounts = async (req, res) => {
  const { id } = req.user;

  const counts = await MinigameDashboard.getAllPlayCounts(id);

  if (!counts) {
    throw new BadRequestError(`Error in getting your play counts. Try again later.`);
  }

  res.status(StatusCodes.OK).json(counts);
};
module.exports = { getAllPlayCounts };
