const db = require("../../db/connection");

class UserAchievement {
  constructor(achievement_id, user_id) {
    this.achievement_id = achievement_id;
    this.user_id = user_id;
  }

  async receiveAchievement() {
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

  static async getAllUserAchievements() {
    try {
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

  static async checkSessionAchievement(user_id) {
    try {
      const sql = `SELECT * FROM achievement AS a
                    INNER JOIN reward AS r ON a.reward_id = r.reward_id
                    WHERE
                      achievement_type = 'user_session'
                    AND
                      goal <= (
                        SELECT COUNT(session_id) AS sessions 
                        FROM user_session 
                        WHERE user_id = '${user_id}'
                      )
                    AND
                      achievement_id NOT IN (
                        SELECT ua.achievement_id FROM user_achievement AS ua 
                        WHERE user_id = '${user_id}' 
                      );`;
      const [data, _] = await db.query(sql);
      return data;
    } catch (error) {
      console.log(error + "--- check session achievement ---");
    }
  }
}

module.exports = UserAchievement;
