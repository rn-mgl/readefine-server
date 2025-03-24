const db = require("../../db/connection");

class TestQuestion {
  constructor(test_id, question) {
    this.test_id = test_id;
    this.question = question;
  }

  async createQuestion() {
    try {
      const sql = `INSERT INTO test_question (test_id, question) VALUES (?, ?);`;
      const questionValues = [this.test_id, this.question];
      const [data, _] = await db.execute(sql, questionValues);
      return data;
    } catch (error) {
      console.log(error + "--- create question ---");
    }
  }

  static async updateQuestion(question_id, question) {
    try {
      const sql = `UPDATE test_question SET question = ?
                    WHERE question_id = ?;`;
      const questionValues = [question, question_id];
      const [data, _] = await db.execute(sql, questionValues);
      return data;
    } catch (error) {
      console.log(error + "--- update question ---");
    }
  }

  static async deleteQuestion(question_id) {
    try {
      const sql = `DELETE FROM test_question
                    WHERE question_id = ?;`;
      const questionValues = [question_id];
      const [data, _] = await db.execute(sql, questionValues);
      return data;
    } catch (error) {
      console.log(error + "--- delete question ---");
    }
  }

  static async getAllQuestions(test_id) {
    try {
      const sql = `SELECT * FROM test_question AS tq
                    INNER JOIN test_answer AS ta
                    ON tq.question_id = ta.question_id
                    WHERE test_id = '${test_id}';`;
      const questionValues = [test_id];

      const [data, _] = await db.execute(sql, questionValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all questions ---");
    }
  }

  static async getQuestion(question_id) {
    try {
      const sql = `SELECT * FROM test_question 
                    WHERE question_id = '${question_id}';`;
      const questionValues = [question_id];

      const [data, _] = await db.execute(sql, questionValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get question ---");
    }
  }
}

module.exports = TestQuestion;
