const db = require("../../db/connection");

class TestQuestion {
  constructor(test_id, question, added_by) {
    this.test_id = test_id;
    this.question = question;
    this.added_by = added_by;
  }

  async createQuestion() {
    try {
      const sql = `INSERT INTO test_question SET ?;`;
      const questionValues = {
        test_id: this.test_id,
        question: this.question,
        added_by: this.added_by,
      };
      const [data, _] = await db.query(sql, questionValues);
      return data;
    } catch (error) {
      console.log(error + "--- create question ---");
    }
  }

  static async updateQuestion(question_id, question, added_by) {
    try {
      const sql = `UPDATE test_question SET ?
                    WHERE question_id = '${question_id}';`;
      const questionValues = { question, added_by };
      const [data, _] = await db.query(sql, questionValues);
      return data;
    } catch (error) {
      console.log(error + "--- update question ---");
    }
  }

  static async deleteQuestion(question_id) {
    try {
      const sql = `DELETE FROM test_question
                    WHERE question_id = '${question_id}';`;
      const [data, _] = await db.execute(sql);
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
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all questions ---");
    }
  }

  static async getQuestion(question_id) {
    try {
      const sql = `SELECT * FROM test_question 
                    WHERE question_id = '${question_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get question ---");
    }
  }
}

module.exports = TestQuestion;
