const db = require("../../db/connection");

class Admin {
  constructor(name, surname, username, email, password, image) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.image = image;
  }

  async createAdmin() {
    try {
      const sql = `INSERT INTO admin (name, surname, username, email, password, image) VALUES (?, ?, ?, ?, ?, ?);`;
      const userValues = [
        this.name,
        this.surname,
        this.username,
        this.email,
        this.password,
        this.image,
      ];
      const [data, _] = await db.execute(sql, userValues);
      return data;
    } catch (error) {
      console.log(error + "--- create admin ---");
    }
  }

  static async verifyAdmin(admin_id) {
    try {
      const sql = `UPDATE admin SET is_verified = ?
                    WHERE admin_id = ?`;
      const adminValues = [true, admin_id];
      const [data, _] = await db.execute(sql, adminValues);
      return data;
    } catch (error) {
      console.log(error + "--- verify admin ---");
    }
  }

  static async findWithEmail(email) {
    try {
      const sql = `SELECT * FROM admin
                    WHERE email = ?`;
      const adminValues = [email];
      const [data, _] = await db.execute(sql, adminValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- find admin with email ---");
    }
  }

  static async findWithUsername(username) {
    try {
      const sql = `SELECT * FROM admin
                    WHERE username = ?`;
      const adminValues = [username];
      const [data, _] = await db.execute(sql, adminValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- find admin with username ---");
    }
  }

  static async getAllAdmins(searchFilter, sortFilter, dateRangeFilter) {
    try {
      const sql = `SELECT * FROM admin
                  WHERE ${searchFilter.toSearch} LIKE ?
                  AND CAST(date_joined AS DATE) >= ?
                  AND CAST(date_joined AS DATE) <= ?
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;
      const adminValues = [
        `%${searchFilter.searchKey}%`,
        dateRangeFilter.from,
        dateRangeFilter.to,
      ];

      const [data, _] = await db.execute(sql, adminValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all admins ---");
    }
  }

  static async getAdmin(admin_id) {
    try {
      const sql = `SELECT * FROM admin
                  WHERE admin_id = ?;`;
      const adminValues = [admin_id];
      const [data, _] = await db.execute(sql, adminValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get admin ---");
    }
  }

  static async updateAdmin(admin_id, image, name, surname, username) {
    try {
      const sql = `UPDATE admin SET image = ? name = ? surname = ? username = ?
                  WHERE admin_id = ?`;

      const adminValues = [image, name, surname, username, admin_id];

      const [data, _] = await db.execute(sql, adminValues);
      return data;
    } catch (error) {
      console.log(error + " --- update admin ---");
    }
  }

  static async changePassword(admin_id, password) {
    try {
      const sql = `UPDATE admin SET password = ? 
                  WHERE admin_id = ?;`;

      const adminValues = [password, admin_id];

      const [data, _] = await db.execute(sql, adminValues);
      return data;
    } catch (error) {
      console.log(error + " --- update admin password ---");
    }
  }

  static async deleteAdmin(admin_id) {
    try {
      const sql = `DELETE FROM admin
                  WHERE admin_id = ?;`;
      const adminValues = [admin_id];

      const [data, _] = await db.execute(sql, adminValues);
      return data;
    } catch (error) {
      console.log(error + " --- delete admin ---");
    }
  }
}

module.exports = Admin;
