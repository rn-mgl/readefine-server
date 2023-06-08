const db = require("../../db/connection");

class ReadStory {
  constructor(read_by, story_id) {
    this.read_by = read_by;
    this.story_id = story_id;
  }

  async createReadStory() {
    try {
      const sql = "INSERT INTO read_story SET ?;";
      const readStoryValues = { read_by: this.read_by, story_id: this.story_id };
      const [data, _] = await db.query(sql, readStoryValues);
      return data;
    } catch (error) {
      console.log(error + "--- create read story ---");
    }
  }

  static async getReadStories(user_id) {
    try {
      const sql = `SELECT * FROM read_story AS rs
                  INNER JOIN users AS u ON rs.read_by = u.user_id
                  INNER JOIN story AS s ON rs.story_id = s.story_id
                  WHERE rs.read_by = '${user_id}'
                  ORDER BY rs.date_read;`;
      const [data, _] = await db.execute(sql);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ReadStory;
