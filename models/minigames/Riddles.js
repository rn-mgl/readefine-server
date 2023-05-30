const db = require("../../db/connection");

class Riddles {
  constructor(riddle, answer, added_by) {
    this.riddle = riddle;
    this.answer = answer;
    this.added_by = added_by;
  }

  async createRiddle() {
    try {
      const sql = "INSERT INTO riddles SET ?;";
      const riddleValues = { riddle: this.riddle, answer: this.answer, added_by: this.added_by };
      const [data, _] = await db.query(sql, riddleValues);
      return data;
    } catch (error) {
      console.log(error + "--- create riddle ---");
    }
  }

  static async updateRiddle(riddle_id, riddle, answer, added_by) {
    try {
      const sql = `UPDATE riddles 
                    WHERE riddle_id = '${riddle_id}'`;
      const riddleValues = { riddle, answer, added_by };
      const [data, _] = await db.query(sql, riddleValues);
      return data;
    } catch (error) {
      console.log(error + "--- update riddle ---");
    }
  }

  static async deleteRiddle(riddle_id) {
    try {
      const sql = `DELETE FROM riddles 
                    WHERE riddle_id = '${riddle_id}'`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- delete riddle ---");
    }
  }

  static async getAllRiddles(searchFilter, sortFilter, dateRangeFilter) {
    const dateFrom = dateRangeFilter.from ? dateRangeFilter.from : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();
    try {
      const sql = `SELECT * FROM riddles
                  WHERE ${searchFilter.toSearch} LIKE '%${searchFilter.searchKey}%'
                  AND 
                      CAST(date_added AS DATE) >= '${dateFrom}' 
                  AND 
                      CAST(date_added AS DATE) <= '${dateTo}'
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all riddles ---");
    }
  }

  static async getRiddle(riddle_id) {
    try {
      const sql = `SELECT * FROM riddles 
                    WHERE riddle_id = '${riddle_id}'`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get riddle ---");
    }
  }
}

module.exports = Riddles;
