const db = require("../../db/connection");

class Test {
  constructor(story_id) {
    this.story_id = story_id;
  }

  async createTest() {
    try {
      const sql = `INSERT INTO test SET ?;`;
      const testValues = { story_id: this.story_id };
      const [data, _] = await db.query(sql, testValues);
      return data;
    } catch (error) {
      console.log(error + "--- create test ---");
    }
  }

  static async getAllTests() {
    try {
      const sql = "SELECT * FROM test;";
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all tests ---");
    }
  }

  static async getTest(test_id) {
    try {
      const sql = `SELECT * FROM test
                    WHERE test_id = '${test_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get test ---");
    }
  }

  static async deleteTest(test_id) {
    try {
      const sql = `DELETE FROM test
                    WHERE test_id = '${test_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- delete test ---");
    }
  }
}

module.exports = Test;
