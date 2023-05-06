const db = require("../../db/connection");

class Users {
  constructor(name, surname, username, grade_level, lexile_level, email, password) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.grade_level = grade_level;
    this.lexile_level = lexile_level;
    this.email = email;
    this.password = password;
  }

  async createUser() {
    try {
      const sql = `INSERT INTO users SET ?;`;
      const userValues = {
        name: this.name,
        surname: this.surname,
        username: this.username,
        grade_level: this.grade_level,
        lexile_level: this.lexile_level,
        email: this.email,
        password: this.password,
      };
      const [data, _] = await db.query(sql, userValues);
      return data;
    } catch (error) {
      console.log(error + "--- create user ---");
    }
  }

  static async verifyUser(user_id) {
    try {
      const sql = `UPDATE users SET ?
                    WHERE user_id = '${user_id}'`;
      const verifyValues = { is_verified: true };
      const [data, _] = await db.query(sql, verifyValues);
      return data;
    } catch (error) {
      console.log(error + "--- verify user ---");
    }
  }
}

module.exports = Users;
