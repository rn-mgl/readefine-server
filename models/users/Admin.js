const db = require("../../db/connection");

class Admin {
  constructor(name, surname, username, email, password) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async createAdmin() {
    try {
      const sql = `INSERT INTO admin SET ?;`;
      const userValues = {
        name: this.name,
        surname: this.surname,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      const [data, _] = await db.query(sql, userValues);
      return data;
    } catch (error) {
      console.log(error + "--- create admin ---");
    }
  }

  static async verifyAdmin(admin_id) {
    try {
      const sql = `UPDATE admin SET ?
                    WHERE admin_id = '${admin_id}'`;
      const verifyValues = { is_verified: true };
      const [data, _] = await db.query(sql, verifyValues);
      return data;
    } catch (error) {
      console.log(error + "--- verify admin ---");
    }
  }

  static async findWithEmail(email) {
    try {
      const sql = `SELECT * FROM admin
                    WHERE email = '${email}'`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- find admin with email ---");
    }
  }

  static async findWithUsername(username) {
    try {
      const sql = `SELECT * FROM admin
                    WHERE username = '${username}'`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- find admin with username ---");
    }
  }

  static async getAllAdmins() {
    try {
      const sql = "SELECT * FROM admin;";
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all admins ---");
    }
  }

  static async getAdmin(admin_id) {
    try {
      const sql = `SELECT * FROM admin
                  WHERE admin_id = '${admin_id}';`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get admin ---");
    }
  }

  static async updateAdmin(admin_id, image, name, surname, username) {
    try {
      const sql = `UPDATE admin SET ? 
                  WHERE admin_id = '${admin_id}'`;

      const adminValues = { image, name, surname, username };

      const [data, _] = await db.query(sql, adminValues);
      return data;
    } catch (error) {
      console.log(error + " --- update admin ---");
    }
  }

  static async changePassword(admin_id, password) {
    try {
      const sql = `UPDATE admin SET ? 
                  WHERE admin_id = '${admin_id}'`;

      const adminValues = { password };

      const [data, _] = await db.query(sql, adminValues);
      return data;
    } catch (error) {
      console.log(error + " --- update admin password ---");
    }
  }
}

module.exports = Admin;
