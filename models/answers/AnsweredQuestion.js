const db = require("../../db/connection");

class AnsweredQuestion {
  constructor(question_id, answered_by, answer, taken_id) {
    this.question_id = question_id;
    this.answered_by = answered_by;
    this.answer = answer;
    this.taken_id = taken_id;
  }

  async createAnswer() {
    try {
      const sql =
        "INSERT INTO answered_question (question_id, answered_by, answer, taken_id) VALUES (?, ?, ?, ?);";
      const answerValues = [
        this.question_id,
        this.answered_by,
        this.answer,
        this.taken_id,
      ];
      const [data, _] = await db.query(sql, answerValues);
      return data;
    } catch (error) {
      console.log(error + "--- create answer ---");
    }
  }

  static async getAllAnsweredQuestions(answered_by) {
    try {
      const sql = `SELECT * FROM answered_question AS aq
                    INNER JOIN test_question AS tq
                    ON aq.question_id = tq.question_id
                    WHERE aq.answered_by = ?;`;
      const answerValues = [answered_by];
      const [data, _] = await db.execute(sql, answerValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all answered question ---");
    }
  }

  static async getAnsweredQuestion(answer_id) {
    try {
      const sql = `SELECT * FROM answered_question AS aq
                    INNER JOIN test_question AS tq
                    ON aq.question_id = tq.question_id
                    WHERE aq.answer_id = ?
                    GROUP BY tq.test_id;`;
      const answerValues = [answer_id];

      const [data, _] = await db.execute(sql, answerValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get answered question ---");
    }
  }
}

module.exports = AnsweredQuestion;
