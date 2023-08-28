const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Achievement = require("../../../models/achievements/Achievement");
const User = require("../../../models/users/User");
const UserAchievement = require("../../../models/achievements/UserAchievement");

const createAchievement = async (req, res) => {
  const { id } = req.user;
  const { achievement } = req.body;
  const { name, type, task, goal, reward } = achievement;

  const newAchievement = new Achievement(name, type, task, goal, reward.id, id);

  const data = await newAchievement.createAchievement();

  if (!data) {
    throw new BadRequestError(`There was a problem in creating the achievement ${name}.`);
  }

  const users = await User.getAllRawUsers();

  if (!users) {
    throw new BadRequestError(
      `There was a problem in getting the users for assigning the achievement.`
    );
  }

  users?.map(async (user) => {
    const points = await UserAchievement.getUserPoints(user.user_id, type);

    if (!points && points !== 0) {
      throw new BadRequestError(`There was a problem in getting the previous points.`);
    }

    const assignAchievement = await UserAchievement.assignAchievement(
      data.insertId,
      user.user_id,
      points
    );

    if (!assignAchievement) {
      throw new BadRequestError(`There was a problem in assigning the achievement to the users.`);
    }
  });

  res.status(StatusCodes.OK).json(data);
};

const updateAchievement = async (req, res) => {
  const { id } = req.user;
  const { achievement_id } = req.params;
  const { achievement } = req.body;
  const { achievement_name, achievement_type, task, goal, reward_id } = achievement;

  const ifExist = await Achievement.getAchievement(achievement_id);

  if (!ifExist) {
    throw new BadRequestError(`The achievement you are trying to update does not exist.`);
  }

  const data = await Achievement.updateAchievement(
    achievement_id,
    achievement_name,
    achievement_type,
    task,

    goal,
    reward_id,
    id
  );

  if (!data) {
    throw new BadRequestError(
      `There was a problem in updating the achievement ${achievement_name}.`
    );
  }

  res.status(StatusCodes.OK).json(data);
};

const deleteAchievement = async (req, res) => {
  const { achievement_id } = req.params;

  const ifExist = await Achievement.getAchievement(achievement_id);

  if (!ifExist) {
    throw new BadRequestError(`The achievement you are trying to delete does not exist.`);
  }

  const achievement = await Achievement.deleteAchievement(achievement_id);

  if (!achievement) {
    throw new BadRequestError(`There was a problem in deleting the achievement.`);
  }

  res.status(StatusCodes.OK).json(achievement);
};

const getAllAchievements = async (req, res) => {
  const { searchFilter, goalRangeFilter, sortFilter, dateRangeFilter, typeFilter } = req.query;

  const achievement = await Achievement.getAllAchievements(
    searchFilter,
    goalRangeFilter,
    sortFilter,
    dateRangeFilter,
    typeFilter
  );

  if (!achievement) {
    throw new BadRequestError(`There was a problem in getting the achievements.`);
  }

  res.status(StatusCodes.OK).json(achievement);
};

const getAchievement = async (req, res) => {
  const { achievement_id } = req.params;

  const achievement = await Achievement.getAchievement(achievement_id);

  if (!achievement) {
    throw new BadRequestError(`The achievement you want to view does not exist.`);
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
