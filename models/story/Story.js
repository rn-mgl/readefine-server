const db = require("../../db/connection");

class Story {
  constructor(title, author, lexile, genre, added_by) {
    this.title = title;
    this.author = author;
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

  static async updateStory(story_id, title, author, lexile, genre, added_by) {
    try {
      const sql = `UPDATE story SET ?
                    WHERE story_id = '${story_id}';`;
      const storyValues = { title, author, lexile, genre, added_by };
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
    try {
      const sql = `SELECT * FROM story
                  WHERE ${searchFilter.toSearch} LIKE '%${searchFilter.searchKey}%'
                  AND (lexile BETWEEN '${lexileRangeFilter.from}' AND '${lexileRangeFilter.to}')
                  AND (date_added BETWEEN '${dateRangeFilter.from}' AND '${dateRangeFilter.to}')
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
