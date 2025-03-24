const db = require("../../db/connection");

class UserLexile {
  constructor(user_id, lexile) {
    this.user_id = user_id;
    this.lexile = lexile;
  }

  async createLexile() {
    try {
      const sql = `INSERT INTO user_lexile (user_id, lexile) VALUES (?, ?);`;
      const lexileValues = [this.user_id, this.lexile];
      const [data, _] = await db.execute(sql, lexileValues);
      return data;
    } catch (error) {
      console.log(error + "--- create lexile ---");
    }
  }

  static async getLexileProgress(user_id, month) {
    try {
      const sql = `SELECT * FROM user_lexile AS ul
                        INNER JOIN users AS u ON ul.user_id = u.user_id
                        WHERE 
                          u.user_id = ?
                        AND 
                          DATE(ul.date_added) IN (
                          SELECT DISTINCT DATE(date_added)
                          FROM user_lexile AS sub_ul
                          INNER JOIN users AS sub_u ON sub_ul.user_id = sub_u.user_id
                          WHERE sub_u.user_id = sub_ul.user_id
                          ORDER BY sub_ul.date_added DESC
                        )
                        AND
                          MONTH(ul.date_added) = ?
                        AND
                          YEAR(ul.date_added) = YEAR(CURDATE())
                        ORDER BY date_added ASC;`;
      const lexileValues = [user_id, month];

      const [data, _] = await db.execute(sql, lexileValues);
      return data;
    } catch (error) {
      console.log(error + "--- get user ---");
    }
  }

  static async getLatestLexile(user_id) {
    try {
      const sql = `SELECT * FROM user_lexile
                   WHERE lexile_id = (
                    SELECT MAX(lexile_id) FROM user_lexile
                    WHERE user_id = '${user_id}'
                   );`;
      const lexileValues = [user_id];

      const [data, _] = await db.execute(sql, lexileValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get latest lexile ---");
    }
  }
}

module.exports = UserLexile;
