const db = require("../../db/connection");

class User {
  constructor(name, surname, username, grade_level, email, password, image) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.grade_level = grade_level;
    this.email = email;
    this.password = password;
    this.image = image;
  }

  async createUser() {
    try {
      const sql = `INSERT INTO users (name, surname, username, grade_level, email, password, image) VALUES (?, ?, ?, ?, ?, ?, ?);`;
      const userValues = [
        this.name,
        this.surname,
        this.username,
        this.grade_level,
        this.email,
        this.password,
        this.image,
      ];
      const [data, _] = await db.execute(sql, userValues);
      return data;
    } catch (error) {
      console.log(error + "--- create user ---");
    }
  }

  static async verifyUser(user_id) {
    try {
      const sql = `UPDATE users SET is_verified = ?
                    WHERE user_id = ? ;`;
      const verifyValues = [true, user_id];
      const [data, _] = await db.execute(sql, verifyValues);
      return data;
    } catch (error) {
      console.log(error + "--- verify user ---");
    }
  }

  static async findWithEmail(email) {
    try {
      const sql = `SELECT * FROM users
                    WHERE email = ?;`;
      const userValues = [email];

      const [data, _] = await db.execute(sql, userValues);

      return data[0];
    } catch (error) {
      console.log(error + "--- find user with email ---");
    }
  }

  static async findWithUsername(username) {
    try {
      const sql = `SELECT * FROM users
                    WHERE username = ?;`;
      const userValues = [username];

      const [data, _] = await db.execute(sql, userValues);

      return data[0];
    } catch (error) {
      console.log(error + "--- find user with username ---");
    }
  }

  static async getAllUsers(
    searchFilter,
    sortFilter,
    dateRangeFilter,
    lexileRangeFilter
  ) {
    const lexileFrom = lexileRangeFilter.from ? lexileRangeFilter.from : 0;
    const lexileTo = lexileRangeFilter.to ? lexileRangeFilter.to : 1400;
    const dateFrom = dateRangeFilter.from
      ? dateRangeFilter.from
      : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();
    //dont touch plss
    try {
      const sql = ` SELECT * FROM users AS u
                    INNER JOIN user_lexile AS ul ON u.user_id = ul.user_id
                    WHERE 
                        ${searchFilter.toSearch} LIKE ?
                    AND 
                        CAST(date_joined AS DATE) >= ? 
                    AND 
                        CAST(date_joined AS DATE) <= ?
                    AND 
                        lexile >= ? 
                    AND
                        lexile <= ?
                    AND
                          ul.lexile_id = (
                          SELECT MAX(lexile_id)
                          FROM user_lexile AS ul
                          WHERE ul.user_id = u.user_id
                        )
                    ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;

      const userValues = [
        `%${searchFilter.searchKey}%`,
        dateFrom,
        dateTo,
        lexileFrom,
        lexileTo,
      ];

      const [data, _] = await db.execute(sql, userValues);

      return data;
    } catch (error) {
      console.log(error + "--- get all users ---");
    }
  }

  static async getUser(user_id) {
    try {
      const sql = `SELECT * FROM users AS u
                  INNER JOIN user_lexile AS ul ON u.user_id = ul.user_id
                  WHERE 
                    u.user_id = ?
                  AND 
                    ul.lexile_id = (
                      SELECT MAX(lexile_id)
                      FROM user_lexile AS ul
                      WHERE ul.user_id = ?
                    );`;
      const userValues = [user_id, user_id];
      const [data, _] = await db.execute(sql, userValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get user ---");
    }
  }

  static async getUserCount() {
    try {
      const sql = `SELECT COUNT(user_id) AS user_count FROM users;`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get user count ---");
    }
  }

  static async changePassword(user_id, password) {
    try {
      const sql = `UPDATE users SET password = ?
                  WHERE user_id = ?;`;
      const userValues = [password, user_id];
      const [data, _] = await db.execute(sql, userValues);
      return data;
    } catch (error) {
      console.log(error + "--- change password ---");
    }
  }

  static async updateUser(user_id, image, name, surname, username) {
    try {
      const sql = `UPDATE users SET name = ? surname = ? username = ? image = ? WHERE user_id = ?;`;
      const userValues = [name, surname, username, image, user_id];
      const [data, _] = await db.execute(sql, userValues);

      return data;
    } catch (error) {
      console.log(error + "--- update user ---");
    }
  }

  static async updateGradeLevel(user_id, grade_level) {
    try {
      const sql = `UPDATE users SET grade_level = ? WHERE user_id = ?;`;
      const userValues = [grade_level, user_id];

      const [data, _] = await db.query(sql, userValues);
      return data;
    } catch (error) {
      console.log(error + "--- update grade level ---");
    }
  }

  static async getAllRawUsers() {
    try {
      const sql = `SELECT * FROM users;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get raw users ---");
    }
  }
}

module.exports = User;
