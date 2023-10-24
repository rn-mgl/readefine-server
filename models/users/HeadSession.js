const db = require("../../db/connection");

class HeadSession {
  constructor(head_id, type) {
    this.head_id = head_id;
    this.type = type;
  }

  async createSession() {
    try {
      const sql = "INSERT INTO head_session SET ?;";
      const sessionsValues = { head_id: this.head_id, type: this.type };

      const [data, _] = await db.query(sql, sessionsValues);
      return data;
    } catch (error) {
      console.log(error + "--- head session ---");
    }
  }

  static async getAdminSessions(head_id) {
    try {
      const sql = `SELECT * FROM head_session WHERE head_id = '${head_id}';`;

      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get head sessions ---");
    }
  }
}

module.exports = HeadSession;
