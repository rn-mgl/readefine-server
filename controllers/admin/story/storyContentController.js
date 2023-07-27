const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const StoryContent = require("../../../models/story/StoryContent");
const Story = require("../../../models/story/Story");

const createContent = async (req, res) => {
  const { id } = req.user;
  const { story_id, page, content, image } = req.body;

  const storyContent = new StoryContent(story_id, page, content, image, id);

  const data = await storyContent.createContent();

  if (!data) {
    throw new BadRequestError(`There was a problem in creating the content.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateContent = async (req, res) => {
  const { content_id } = req.params;
  const { id } = req.user;
  const { page, content, image } = req.body;

  const ifExist = await StoryContent.getContent(content_id);

  if (!ifExist) {
    throw new NotFoundError(`The story content you are trying to update does not exist.`);
  }

  const storyContent = await StoryContent.updateContent(content_id, page, content, image, id);

  if (!storyContent) {
    throw new BadRequestError(`There was a problem in updating the story content.`);
  }
};

const deleteContent = async (req, res) => {
  const { content_id } = req.params;

  const ifExist = await StoryContent.getContent(content_id);

  if (!ifExist) {
    throw new NotFoundError(`The story content you are trying to delete does not exist.`);
  }

  const storyContent = await StoryContent.deleteContent(content_id);

  if (!storyContent) {
    throw new BadRequestError(`There was a problem in deleting the story content.`);
  }

  res.status(StatusCodes.OK).json(storyContent);
};

const getAllContent = async (req, res) => {
  const { storyId } = req.query;

  const ifExist = await Story.getStory(storyId);

  if (!ifExist) {
    throw new NotFoundError(`The story you are trying to view does not exist.`);
  }

  const storyContent = await StoryContent.getAllContent(storyId);

  if (!storyContent) {
    throw new BadRequestError(`There was a problem in getting all content.`);
  }

  res.status(StatusCodes.OK).json(storyContent);
};

const getContent = async (req, res) => {
  const { content_id } = req.params;

  const storyContent = await StoryContent.getContent(content_id);

  if (!storyContent) {
    throw new NotFoundError(`The story content you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(storyContent);
};

module.exports = { createContent, updateContent, deleteContent, getAllContent, getContent };
