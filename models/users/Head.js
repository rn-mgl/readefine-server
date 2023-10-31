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
      const sql = `INSERT INTO head SET ?;`;
      const headValues = {
        name: this.name,
        surname: this.surname,
        username: this.username,
        email: this.email,
        password: this.password,
        image: this.image,
      };

      const [data, _] = await db.query(sql, headValues);
      return data;
    } catch (error) {
      console.log(error + "--- create head ---");
    }
  }

  static async verifyHead(head_id) {
    try {
      const sql = `UPDATE head SET ?
                  WHERE head_id = '${head_id}';`;
      const verifyValues = { is_verified: true };

      const [data, _] = await db.query(sql, verifyValues);
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
                  WHERE head_id = '${head_id}';`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get head ---");
    }
  }

  static async findWithEmail(email) {
    try {
      const sql = `SELECT * FROM head
                    WHERE email = '${email}'`;
      const [data, _] = await db.execute(sql);

      return data[0];
    } catch (error) {
      console.log(error + "--- find head with email ---");
    }
  }

  static async findWithUsername(username) {
    try {
      const sql = `SELECT * FROM head
                    WHERE username = '${username}'`;
      const [data, _] = await db.execute(sql);

      return data[0];
    } catch (error) {
      console.log(error + "--- find head with username ---");
    }
  }

  static async changePassword(head_id, password) {
    try {
      const sql = `UPDATE head SET ?
                  WHERE head_id = '${head_id}';`;
      const userValues = { password };
      const [data, _] = await db.query(sql, userValues);
      return data;
    } catch (error) {
      console.log(error + "--- change password ---");
    }
  }

  static async updateHead(head_id, image, name, surname, username) {
    try {
      const sql = `UPDATE head SET ? WHERE head_id = '${head_id}';`;
      const userValues = { name, surname, username, image };
      const [data, _] = await db.query(sql, userValues);

      return data;
    } catch (error) {
      console.log(error + "--- update head ---");
    }
  }
}

module.exports = Head;
