const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const ReadStory = require("../../../models/story/ReadStory");
const Story = require("../../../models/story/Story");

const createReadStory = async (req, res) => {
  const { id } = req.user;
  const { storyId } = req.body;

  const ifExist = await Story.getStory(storyId);

  if (!ifExist) {
    throw new NotFoundError(
      `The story you are trying to add in your reading record does not exist. `
    );
  }

  const readStory = new ReadStory(id, storyId);

  const data = await readStory.createReadStory();

  if (!data) {
    throw new BadRequestError(`There was a problem in adding the story to your reading records.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { createReadStory };
