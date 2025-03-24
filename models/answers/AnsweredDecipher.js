const db = require("../../db/connection");

class AnsweredDecipher {
  constructor(answered_by, word_id, answer, duration_seconds) {
    this.word_id = word_id;
    this.answered_by = answered_by;
    this.answer = answer;
    this.duration_seconds = duration_seconds;
  }

  async createAnswer() {
    try {
      const sql =
        "INSERT INTO answered_decipher (answered_by, word_id, answer, duration_seconds) VALUES (?, ?, ?, ?);";
      const answerValues = [
        this.answered_by,
        this.word_id,
        this.answer,
        this.duration_seconds,
      ];
      const [data, _] = await db.execute(sql, answerValues);
      return data;
    } catch (error) {
      console.log(error + "--- create answer ---");
    }
  }

  static async getAllAnsweredDeciphers(answered_by) {
    try {
      const sql = `SELECT * FROM answered_decipher AS ad
                    INNER JOIN daily_decipher AS dd
                    ON ad.decipher_id = dd.decipher_id
                    WHERE ad.answered_by = ?;`;
      const answerValues = [answered_by];
      const [data, _] = await db.execute(sql, answerValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all answered question ---");
    }
  }

  static async getAnsweredDecipher(answer_id) {
    try {
      const sql = `SELECT * FROM answered_decipher AS ad
                    INNER JOIN daily_decipher AS dd
                    ON ad.decipher_id = dd.decipher_id
                    WHERE ad.answer_id = ?;`;
      const answerValues = [answer_id];

      const [data, _] = await db.execute(sql, answerValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get answered question ---");
    }
  }
}

module.exports = AnsweredDecipher;
