const db = require("../../db/connection");

class AdminActivities {
  constructor(admin_id, resource_type, resource_name, activity_type) {
    this.admin_id = admin_id;
    this.resource_type = resource_type;
    this.resource_name = resource_name;
    this.activity_type = activity_type;
  }

  async createAdminActivity() {
    try {
      const sql = `INSERT INTO admin_activity (admin_id, resource_type, resource_name, activity_type) VALUES (?, ?, ?, ?);`;
      const insertValues = [
        this.admin_id,
        this.resource_type,
        this.resource_name,
        this.activity_type,
      ];

      const [data, _] = await db.execute(sql, insertValues);
      return data;
    } catch (error) {
      console.log(error + "--- create admin activity ---");
    }
  }

  static async getAllAdminActivity(
    searchFilter,
    sortFilter,
    resourceTypeFilter,
    dateRangeFilter,
    activityTypeFilter
  ) {
    try {
      const sql = `SELECT * FROM admin_activity AS aa
                  INNER JOIN admin AS a
                  ON aa.admin_id = a.admin_id
                  WHERE 
                    ${searchFilter.toSearch} LIKE ?
                  AND 
                    resource_type LIKE ?
                  AND 
                    activity_type LIKE ?
                  AND 
                    CAST(date_logged as DATE) >= ?
                  AND 
                    CAST(date_logged as DATE) <= ?
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;

      const adminActivityValues = [
        `%${searchFilter.searchKey}%`,
        `%${resourceTypeFilter}%`,
        `%${activityTypeFilter}%`,
        `${dateRangeFilter.from}`,
        `${dateRangeFilter.to}`,
      ];

      const [data, _] = await db.execute(sql, adminActivityValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all admin activities ---");
    }
  }

  static async getSingleAdminActivity(admin_id, activityTypeFilter) {
    try {
      const sql = `SELECT * FROM admin_activity AS aa
                  INNER JOIN admin AS a
                  ON aa.admin_id = a.admin_id
                      AND aa.admin_id = ?
                  WHERE activity_type = ?
                  ORDER BY aa.date_logged DESC;`;

      const adminActivityValues = [admin_id, activityTypeFilter];

      const [data, _] = await db.execute(sql, adminActivityValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all admin activities ---");
    }
  }
}

module.exports = AdminActivities;
