const db = require("../../db/connection");

class UserAchievement {
  constructor(achievement_id, user_id) {
    this.achievement_id = achievement_id;
    this.user_id = user_id;
  }

  async recieveAchievement() {
    try {
      const sql = "INSERT INTO user_achievement SET ?;";
      const achievementValues = {
        achievement_id: this.achievement_id,
        user_id: this.user_id,
      };

      const [data, _] = await db.query(sql, achievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- create achievement ---");
    }
  }

  static async getAllUserAchievements(user_id, searchFilter, sortFilter, showFilter) {
    try {
      const sqlAll = `SELECT ua.user_achievement_id, r.reward_id, r.reward_name, r.reward_type, r.reward, r.description, r.added_by, r.date_added,
                CASE
                  WHEN ua.user_achievement_id IS NULL THEN 0 ELSE 1
                END AS is_received
                FROM achievement AS a
                LEFT JOIN user_achievement AS ua ON ua.achievement_id = a.achievement_ID
                INNER JOIN reward AS r ON r.reward_id = a.reward_id`;

      const sqlUser = `SELECT * FROM user_achievement AS ua
                  INNER JOIN achievement AS a on ua.achievement_id = a.achievement_id
                  INNER JOIN reward AS r on r.reward_id = a.reward_id
                  WHERE user_id = '${user_id}'
                  AND r.${searchFilter.toSearch} LIKE '%${searchFilter.searchKey}%'
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;
      const toQuery = showFilter.toShow === "all" ? sqlAll : sqlUser;
      const [data, _] = await db.execute(toQuery);
      return data;
    } catch (error) {
      console.log(error + "--- get all achievements ---");
    }
  }

  static async getAllAchievements() {
    try {
      const sql = `SELECT * user_achievement;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all achievements ---");
    }
  }

  static async getAchievement(user_achievement_id) {
    try {
      const sql = `SELECT * user_achievement
                    WHERE user_achievement_id = '${user_achievement_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get achievement ---");
    }
  }
}

module.exports = UserAchievement;
