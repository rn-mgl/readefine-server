const db = require("../../db/connection");

class ReadStory {
  constructor(read_by, story_id) {
    this.read_by = read_by;
    this.story_id = story_id;
  }

  async createReadStory() {
    // read story if not yet read to avoid duplicates
    try {
      const sql = `INSERT INTO read_story (read_by, story_id)
                   SELECT * FROM 
                    (SELECT '${this.read_by}' AS read_by, '${this.story_id}' AS story_id) AS tmp
                   WHERE NOT EXISTS (
                    SELECT read_by FROM read_story 
                    WHERE read_by = '${this.read_by}'
                    AND story_id = '${this.story_id}'
                   ) LIMIT 1`;
      const readStoryValues = { read_by: this.read_by, story_id: this.story_id };
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- create read story ---");
    }
  }

  static async getReadStories(user_id, month) {
    try {
      const sql = `SELECT * FROM read_story AS rs
                  INNER JOIN users AS u ON rs.read_by = u.user_id
                  INNER JOIN story AS s ON rs.story_id = s.story_id
                  WHERE rs.read_by = '${user_id}'
                  AND
                    MONTH(rs.date_read) = '${month}'
                  AND
                    YEAR(rs.date_read) = YEAR(CURDATE())
                  ORDER BY rs.date_read;`;
      const [data, _] = await db.execute(sql);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ReadStory;
