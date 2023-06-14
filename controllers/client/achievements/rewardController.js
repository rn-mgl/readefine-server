const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Reward = require("../../../models/achievements/Reward");

const getAllRewards = async (req, res) => {
  const { searchFilter, sortFilter, dateRangeFilter } = req.query;
  const data = await Reward.getAllRewards(searchFilter, sortFilter, dateRangeFilter);

  if (!data) {
    throw new BadRequestError(`Error in getting all rewards. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getReward = async (req, res) => {
  const { reward_id } = req.params;

  const data = await Reward.getReward(reward_id);

  if (!data) {
    throw new BadRequestError(`Error in getting reward. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getAllRewards, getReward };
