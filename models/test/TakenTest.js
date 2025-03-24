const db = require("../../db/connection");

class TakenTest {
  constructor(taken_by, test_id, score) {
    this.taken_by = taken_by;
    this.test_id = test_id;
    this.score = score;
  }

  async takeTest() {
    try {
      const sql =
        "INSERT INTO taken_test (taken_by, test_id, score) VALUES (?, ?, ?);";
      const takeValues = [this.taken_by, this.test_id, this.score];
      const [data, _] = await db.execute(sql, takeValues);
      return data;
    } catch (error) {
      console.log(error + "--- take test ---");
    }
  }

  static async getTakenTest(taken_by, testId) {
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

                    WHERE tt.taken_by = ?
                    AND aq.answered_by = ?
                    AND tt.test_id = ?`;
      const takeValues = [taken_by, taken_by, testId];
      const [data, _] = await db.execute(sql, takeValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all taken tests ---");
    }
  }

  static async getTakenTestsOfUser(user_id, month) {
    try {
      const sql = `SELECT * FROM taken_test AS tt
                  INNER JOIN test AS t ON tt.test_id = t.test_id
                  INNER JOIN story AS s ON t.story_id = s.story_id
                  WHERE tt.taken_by = ?
                    AND
                  MONTH(tt.date_taken) = ?
                    AND
                  YEAR(tt.date_taken) = YEAR(CURDATE())`;
      const takeValues = [user_id, month];

      const [data, _] = await db.execute(sql, takeValues);
      return data;
    } catch (error) {
      console.log(error + "--- get taken tests of user ---");
    }
  }
}

module.exports = TakenTest;
