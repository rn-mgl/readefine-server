const db = require("../../db/connection");

class AdminSession {
  constructor(admin_id, type) {
    this.admin_id = admin_id;
    this.type = type;
  }

  async createSession() {
    try {
      const sql = "INSERT INTO admin_session SET ?;";
      const sessionsValues = { admin_id: this.admin_id, type: this.type };

      const [data, _] = await db.query(sql, sessionsValues);
      return data;
    } catch (error) {
      console.log(error + "--- admin session ---");
    }
  }

  static async getAdminSessions(admin_id) {
    try {
      const sql = `SELECT * FROM admin_session WHERE admin_id = '${admin_id}';`;

      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get admin sessions ---");
    }
  }
}

module.exports = AdminSession;
