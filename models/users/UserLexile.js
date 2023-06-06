const db = require("../../db/connection");

class UserLexile {
  constructor(user_id, lexile) {
    this.user_id = user_id;
    this.lexile = lexile;
  }

  async createLexile() {
    try {
      const sql = `INSERT INTO user_lexile SET ?;`;
      const lexileValues = { user_id: this.user_id, lexile: this.lexile };
      const [data, _] = await db.query(sql, lexileValues);
      return data;
    } catch (error) {
      console.log(error + "--- create lexile ---");
    }
  }

  static async getLexileProgress(user_id) {
    try {
      const sql = `SELECT * FROM user_lexile AS ul
                        INNER JOIN users AS u ON ul.user_id = u.user_id
                        WHERE 
                          u.user_id = '${user_id}'
                        AND 
                          ul.date_added IN (
                          SELECT DISTINCT date_added
                          FROM user_lexile AS ul
                          WHERE u.user_id = ul.user_id
                        );`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get user ---");
    }
  }
}

module.exports = UserLexile;
