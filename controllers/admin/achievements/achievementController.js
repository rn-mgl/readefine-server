const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Achievement = require("../../../models/achievements/Achievement");

const createAchievement = async (req, res) => {
  const { id } = req.user;
  const { achievement } = req.body;
  const { name, type, task, specifics, goal, reward } = achievement;

  const newAchievement = new Achievement(name, type, task, specifics, goal, reward.id, id);

  const data = await newAchievement.createAchievement();

  if (!data) {
    throw new BadRequestError(`Error in creating achievement. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateAchievement = async (req, res) => {
  const { id } = req.user;
  const { achievement_id } = req.params;
  const { achievement_name, achievement_type, task, specifics, goal, reward_id } = req.body;

  const achievement = await Achievement.updateAchievement(
    achievement_id,
    achievement_name,
    achievement_type,
    task,
    specifics,
    goal,
    reward_id,
    id
  );

  if (!achievement) {
    throw new BadRequestError(`Error in updating achievement. Try again later.`);
  }

  res.status(StatusCodes.OK).json(achievement);
};

const deleteAchievement = async (req, res) => {
  const { achievement_id } = req.params;

  const achievement = await Achievement.deleteAchievement(achievement_id);

  if (!achievement) {
    throw new BadRequestError(`Error in deleting achievement. Try again later.`);
  }

  res.status(StatusCodes.OK).json(achievement);
};

const getAllAchievements = async (req, res) => {
  const { searchFilter, goalRangeFilter, sortFilter, dateRangeFilter } = req.query;
  const achievement = await Achievement.getAllAchievements(
    searchFilter,
    goalRangeFilter,
    sortFilter,
    dateRangeFilter
  );

  if (!achievement) {
    throw new BadRequestError(`Error in getting all achievements. Try again later.`);
  }

  res.status(StatusCodes.OK).json(achievement);
};

const getAchievement = async (req, res) => {
  const { achievement_id } = req.params;

  const achievement = await Achievement.getAchievement(achievement_id);

  if (!achievement) {
    throw new BadRequestError(`Error in getting achievement. Try again later.`);
  }

  res.status(StatusCodes.OK).json(achievement);
};

module.exports = {
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getAchievement,
  getAllAchievements,
};
