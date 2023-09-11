const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Reward = require("../../../models/achievements/Reward");

const createReward = async (req, res) => {
  const { id } = req.user;
  const { name, type, reward, description } = req.body;

  const newReward = new Reward(name, type, reward, description, id);

  const data = await newReward.createReward();

  if (!data) {
    throw new BadRequestError(`There was a problem in creating the reward ${name}.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateReward = async (req, res) => {
  const { id } = req.user;
  const { reward_id } = req.params;
  const { reward_name, reward_type, description, reward } = req.body;

  const ifExist = await Reward.getReward(reward_id);

  if (!ifExist) {
    throw new NotFoundError(`The reward you are trying to update does not exist.`);
  }

  const data = await Reward.updateReward(reward_id, reward_name, reward_type, description, reward, id);

  if (!data) {
    throw new BadRequestError(`There was a problem in updating the reward ${reward_name}.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const deleteReward = async (req, res) => {
  const { reward_id } = req.params;

  const ifExist = await Reward.getReward(reward_id);

  if (!ifExist) {
    throw new NotFoundError(`The reward you are trying to delete does not exist.`);
  }

  const data = await Reward.deleteReward(reward_id);

  if (!data) {
    throw new BadRequestError(`There was a problem in deleting the reward.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllRewards = async (req, res) => {
  const { searchFilter, sortFilter, dateRangeFilter, typeFilter } = req.query;
  const data = await Reward.getAllRewards(searchFilter, sortFilter, dateRangeFilter, typeFilter);

  if (!data) {
    throw new BadRequestError(`There was a problem in getting all the rewards.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getReward = async (req, res) => {
  const { reward_id } = req.params;

  const ifExist = await Reward.getReward(reward_id);

  if (!ifExist) {
    throw new NotFoundError(`The reward you are trying to view does not exist.`);
  }

  const data = await Reward.getReward(reward_id);

  if (!data) {
    throw new BadRequestError(`There was a problem in getting the reward.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { createReward, updateReward, deleteReward, getAllRewards, getReward };
