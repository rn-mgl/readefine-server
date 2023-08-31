const db = require("../../db/connection");

class StoryContent {
  constructor(story_id, page, header, content, image, added_by) {
    this.story_id = story_id;
    this.page = page;
    this.header = header;
    this.content = content;
    this.image = image;
    this.added_by = added_by;
  }

  async createContent() {
    try {
      const sql = "INSERT INTO story_content SET ?;";
      const contentValues = {
        story_id: this.story_id,
        page: this.page,
        header: this.header,
        content: this.content,
        image: this.image,
        added_by: this.added_by,
      };
      const [data, _] = await db.query(sql, contentValues);
      return data;
    } catch (error) {
      console.log(error + "--- add content ---");
    }
  }

  static async updateContent(
    content_id,
    page,
    header,
    content,
    image,
    added_by
  ) {
    try {
      const sql = `UPDATE story_content SET ?
                    WHERE content_id = '${content_id}';`;
      const contentValues = { page, header, content, image, added_by };
      const [data, _] = await db.query(sql, contentValues);
      return data;
    } catch (error) {
      console.log(error + "--- update content ---");
    }
  }

  static async deleteContent(content_id) {
    try {
      const sql = `DELETE FROM story_content
                    WHERE content_id = '${content_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- delete content ---");
    }
  }

  static async getAllContent(story_id) {
    try {
      const sql = `SELECT * FROM story_content
                    WHERE story_id = '${story_id}'
                    ORDER BY page;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all content ---");
    }
  }

  static async getContent(content_id) {
    try {
      const sql = `SELECT * FROM story_content
                    WHERE content_id = '${content_id}';`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get story ---");
    }
  }

  static async getImage() {
    try {
      const sql = `SELECT image, content_id FROM story_content`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUrl(url, id) {
    try {
      const sql = `UPDATE story_content SET ? 
                  WHERE content_id = '${id}';`;
      const vals = { image: url };
      const [data, _] = await db.query(sql, vals);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = StoryContent;
