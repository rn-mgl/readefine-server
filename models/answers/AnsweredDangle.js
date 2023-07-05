const db = require("../../db/connection");

class AnsweredDangle {
  constructor(answered_by, word_id, answer, duration_seconds) {
    this.answered_by = answered_by;
    this.word_id = word_id;
    this.answer = answer;
    this.duration_seconds = duration_seconds;
  }

  async createAnswer() {
    try {
      const sql = "INSERT INTO answered_dangle SET ?;";
      const answerValues = {
        word_id: this.word_id,
        answered_by: this.answered_by,
        answer: this.answer,
        duration_seconds: this.duration_seconds,
      };
      const [data, _] = await db.query(sql, answerValues);
      return data;
    } catch (error) {
      console.log(error + "--- create answer ---");
    }
  }

  static async getAllAnsweredDangles(answered_by) {
    try {
      const sql = `SELECT * FROM answered_dangle AS ad
                    INNER JOIN daily_dangle AS dd
                    ON ad.dangle_id = dd.dangle_id
                    WHERE ad.answered_by = '${answered_by}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all answered question ---");
    }
  }

  static async getAnsweredDangle(answer_id) {
    try {
      const sql = `SELECT * FROM answered_dangle AS ad
                    INNER JOIN daily_dangle AS dd
                    ON ad.dangle_id = dd.dangle_id
                    WHERE ad.answer_id = '${answer_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get answered question ---");
    }
  }
}

module.exports = AnsweredDangle;
