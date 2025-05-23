const db = require("../../db/connection");

class TestAnswer {
  constructor(question_id, answer, choice_1, choice_2, choice_3, choice_4) {
    this.question_id = question_id;
    this.answer = answer;
    this.choice_1 = choice_1;
    this.choice_2 = choice_2;
    this.choice_3 = choice_3;
    this.choice_4 = choice_4;
  }

  async createAnswer() {
    try {
      const sql =
        "INSERT INTO test_answer (question_id, answer, choice_1, choice_2, choice_3, choice_4) VALUES (?, ?, ?, ?, ?, ?);";
      const answerValues = [
        this.question_id,
        this.answer,
        this.choice_1,
        this.choice_2,
        this.choice_3,
        this.choice_4,
      ];

      const [data, _] = await db.execute(sql, answerValues);
      return data;
    } catch (error) {
      console.log(error + "--- create answer ---");
    }
  }

  static async updateAnswer(
    answer_id,
    answer,
    choice_1,
    choice_2,
    choice_3,
    choice_4
  ) {
    try {
      const sql = `UPDATE test_answer SET answer = ? choice_1 = ? choice_2 = ? choice_3 = ? choice_4 = ?
                    WHERE answer_id = ?;`;
      const answerValues = [
        answer,
        choice_1,
        choice_2,
        choice_3,
        choice_4,
        answer_id,
      ];

      const [data, _] = await db.execute(sql, answerValues);
      return data;
    } catch (error) {
      console.log(error + "--- update answer ---");
    }
  }

  static async deleteAnswer(answer_id) {
    try {
      const sql = `DELETE FROM test_answer
                    WHERE answer_id = ?;`;
      const answerValues = [answer_id];

      const [data, _] = await db.execute(sql, answerValues);
      return data;
    } catch (error) {
      console.log(error + "--- delete answer ---");
    }
  }

  static async getAllAnswers(test_id) {
    try {
      const sql = `SELECT ta.answer_id, ta.question_id, ta.answer, ta.choice_1, ta.choice_2, ta.choice_3, ta.choice_4
                    FROM test_answer AS ta
                    INNER JOIN test_question AS tq
                    ON ta.question_id = tq.question_id
                    WHERE tq.test_id = ?;`;
      const answerValues = [test_id];

      const [data, _] = await db.execute(sql, answerValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all answers ---");
    }
  }

  static async getAnswer(answer_id) {
    try {
      const sql = `SELECT * FROM test_answer
                    WHERE answer_id = '${answer_id}';`;
      const answerValues = [answer_id];
      const [data, _] = await db.execute(sql, answerValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get answer ---");
    }
  }
}

module.exports = TestAnswer;
