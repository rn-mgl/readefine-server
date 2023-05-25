const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const StoryContent = require("../../../models/story/StoryContent");

const createContent = async (req, res) => {
  const { id } = req.user;
  const { story_id, page, content, image } = req.body;

  const storyContent = new StoryContent(story_id, page, content, image, id);

  const data = await storyContent.createContent();

  if (!data) {
    throw new BadRequestError(`Error in creating content. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateContent = async (req, res) => {
  const { content_id } = req.params;
  const { id } = req.user;
  const { page, content, image } = req.body;

  const storyContent = await StoryContent.updateContent(content_id, page, content, image, id);

  if (!storyContent) {
    throw new BadRequestError(`Error in updating content. Try again later.`);
  }
};

const deleteContent = async (req, res) => {
  const { content_id } = req.params;

  const storyContent = await StoryContent.deleteContent(content_id);

  if (!storyContent) {
    throw new BadRequestError(`Error in deleting content. Try again later.`);
  }

  res.status(StatusCodes.OK).json(storyContent);
};

const getAllContent = async (req, res) => {
  const { story_id } = req.query;

  const storyContent = await StoryContent.getAllContent(story_id);

  if (!storyContent) {
    throw new BadRequestError(`Error in getting all content. Try again later.`);
  }

  res.status(StatusCodes.OK).json(storyContent);
};

const getContent = async (req, res) => {
  const { content_id } = req.params;

  const storyContent = await StoryContent.getContent(content_id);

  if (!storyContent) {
    throw new BadRequestError(`Error in getting all content. Try again later.`);
  }

  res.status(StatusCodes.OK).json(storyContent);
};

module.exports = { createContent, updateContent, deleteContent, getAllContent, getContent };
