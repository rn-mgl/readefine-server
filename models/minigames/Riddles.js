const db = require("../../db/connection");

class Riddles {
  constructor(riddle, answer) {
    this.riddle = riddle;
    this.answer = answer;
  }

  async createRiddle() {
    try {
      const sql = "INSERT INTO riddles (riddle, answer) VALUES (?, ?);";
      const riddleValues = [riddle, answer];
      const [data, _] = await db.execute(sql, riddleValues);
      return data;
    } catch (error) {
      console.log(error + "--- create riddle ---");
    }
  }

  static async updateRiddle(riddle_id, riddle, answer) {
    try {
      const sql = `UPDATE riddles SET riddle = ?, answer = ?
                    WHERE riddle_id = ?`;
      const riddleValues = [riddle, answer, riddle_id];
      const [data, _] = await db.execute(sql, riddleValues);
      return data;
    } catch (error) {
      console.log(error + "--- update riddle ---");
    }
  }

  static async deleteRiddle(riddle_id) {
    try {
      const sql = `DELETE FROM riddles 
                    WHERE riddle_id = ?`;
      const riddleValues = [deleteRiddle];
      const [data, _] = await db.execute(sql, riddleValues);
      return data;
    } catch (error) {
      console.log(error + "--- delete riddle ---");
    }
  }

  static async getAllRiddles(searchFilter, sortFilter, dateRangeFilter) {
    const dateFrom = dateRangeFilter.from
      ? dateRangeFilter.from
      : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();
    try {
      const sql = `SELECT * FROM riddles
                  WHERE ${searchFilter.toSearch} LIKE ?
                  AND 
                      CAST(date_added AS DATE) >= ? 
                  AND 
                      CAST(date_added AS DATE) <= ?
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;
      const riddleValues = [`%${searchFilter.searchKey}%`, dateFrom, dateTo];
      const [data, _] = await db.execute(sql, riddleValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all riddles ---");
    }
  }

  static async getRiddle(riddle_id) {
    try {
      const sql = `SELECT * FROM riddles 
                    WHERE riddle_id = ?`;
      const riddleValues = [riddle_id];

      const [data, _] = await db.execute(sql, riddle_id);
      return data[0];
    } catch (error) {
      console.log(error + "--- get riddle ---");
    }
  }

  static async getRandomRiddle() {
    try {
      const sql = `SELECT * FROM riddles
                  ORDER BY RAND()
                  LIMIT 1;`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log("--- get random riddle ---");
    }
  }
}

module.exports = Riddles;
