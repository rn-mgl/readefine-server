const db = require("../../db/connection");

class UserSession {
  constructor(user_id) {
    this.user_id = user_id;
  }

  async createSession() {
    try {
      const sql = "INSERT INTO user_session SET ?;";
      const sessionsValues = { user_id: this.user_id };

      const [data, _] = await db.query(sql, sessionsValues);
      return data;
    } catch (error) {
      console.log(error + "--- user session ---");
    }
  }
}

module.exports = UserSession;
