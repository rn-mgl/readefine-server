const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Story = require("../../../models/story/Story");
const StoryContent = require("../../../models/story/StoryContent");

const createStory = async (req, res) => {
  const { storyFilter, pages } = req.body;
  const { title, author, lexile, genre, file } = storyFilter;
  const { id } = req.user;

  const story = new Story(title, author, file.src, lexile, genre, id);

  const data = await story.createStory();

  if (!data) {
    throw new BadRequestError(`Error in creating story. Try again later.`);
  }

  pages.map(async (page) => {
    const pageContent = new StoryContent(
      data.insertId,
      page.pageNumber,
      page.pageHeader,
      page.pageContent,
      page.file.src,
      id
    );

    const newPage = await pageContent.createContent();

    if (!newPage) {
      throw new BadRequestError(`Error in adding page content. Try again later.`);
    }
  });

  res.status(StatusCodes.OK).json(data);
};

const updateStory = async (req, res) => {
  const { story, pages, toDelete } = req.body;
  const { title, author, lexile, genre, file, book_cover } = story;
  const { story_id } = req.params;
  const { id } = req.user;

  const bookCover = file?.src ? file?.src : book_cover ? book_cover : null;

  const data = await Story.updateStory(story_id, title, author, bookCover, lexile, genre, id);

  if (!data) {
    throw new BadRequestError(`Error in creating story. Try again later.`);
  }

  toDelete.map(async (contentId) => {
    const deleteContent = await StoryContent.deleteContent(contentId);

    if (!deleteContent) {
      throw new BadRequestError(`Error in deleting story content. Try again later.`);
    }
  });

  pages.map(async (page) => {
    const { content_id, header, content, file, image } = page;
    const pageImage = file?.src ? file?.src : image ? image : null;

    if (!content_id) {
      const newPage = new StoryContent(story_id, page.page, header, content, pageImage, id);

      const addPage = await newPage.createContent();

      if (!addPage) {
        throw new BadRequestError(`Error in adding page content. Try again later.`);
      }
    } else {
      const editPage = await StoryContent.updateContent(
        content_id,
        page.page,
        header,
        content,
        pageImage,
        id
      );

      if (!editPage) {
        throw new BadRequestError(`Error in editing page content. Try again later.`);
      }
    }
  });

  res.status(StatusCodes.OK).json(data);
};

const deleteStory = async (req, res) => {
  const { story_id } = req.params;

  const story = await Story.deleteStory(story_id);

  if (!story) {
    throw new BadRequestError(`Error in deleting story. Try again later.`);
  }

  res.status(StatusCodes.OK).json(story);
};

const getAllStories = async (req, res) => {
  const { searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter } = req.query;
  const story = await Story.getAllStories(
    searchFilter,
    lexileRangeFilter,
    sortFilter,
    dateRangeFilter
  );

  if (!story) {
    throw new BadRequestError(`Error in getting all stories. Try again later.`);
  }

  res.status(StatusCodes.OK).json(story);
};

const getStory = async (req, res) => {
  const { story_id } = req.params;

  const story = await Story.getStory(story_id);

  if (!story) {
    throw new BadRequestError(`Error in getting story. Try again later.`);
  }

  res.status(StatusCodes.OK).json(story);
};

module.exports = { createStory, updateStory, deleteStory, getAllStories, getStory };
