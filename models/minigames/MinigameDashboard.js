const db = require("../../db/connection");

class MinigameDashboard {
  constructor() {}

  static async getAllPlayCounts(answered_by) {
    try {
      const sql = `SELECT (SELECT COUNT(answer_id) FROM answered_dangle WHERE answered_by = '${answered_by}') AS dangleCount,
                          (SELECT COUNT(answer_id) FROM answered_decipher WHERE answered_by = '${answered_by}') AS decipherCount,
                          (SELECT COUNT(answer_id) FROM answered_riddles WHERE answered_by = '${answered_by}') AS riddleCount`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get all play counts ---");
    }
  }
}

module.exports = MinigameDashboard;
