const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
const Reward = require("../../models/achievements/Reward");

const createReward = async (req, res) => {
  const { id } = req.user;
  const { reward_name, reward_type, reward } = req.body;

  const newReward = new Reward(reward_name, reward_type, reward, id);

  const data = await newReward.createReward();

  if (!data) {
    throw new BadRequestError(`Error in creating reward. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateReward = async (req, res) => {
  const { id } = req.user;
  const { reward_id } = req.params;
  const { reward_name, reward_type, reward } = req.body;

  const data = await Reward.updateReward(reward_id, reward_name, reward_type, reward, id);

  if (!data) {
    throw new BadRequestError(`Error in updating reward. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const deleteReward = async (req, res) => {
  const { reward_id } = req.params;

  const data = await Reward.deleteReward(reward_id);

  if (!data) {
    throw new BadRequestError(`Error in deleting reward. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllRewards = async (req, res) => {
  const data = await Reward.getAllRewards();

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

module.exports = { createReward, updateReward, deleteReward, getAllRewards, getReward };
