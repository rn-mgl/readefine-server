const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Reward = require("../../../models/achievements/Reward");

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
  const { searchFilter, sortFilter, showFilter, typeFilter } = req.query;

  const userAchievement = await Reward.getAllUserRewards(
    id,
    searchFilter,
    sortFilter,
    showFilter,
    typeFilter
  );

  if (!userAchievement) {
    throw new BadRequestError(`Error in getting all your achievements. Try again later.`);
  }

  res.status(StatusCodes.OK).json(userAchievement);
};

module.exports = { getAllUserRewards, getUserReward };
