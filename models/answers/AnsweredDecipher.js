const db = require("../../db/connection");

class AnsweredDecipher {
  constructor(decipher_id, answered_by, answer, duration) {
    this.decipher_id = decipher_id;
    this.answered_by = answered_by;
    this.answer = answer;
    this.duration = duration;
  }

  async createAnswer() {
    try {
      const sql = "INSERT INTO answered_decipher SET ?;";
      const answerValues = {
        decipher_id: this.decipher_id,
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

  static async getAllAnsweredQuestions(answered_by) {
    try {
      const sql = `SELECT * FROM answered_decipher AS ad
                    INNER JOIN daily_decipher AS dd
                    ON ad.decipher_id = dd.decipher_id
                    WHERE ad.answered_by = '${answered_by}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all answered question ---");
    }
  }

  static async getAnsweredQuestion(answer_id) {
    try {
      const sql = `SELECT * FROM answered_decipher AS ad
                    INNER JOIN daily_decipher AS dd
                    ON ad.decipher_id = dd.decipher_id
                    WHERE ad.answer_id = '${answer_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get answered question ---");
    }
  }
}

module.exports = AnsweredDecipher;
