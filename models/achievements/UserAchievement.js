const db = require("../../db/connection");

class UserAchievement {
  constructor(achievement_id, user_id) {
    this.achievement_id = achievement_id;
    this.user_id = user_id;
  }

  async receiveAchievement() {
    try {
      const sql =
        "INSERT INTO user_achievement (achievement_id, user_id) VALUES (?, ?);";
      const achievementValues = [this.achievement_id, this.user_id];

      const [data, _] = await db.execute(sql, achievementValues);
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
                  
                  WHERE ${searchFilter.toSearch} LIKE ?
                  AND
                      a.achievement_type LIKE ?
                  AND 
                      goal >= ?
                  AND 
                      goal <= ?
                  AND 
                      ua.user_id = ?
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;

      const userAchievementValues = [
        `%${searchFilter.searchKey}%`,
        `%${typeFilter}%`,
        goalFrom,
        goalTo,
        user_id,
      ];

      const [data, _] = await db.execute(sql, userAchievementValues);
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
                    WHERE user_achievement_id = ?;`;

      const userAchievementValues = [user_achievement_id];
      const [data, _] = await db.execute(sql, userAchievementValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get achievement ---");
    }
  }

  static async incrementUserAchievementPoints(user_id, toAdd, type) {
    try {
      const sql = `UPDATE user_achievement AS ua
                  INNER JOIN achievement AS a ON ua.achievement_id = a.achievement_id
                  SET ua.points = ua.points + ?
                  WHERE a.achievement_type = ?
                  AND ua.user_id = ?;`;

      const userAchievementValues = [toAdd, type, user_id];

      const [data, _] = await db.execute(sql, userAchievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- increment points ---");
    }
  }

  static async checkUserAchievementPoints(user_id, type) {
    try {
      const sql = `SELECT * FROM user_achievement AS ua
                  INNER JOIN achievement AS a ON ua.achievement_id = a.achievement_id
                  INNER JOIN reward AS r ON a.reward_id = r.reward_id
                  WHERE ua.points >= a.goal
                  AND ua.is_seen = '0'
                  AND a.achievement_type = ?
                  AND ua.user_id = ?;`;

      const userAchievementValues = [type, user_id];

      const [data, _] = await db.execute(sql, userAchievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- check session achievement ---");
    }
  }

  static async assignUserAchievements(user_id) {
    try {
      const sql = `INSERT INTO user_achievement (achievement_id, user_id)
                    SELECT achievement_id, ? FROM achievement;`;

      const userAchievementValues = [user_id];

      const [data, _] = await db.execute(sql, userAchievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- assign user achievements ---");
    }
  }

  static async getUserPoints(user_id, type) {
    try {
      const sql = `SELECT COALESCE(MAX(points), 0) as points
                  FROM user_achievement AS ua
                  
                  INNER JOIN achievement AS a
                  ON ua.achievement_id = a.achievement_id
                  
                  WHERE ua.user_id = ?
                  AND a.achievement_type = ?;`;

      const userAchievementValues = [user_id, type];

      const [data, _] = await db.execute(sql, userAchievementValues);

      return data[0].points;
    } catch (error) {
      console.log(error + "--- get user points ---");
    }
  }

  static async assignAchievement(achievement_id, user_id, points) {
    try {
      const sql = `INSERT INTO user_achievement (achievement_id, user_id, points) VALUES (?, ?, ?);`;
      const achievementValues = [achievement_id, user_id, points];

      const [data, _] = await db.execute(sql, achievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- assign an achievement ---");
    }
  }

  static async seeUserAchievements(user_achievement_id) {
    try {
      const sql = `UPDATE user_achievement SET is_seen = ?
                  WHERE user_achievement_id = ?;`;
      const userAchievementValues = [true, user_achievement_id];
      const [data, _] = await db.query(sql, userAchievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- see user achievements ---");
    }
  }
}

module.exports = UserAchievement;
