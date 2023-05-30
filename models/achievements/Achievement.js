const db = require("../../db/connection");

class Achievement {
  constructor(achievement_name, achievement_type, task, goal, reward_id, added_by) {
    this.achievement_name = achievement_name;
    this.achievement_type = achievement_type;
    this.task = task;
    this.goal = goal;
    this.reward_id = reward_id;
    this.added_by = added_by;
  }

  async createAchievement() {
    try {
      const sql = "INSERT INTO achievement SET ?;";
      const achievementValues = {
        achievement_name: this.achievement_name,
        achievement_type: this.achievement_type,
        task: this.task,
        goal: this.goal,
        reward_id: this.reward_id,
        added_by: this.added_by,
      };

      const [data, _] = await db.query(sql, achievementValues);
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
    reward_id,
    added_by
  ) {
    try {
      const sql = `INSERT INTO achievement SET ?
                    WHERE achievement_id = '${achievement_id}';`;
      const achievementValues = {
        achievement_name,
        achievement_type,
        task,
        goal,
        reward_id,
        added_by,
      };

      const [data, _] = await db.query(sql, achievementValues);
      return data;
    } catch (error) {
      console.log(error + "--- update achievement ---");
    }
  }

  static async deleteAchievement(achievement_id) {
    try {
      const sql = `DELETE FROM achievement
                    WHERE achievement_id = '${achievement_id}';`;

      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- delete achievement ---");
    }
  }

  static async getAllAchievements(searchFilter, goalRangeFilter, sortFilter, dateRangeFilter) {
    const goalFrom = goalRangeFilter.from ? goalRangeFilter.from : 0;
    const goalTo = goalRangeFilter.to ? goalRangeFilter.to : 1400;
    const dateFrom = dateRangeFilter.from ? dateRangeFilter.from : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();
    try {
      const sql = `SELECT * FROM achievement
                  WHERE ${searchFilter.toSearch} LIKE '%${searchFilter.searchKey}%'
                  AND 
                      goal >= '${goalFrom}' 
                  AND 
                      goal <= '${goalTo}'
                  AND 
                      date_added >= '${dateFrom}' 
                  AND 
                      date_added <= '${dateTo}'
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;

      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all achievements ---");
    }
  }

  static async getAchievement(achievement_id) {
    try {
      const sql = `SELECT * FROM achievement
                    WHERE achievement_id = '${achievement_id}';`;

      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get achievement ---");
    }
  }
}

module.exports = Achievement;
