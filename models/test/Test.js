const db = require("../../db/connection");

class Test {
  constructor(story_id) {
    this.story_id = story_id;
  }

  async createTest() {
    try {
      const sql = `INSERT INTO test (story_id) VALUES (?);`;
      const testValues = [this.story_id];
      const [data, _] = await db.execute(sql, testValues);
      return data;
    } catch (error) {
      console.log(error + "--- create test ---");
    }
  }

  static async getAllTests(
    searchFilter,
    lexileRangeFilter,
    sortFilter,
    dateRangeFilter
  ) {
    const lexileFrom = lexileRangeFilter.from ? lexileRangeFilter.from : 0;
    const lexileTo = lexileRangeFilter.to ? lexileRangeFilter.to : 1400;
    const dateFrom = dateRangeFilter.from
      ? dateRangeFilter.from
      : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();
    try {
      const sql = `SELECT * FROM test AS t
                   INNER JOIN story AS s ON
                   t.story_id = s.story_id
                   WHERE 
                      s.${searchFilter.toSearch} LIKE ?
                  AND 
                      s.lexile >= ? 
                  AND 
                      s.lexile <= ?
                  AND 
                      CAST(s.date_added AS DATE) >= ? 
                  AND 
                      CAST(s.date_added AS DATE) <= ?
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;
      const testValues = [
        `%${searchFilter.searchKey}%`,
        lexileFrom,
        lexileTo,
        dateFrom,
        dateTo,
      ];
      const [data, _] = await db.execute(sql, testValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all tests ---");
    }
  }

  static async getAllUserTests(userId, searchFilter, sortFilter, userLexile) {
    const lexileFrom = parseInt(userLexile) - 100;
    const lexileTo = parseInt(userLexile) + 50;

    try {
      const sql = `SELECT t.test_id, t.story_id, t.date_added,
                   s.story_id, s.book_cover, s.audio, s.title, s.author, s.lexile, s.genre, s.date_added, 
                   tt.score,

                    CASE 
                      WHEN tt.taken_by = ? THEN 1 ELSE 0
                    END AS is_taken

                   FROM test AS t

                   INNER JOIN story AS s ON
                    t.story_id = s.story_id

                   LEFT JOIN taken_test AS tt ON
                    t.test_id = tt.test_id
                    AND tt.taken_by = ?
                   
                   WHERE 
                      s.${searchFilter.toSearch} LIKE ?
                   AND 
                      s.lexile >= ? 
                   AND 
                      s.lexile <= ?
                   ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;
      const testValues = [
        userId,
        userId,
        `%${searchFilter.searchKey}%`,
        lexileFrom,
        lexileTo,
      ];
      const [data, _] = await db.execute(sql, testValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all tests ---");
    }
  }

  static async getTest(test_id) {
    try {
      const sql = `SELECT * FROM test AS t
                    INNER JOIN story AS s
                    ON t.story_id = s.story_id
                    WHERE t.test_id = ?;`;
      const testValues = [test_id];
      const [data, _] = await db.execute(sql, testValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get test ---");
    }
  }

  static async deleteTest(test_id) {
    try {
      const sql = `DELETE FROM test
                    WHERE test_id =?;`;
      const testValues = [test_id];
      const [data, _] = await db.execute(sql, testValues);
      return data;
    } catch (error) {
      console.log(error + "--- delete test ---");
    }
  }
}

module.exports = Test;
