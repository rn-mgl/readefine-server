const db = require("../../db/connection");

class UserAchievement {
  constructor(achievement_id, user_id) {
    this.achievement_id = achievement_id;
    this.user_id = user_id;
  }

  async createAchievement() {
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

  static async getAllAchievements(user_id) {
    try {
      const sql = `SELECT * user_achievement
                    WHERE user_id = '${user_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all achievements ---");
    }
  }

  static async getAchievement(achievement_id) {
    try {
      const sql = `SELECT * user_achievement
                    WHERE achievement_id = '${achievement_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get achievement ---");
    }
  }
}

module.exports = UserAchievement;
