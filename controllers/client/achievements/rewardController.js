const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Reward = require("../../../models/achievements/Reward");

const getUserReward = async (req, res) => {
  const { reward_id } = req.params;

  const data = await Reward.getUserReward(reward_id);

  if (!data) {
    throw new NotFoundError(`The reward you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllUserRewards = async (req, res) => {
  const { id } = req.user;
  const { searchFilter, sortFilter, showFilter, typeFilter } = req.query;

  const userRewards = await Reward.getAllUserRewards(id, searchFilter, sortFilter, showFilter, typeFilter);

  if (!userRewards) {
    throw new BadRequestError(`There was a problem in getting all your rewards.`);
  }

  res.status(StatusCodes.OK).json(userRewards);
};

module.exports = { getAllUserRewards, getUserReward };
