const db = require("../../db/connection");

class UserSession {
  constructor(user_id, type) {
    this.user_id = user_id;
    this.type = type;
  }

  async createSession() {
    try {
      const sql = "INSERT INTO user_session SET ?;";
      const sessionsValues = { user_id: this.user_id, type: this.type };

      const [data, _] = await db.query(sql, sessionsValues);
      return data;
    } catch (error) {
      console.log(error + "--- user session ---");
    }
  }

  static async getUserSessions(user_id) {
    try {
      const sql = `SELECT * FROM user_session WHERE user_id = '${user_id}';`;

      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get user sessions ---");
    }
  }
}

module.exports = UserSession;
