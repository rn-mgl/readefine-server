const db = require("../../db/connection");

class StoryContent {
  constructor(story_id, page, header, content, image) {
    this.story_id = story_id;
    this.page = page;
    this.header = header;
    this.content = content;
    this.image = image;
  }

  async createContent() {
    try {
      const sql =
        "INSERT INTO story_content (story_id, page, header, content, image) VALUES (?, ?, ?, ?, ?);";
      const contentValues = [
        this.story_id,
        this.page,
        this.header,
        this.content,
        this.image,
      ];
      const [data, _] = await db.execute(sql, contentValues);
      return data;
    } catch (error) {
      console.log(error + "--- add content ---");
    }
  }

  static async updateContent(content_id, page, header, content, image) {
    try {
      const sql = `UPDATE story_content page = ? header = ? content = ? image = ?
                    WHERE content_id = ?;`;
      const contentValues = [page, header, content, image, content_id];
      const [data, _] = await db.execute(sql, contentValues);
      return data;
    } catch (error) {
      console.log(error + "--- update content ---");
    }
  }

  static async deleteContent(content_id) {
    try {
      const sql = `DELETE FROM story_content
                    WHERE content_id = ?;`;
      const contentValues = [content_id];
      const [data, _] = await db.execute(sql, contentValues);
      return data;
    } catch (error) {
      console.log(error + "--- delete content ---");
    }
  }

  static async getAllContent(story_id) {
    try {
      const sql = `SELECT * FROM story_content
                    WHERE story_id = ?
                    ORDER BY page;`;
      const contentValues = [story_id];
      const [data, _] = await db.execute(sql, contentValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all content ---");
    }
  }

  static async getContent(content_id) {
    try {
      const sql = `SELECT * FROM story_content
                    WHERE content_id = ?;`;
      const contentValues = [content_id];
      const [data, _] = await db.execute(sql, contentValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get story ---");
    }
  }
}

module.exports = StoryContent;
