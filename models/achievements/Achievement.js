const db = require("../../db/connection");

class Achievement {
  constructor(achievement_name, achievement_type, task, goal, reward_id) {
    this.achievement_name = achievement_name;
    this.achievement_type = achievement_type;
    this.task = task;
    this.goal = goal;
    this.reward_id = reward_id;
  }

  async createAchievement() {
    try {
      const sql =
        "INSERT INTO achievement (achievement_name, achievement_type, task, goal, reward_id) VALUES (?, ?, ?, ?, ?);";
      const achievementValues = [
        this.achievement_name,
        this.achievement_type,
        this.task,
        this.goal,
        this.reward_id,
      ];

      const [data, _] = await db.execute(sql, achievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- create achievement ---");
    }
  }

  static async updateAchievement(
    achievement_id,
    achievement_name,
    achievement_type,
    task,
    goal,
    reward_id
  ) {
    try {
      const sql = `UPDATE achievement SET achievement_name = ?, achievement_type = ?, task = ?, goal = ?, reward_id = ?
                    WHERE achievement_id = ?;`;
      const achievementValues = [
        achievement_name,
        achievement_type,
        task,
        goal,
        reward_id,
        achievement_id,
      ];

      const [data, _] = await db.execute(sql, achievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- update achievement ---");
    }
  }

  static async deleteAchievement(achievement_id) {
    try {
      const sql = `DELETE FROM achievement
                    WHERE achievement_id = ?;`;

      const achievementValues = [achievement_id];

      const [data, _] = await db.execute(sql, achievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- delete achievement ---");
    }
  }

  static async getAllAchievements(
    searchFilter,
    goalRangeFilter,
    sortFilter,
    dateRangeFilter,
    typeFilter
  ) {
    const goalFrom = goalRangeFilter.from ? goalRangeFilter.from : 0;
    const goalTo = goalRangeFilter.to ? goalRangeFilter.to : 1400;
    const dateFrom = dateRangeFilter.from
      ? dateRangeFilter.from
      : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();
    try {
      const sql = `SELECT * FROM achievement AS a
                  INNER JOIN reward AS r ON
                  a.reward_id = r.reward_id
                  WHERE ${searchFilter.toSearch} LIKE ?
                  AND
                      a.achievement_type LIKE ?
                  AND 
                      goal >= ? 
                  AND 
                      goal <= ?
                  AND 
                      CAST(a.date_added as DATE) >= ? 
                  AND 
                      CAST(a.date_added as DATE) <= ?
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;

      const achievementValues = [
        `%${searchFilter.searchKey}%`,
        `%${typeFilter}%`,
        goalFrom,
        goalTo,
        dateFrom,
        dateTo,
      ];

      const [data, _] = await db.execute(sql, achievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all achievements ---");
    }
  }

  static async getAchievement(achievement_id) {
    try {
      const sql = `SELECT * FROM achievement AS a
                  INNER JOIN reward AS r ON 
                  a.reward_id = r.reward_id
                    WHERE achievement_id = ?;`;

      const achievementValues = [achievement_id];

      const [data, _] = await db.execute(sql, achievementValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get achievement ---");
    }
  }
}

module.exports = Achievement;
