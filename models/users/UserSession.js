const db = require("../../db/connection");

class UserSession {
  constructor(user_id, type) {
    this.user_id = user_id;
    this.type = type;
  }

  async createSession() {
    try {
      const sql = "INSERT INTO user_session (user_id, type) VALUES (?, ?);";
      const sessionsValues = [this.user_id, this.type];

      const [data, _] = await db.execute(sql, sessionsValues);
      return data;
    } catch (error) {
      console.log(error + "--- user session ---");
    }
  }

  static async getUserSessions(user_id) {
    try {
      const sql = `SELECT * FROM user_session WHERE user_id = ?;`;
      const sessionsValues = [user_id];

      const [data, _] = await db.execute(sql, sessionsValues);
      return data;
    } catch (error) {
      console.log(error + "--- get user sessions ---");
    }
  }
}

module.exports = UserSession;
