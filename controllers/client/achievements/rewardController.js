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

const getUserReward = async (req, res) => {
  const { reward_id } = req.params;

  const data = await Reward.getUserReward(reward_id);

  if (!data) {
    throw new BadRequestError(`Error in getting reward. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllUserRewards = async (req, res) => {
  const { id } = req.user;
  const { searchFilter, sortFilter, showFilter } = req.query;
  const userAchievement = await Reward.getAllUserRewards(id, searchFilter, sortFilter, showFilter);

  if (!userAchievement) {
    throw new BadRequestError(`Error in getting all your achievements. Try again later.`);
  }

  res.status(StatusCodes.OK).json(userAchievement);
};

module.exports = { getAllRewards, getReward, getAllUserRewards, getUserReward };
