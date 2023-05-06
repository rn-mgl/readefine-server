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
}

module.exports = DailyDangle;
