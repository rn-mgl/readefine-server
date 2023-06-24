const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const ReadStory = require("../../../models/story/ReadStory");

const createReadStory = async (req, res) => {
  const { id } = req.user;
  const { storyId } = req.body;

  const readStory = new ReadStory(id, storyId);

  const data = await readStory.createReadStory();

  if (!data) {
    throw new BadRequestError(`Error in adding story to read. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { createReadStory };
