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
}

module.exports = ReadStory;
