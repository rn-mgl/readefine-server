const db = require("../../db/connection");

class DailyDechipher {
  constructor(word_id) {
    this.word_id = word_id;
  }

  async createDecipher() {
    try {
      const sql = "INSERT INTO daily_decipher SET ?;";
      const decipherValues = { word_id: this.word_id };

      const [data, _] = await db.query(sql, decipherValues);
      return data;
    } catch (error) {
      console.log(error + "--- create decipher ---");
    }
  }

  static async deleteDecipher(decipher_id) {
    try {
      const sql = `DELETE FROM daily_decipher
                    WHERE decipher_id = '${decipher_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- delete decipher ---");
    }
  }
}

module.exports = DailyDechipher;
