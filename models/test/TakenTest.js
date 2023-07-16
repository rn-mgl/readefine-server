const db = require("../../db/connection");

class TakenTest {
  constructor(taken_by, test_id, score) {
    this.taken_by = taken_by;
    this.test_id = test_id;
    this.score = score;
  }

  async takeTest() {
    try {
      const sql = "INSERT INTO taken_test SET ?;";
      const takeValues = {
        taken_by: this.taken_by,
        test_id: this.test_id,
        score: this.score,
      };
      const [data, _] = await db.query(sql, takeValues);
      return data;
    } catch (error) {
      console.log(error + "--- take test ---");
    }
  }

  static async getAllTakenTests(taken_by, testId) {
    try {
      const sql = `SELECT tt.taken_id, tt.taken_by, 
                    t.test_id, s.title, s.author, s.lexile, s.genre,
                    tq.question, tq.question_id,
                    ta.answer,
                    aq.answer AS choice

                    FROM taken_test AS tt

                    INNER JOIN test AS t
                    ON tt.test_id = t.test_id

                    INNER JOIN story AS s
                    ON t.story_id = s.story_id

                    INNER JOIN test_question AS tq
                    ON t.test_id = tq.test_id

                    INNER JOIN test_answer AS ta
                    ON tq.question_id = ta.question_id

                    INNER JOIN answered_question AS aq
                    ON tq.question_id = aq.question_id

                    WHERE tt.taken_by = '${taken_by}'
                    AND tt.test_id = '${testId}'`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all taken tests ---");
    }
  }

  static async getTakenTest(taken_id) {
    try {
      const sql = `SELECT s.title, s.lexile, tt.date_taken FROM taken_test AS tt
                    INNER JOIN test AS t
                    ON tt.test_id = t.test_id
                    INNER JOIN story AS s
                    ON t.story_id = s.story_id
                    WHERE tt.taken_id = '${taken_id}'`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get taken test ---");
    }
  }
}

module.exports = TakenTest;
