const db = require("../../db/connection");

class AnsweredRiddles {
  constructor(riddle_id, answered_by, answer, duration_seconds) {
    this.riddle_id = riddle_id;
    this.answered_by = answered_by;
    this.answer = answer;
    this.duration_seconds = duration_seconds;
  }

  async createAnswer() {
    try {
      const sql = "INSERT INTO answered_riddles SET ?;";
      const answerValues = {
        riddle_id: this.riddle_id,
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

  static async getAllAnsweredRiddles(answered_by) {
    try {
      const sql = `SELECT * FROM answered_riddles AS ar
                    INNER JOIN riddles AS r
                    ON ar.riddle_id = r.riddle_id
                    WHERE ar.answered_by = '${answered_by}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all answered question ---");
    }
  }

  static async getAnsweredRiddle(answer_id) {
    try {
      const sql = `SELECT * FROM answered_riddles AS ar
                    INNER JOIN riddles AS r
                    ON ar.riddle_id = r.riddle_id
                    WHERE ar.answer_id = '${answer_id}';`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get answered question ---");
    }
  }
}

module.exports = AnsweredRiddles;
