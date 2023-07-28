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

  static async getAllUserAchievements(
    searchFilter,
    goalRangeFilter,
    sortFilter,
    typeFilter,
    user_id
  ) {
    const goalFrom = goalRangeFilter.from ? goalRangeFilter.from : 0;
    const goalTo = goalRangeFilter.to ? goalRangeFilter.to : 1400;
    try {
      const sql = `SELECT * FROM user_achievement AS ua

                  INNER JOIN achievement AS a 
                  ON ua.achievement_id = a.achievement_id
                  
                  INNER JOIN reward AS r 
                  ON a.reward_id = r.reward_id
                  
                  WHERE ${searchFilter.toSearch} LIKE '%${searchFilter.searchKey}%'
                  AND
                      a.achievement_type LIKE '%${typeFilter}%'
                  AND 
                      goal >= '${goalFrom}' 
                  AND 
                      goal <= '${goalTo}'
                  AND 
                      ua.user_id = '${user_id}' 
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;

      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all user achievements ---");
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
      return data[0];
    } catch (error) {
      console.log(error + "--- get achievement ---");
    }
  }

  static async incrementUserAchievementPoints(user_id, toAdd, type, specifics) {
    try {
      const sql = `UPDATE user_achievement AS ua
                  INNER JOIN achievement AS a ON ua.achievement_id = a.achievement_id
                  SET ua.points = ua.points + ${toAdd}
                  WHERE a.achievement_type = '${type}'
                  AND a.specifics = '${specifics}'
                  AND ua.user_id = '${user_id}';`;

      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- increment points ---");
    }
  }

  static async checkUserAchievementPoints(user_id, type, specifics) {
    try {
      const sql = `SELECT * FROM user_achievement AS ua
                  INNER JOIN achievement AS a ON ua.achievement_id = a.achievement_id
                  INNER JOIN reward AS r ON a.reward_id = r.reward_id
                  WHERE ua.points >= a.goal
                  AND ua.is_seen = '0'
                  AND a.achievement_type = '${type}'
                  AND a.specifics = '${specifics}'
                  AND ua.user_id = '${user_id}';`;
      const [data, _] = await db.query(sql);
      return data;
    } catch (error) {
      console.log(error + "--- check session achievement ---");
    }
  }

  static async assignUserAchievements(user_id) {
    try {
      const sql = `INSERT INTO user_achievement (achievement_id, user_id)
                    SELECT achievement_id, '${user_id}' FROM achievement;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- assign user achievements ---");
    }
  }

  static async assignAchievement(achievement_id, user_id) {
    try {
      const sql = `INSERT INTO user_achievement SET ?;`;
      const achievementValues = { achievement_id, user_id };

      const [data, _] = await db.query(sql, achievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- assign an achievement ---");
    }
  }

  static async seeUserAchievements(user_achievement_id) {
    try {
      const sql = `UPDATE user_achievement SET ?
                  WHERE user_achievement_id = '${user_achievement_id}';`;
      const userAchievementValues = { is_seen: 1 };
      const [data, _] = await db.query(sql, userAchievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- see user achievements ---");
    }
  }
}

module.exports = UserAchievement;
