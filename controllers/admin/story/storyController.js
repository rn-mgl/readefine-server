const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Story = require("../../../models/story/Story");
const StoryContent = require("../../../models/story/StoryContent");

const createStory = async (req, res) => {
  const { storyFilter, pages } = req.body;
  const { title, author, lexile, genre, bookCover, bookAudio } = storyFilter;
  const { id } = req.user;

  const story = new Story(title, author, bookCover, bookAudio, lexile, genre, id);

  const data = await story.createStory();

  if (!data) {
    throw new BadRequestError(`There was a problem in creating the story ${title}.`);
  }

  pages.map(async (page) => {
    const pageContent = new StoryContent(
      data.insertId,
      page.pageNumber,
      page.pageHeader,
      page.pageContent,
      page.pageImage,
      id
    );

    const newPage = await pageContent.createContent();

    if (!newPage) {
      throw new BadRequestError(`There was a problem in adding the content in page ${page.pageNumber}.`);
    }
  });

  res.status(StatusCodes.OK).json(data);
};

const updateStory = async (req, res) => {
  const { story, pages, toDelete } = req.body;
  const { title, author, lexile, genre, bookCover, bookAudio } = story;
  const { story_id } = req.params;
  const { id } = req.user;

  const ifExist = await Story.getStory(story_id);

  if (!ifExist) {
    throw new NotFoundError(`The story you are trying to update does not exist.`);
  }

  const data = await Story.updateStory(story_id, title, author, bookCover, bookAudio, lexile, genre, id);

  if (!data) {
    throw new BadRequestError(`There was a problem in updating the story ${title}.`);
  }

  toDelete.map(async (contentId) => {
    const deleteContent = await StoryContent.deleteContent(contentId);

    if (!deleteContent) {
      throw new BadRequestError(`There was a problem in deleting the story content.`);
    }
  });

  pages.map(async (page) => {
    const { content_id, header, content, pageImage } = page;

    if (!content_id) {
      const newPage = new StoryContent(story_id, page.page, header, content, pageImage, id);

      const addPage = await newPage.createContent();

      if (!addPage) {
        throw new BadRequestError(`There was a problem in adding the new page ${page.page} content.`);
      }
    } else {
      const ifExist = await StoryContent.getContent(content_id);

      if (!ifExist) {
        throw new NotFoundError(`The story content you are trying to update does not exist.`);
      }

      const editPage = await StoryContent.updateContent(content_id, page.page, header, content, pageImage, id);

      if (!editPage) {
        throw new BadRequestError(`Error in editing page content. Try again later.`);
      }
    }
  });

  res.status(StatusCodes.OK).json(data);
};

const deleteStory = async (req, res) => {
  const { story_id } = req.params;

  const ifExist = await Story.getStory(story_id);

  if (!ifExist) {
    throw new NotFoundError(`The story you are trying to delete does not exist.`);
  }

  const story = await Story.deleteStory(story_id);

  if (!story) {
    throw new BadRequestError(`There was a problem in deleting the story.`);
  }

  res.status(StatusCodes.OK).json(story);
};

const getAllStories = async (req, res) => {
  const { searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter } = req.query;
  const story = await Story.getAllStories(searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter);

  if (!story) {
    throw new BadRequestError(`There was a problem in getting all the stories.`);
  }

  res.status(StatusCodes.OK).json(story);
};

const getStory = async (req, res) => {
  const { story_id } = req.params;

  const story = await Story.getStory(story_id);

  if (!story) {
    throw new NotFoundError(`The story you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(story);
};

module.exports = { createStory, updateStory, deleteStory, getAllStories, getStory };
