const db = require("../../db/connection");

class Story {
  constructor(title, author, book_cover, lexile, genre, added_by) {
    this.title = title;
    this.author = author;
    this.book_cover = book_cover;
    this.lexile = lexile;
    this.genre = genre;
    this.added_by = added_by;
  }

  async createStory() {
    try {
      const sql = "INSERT INTO story SET ?;";
      const storyValues = {
        title: this.title,
        author: this.author,
        book_cover: this.book_cover,
        lexile: this.lexile,
        genre: this.genre,
        added_by: this.added_by,
      };
      const [data, _] = await db.query(sql, storyValues);
      return data;
    } catch (error) {
      console.log(error + "--- create story ---");
    }
  }

  static async updateStory(story_id, title, author, book_cover, lexile, genre, added_by) {
    try {
      const sql = `UPDATE story SET ?
                    WHERE story_id = '${story_id}';`;
      const storyValues = { title, author, book_cover, lexile, genre, added_by };
      const [data, _] = await db.query(sql, storyValues);
      return data;
    } catch (error) {
      console.log(error + "--- update story ---");
    }
  }

  static async deleteStory(story_id) {
    try {
      const sql = `DELETE FROM story
                    WHERE story_id = '${story_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- delete story ---");
    }
  }

  static async getAllStories(searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter) {
    const lexileFrom = lexileRangeFilter.from ? lexileRangeFilter.from : 0;
    const lexileTo = lexileRangeFilter.to ? lexileRangeFilter.to : 1400;
    const dateFrom = dateRangeFilter.from ? dateRangeFilter.from : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();
    try {
      const sql = `SELECT * FROM story
                  WHERE ${searchFilter.toSearch} LIKE '%${searchFilter.searchKey}%'
                  AND 
                      lexile >= '${lexileFrom}' 
                  AND 
                      lexile <= '${lexileTo}'
                  AND 
                      date_added >= '${dateFrom}' 
                  AND 
                      date_added <= '${dateTo}'
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;
      const [data, _] = await db.execute(sql);

      return data;
    } catch (error) {
      console.log(error + "--- get all stories ---");
    }
  }

  static async getStory(story_id) {
    try {
      const sql = `SELECT * FROM story
                    WHERE story_id = '${story_id}';`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get story ---");
    }
  }
}

module.exports = Story;
