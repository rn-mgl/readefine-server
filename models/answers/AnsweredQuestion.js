const db = require("../../db/connection");

class AnsweredQuestion {
  constructor(question_id, answered_by, answer) {
    this.question_id = question_id;
    this.answered_by = answered_by;
    this.answer = answer;
  }

  async createAnswer() {
    try {
      const sql = "INSERT INTO answered_question SET ?;";
      const answerValues = {
        question_id: this.question_id,
        answered_by: this.answered_by,
        answer: this.answer,
      };
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
                    WHERE aq.answered_by = '${answered_by}';`;
      const [data, _] = await db.execute(sql);
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
                    WHERE aq.answer_id = '${answer_id}'
                    GROUP BY tq.test_id;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get answered question ---");
    }
  }
}

module.exports = AnsweredQuestion;
