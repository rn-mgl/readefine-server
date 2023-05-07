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

  static async updateDecipher(word_id, decipher_id) {
    try {
      const sql = `UPDATE daily_decipher SET ?
                    WHERE decipher_id = '${decipher_id}';`;
      const decipherValues = { word_id };
      const [data, _] = await db.query(sql, decipherValues);
      return data;
    } catch (error) {
      console.log(error + "--- update decipher ---");
    }
  }

  static async getDailyDecipher(decipher_id) {
    try {
      const sql = `SELECT * FROM daily_decipher AS dd
                  WHERE decipher_id = '${decipher_id}'
                  INNER JOIN words AS w
                  ON dd.word_id = w.word_id;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get daily decipher ---");
    }
  }

  static async getAllDailyDecipher() {
    try {
      const sql = `SELECT * FROM daily_decipher AS dd
                  INNER JOIN words AS w
                  ON dd.word_id = w.word_id;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all daily deciphers ---");
    }
  }
}

module.exports = DailyDechipher;
