const db = require("../../db/connection");

class DailyDangle {
  constructor(word_id) {
    this.word_id = word_id;
  }

  async createDangle() {
    try {
      const sql = "INSERT INTO daily_dangle SET ?;";
      const dangleValues = { word_id: this.word_id };

      const [data, _] = await db.query(sql, dangleValues);
      return data;
    } catch (error) {
      console.log(error + "--- create dangle ---");
    }
  }

  static async deleteDangle(dangle_id) {
    try {
      const sql = `DELETE FROM daily_dangle
                    WHERE dangle_id = '${dangle_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- delete dangle ---");
    }
  }

  static async updateDangle(word_id, dangle_id) {
    try {
      const sql = `UPDATE daily_dangle SET ?
                    WHERE dangle_id = '${dangle_id}';`;
      const dangleValues = { word_id };
      const [data, _] = await db.query(sql, dangleValues);
      return data;
    } catch (error) {
      console.log(error + "--- update dangle ---");
    }
  }

  static async getDailyDangle(dangle_id) {
    try {
      const sql = `SELECT * FROM daily_dangle AS dd
                  WHERE dangle_id = '${dangle_id}'
                  INNER JOIN words AS w
                  ON dd.word_id = w.word_id;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get daily dangle ---");
    }
  }

  static async getAllDailyDangles() {
    try {
      const sql = `SELECT * FROM daily_dangle AS dd
                  INNER JOIN words AS w
                  ON dd.word_id = w.word_id;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all daily dangles ---");
    }
  }
}

module.exports = DailyDangle;
