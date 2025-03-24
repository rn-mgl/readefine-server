const db = require("../../db/connection");

class Head {
  constructor(name, surname, username, email, password, image) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.image = image;
  }

  async createHead() {
    try {
      const sql = `INSERT INTO head (name, surname, username, email, password, image) VALUES (?, ?, ?, ?, ?, ?);`;
      const headValues = [
        this.name,
        this.surname,
        this.username,
        this.email,
        this.password,
        this.image,
      ];

      const [data, _] = await db.execute(sql, headValues);
      return data;
    } catch (error) {
      console.log(error + "--- create head ---");
    }
  }

  static async verifyHead(head_id) {
    try {
      const sql = `UPDATE head SET is_verified = ?
                  WHERE head_id = ?;`;
      const verifyValues = [true, head_id];

      const [data, _] = await db.execute(sql, verifyValues);
      return data;
    } catch (error) {
      console.log(error + "--- verify head ---");
    }
  }

  static async getAllHeads() {
    try {
      const sql = "SELECT * FROM head;";
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all heads ---");
    }
  }

  static async getHead(head_id) {
    try {
      const sql = `SELECT * FROM head
                  WHERE head_id = ?;`;
      const headValues = [head_id];

      const [data, _] = await db.execute(sql, headValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get head ---");
    }
  }

  static async findWithEmail(email) {
    try {
      const sql = `SELECT * FROM head
                    WHERE email = ?;`;
      const headValues = [email];

      const [data, _] = await db.execute(sql, headValues);

      return data[0];
    } catch (error) {
      console.log(error + "--- find head with email ---");
    }
  }

  static async findWithUsername(username) {
    try {
      const sql = `SELECT * FROM head
                    WHERE username = ?;`;
      const headValues = [username];

      const [data, _] = await db.execute(sql, headValues);

      return data[0];
    } catch (error) {
      console.log(error + "--- find head with username ---");
    }
  }

  static async changePassword(head_id, password) {
    try {
      const sql = `UPDATE head SET password = ?
                  WHERE head_id = ?;`;
      const userValues = [password, head_id];
      const [data, _] = await db.query(sql, userValues);
      return data;
    } catch (error) {
      console.log(error + "--- change password ---");
    }
  }

  static async updateHead(head_id, image, name, surname, username) {
    try {
      const sql = `UPDATE head SET name = ? surname = ? username = ? image = ? WHERE head_id = ?;`;
      const userValues = [name, surname, username, image, head_id];
      const [data, _] = await db.query(sql, userValues);

      return data;
    } catch (error) {
      console.log(error + "--- update head ---");
    }
  }
}

module.exports = Head;
