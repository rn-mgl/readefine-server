const db = require("../../db/connection");

class AnsweredDangle {
  constructor(dangle_id, answered_by, answer, duration) {
    this.dangle_id = dangle_id;
    this.answered_by = answered_by;
    this.answer = answer;
    this.duration = duration;
  }

  async createAnswer() {
    try {
      const sql = "INSERT INTO answered_dangle SET ?;";
      const answerValues = {
        dangle_id: this.dangle_id,
        answered_by: this.answered_by,
        answer: this.answer,
        duration: this.duration,
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
