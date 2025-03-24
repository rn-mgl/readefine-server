const db = require("../../db/connection");

class Reward {
  constructor(reward_name, reward_type, reward, description) {
    this.reward_name = reward_name;
    this.reward_type = reward_type;
    this.reward = reward;
    this.description = description;
  }

  async createReward() {
    try {
      const sql =
        "INSERT INTO reward (reward_name, reward_type, reward, description) VALUES (?, ?, ?, ?);";
      const rewardValues = [
        this.reward_name,
        this.reward_type,
        this.reward,
        this.description,
      ];

      const [data, _] = await db.execute(sql, rewardValues);
      return data;
    } catch (error) {
      console.log(error + "--- create reward ---");
    }
  }

  static async updateReward(
    reward_id,
    reward_name,
    reward_type,
    description,
    reward
  ) {
    try {
      const sql = `UPDATE reward SET reward_name = ?, reward_type = ?, reward = ?, description = ?
                    WHERE reward_id = ?;`;
      const rewardValues = [
        reward_name,
        reward_type,
        reward,
        description,
        reward_id,
      ];

      console.log("update");

      const [data, _] = await db.execute(sql, rewardValues);
      return data;
    } catch (error) {
      console.log(error + "--- update reward ---");
    }
  }

  static async deleteReward(reward_id) {
    try {
      const sql = `DELETE FROM reward
                    WHERE reward_id = ?;`;
      const rewardValues = [reward_id];
      const [data, _] = await db.execute(sql, rewardValues);
      return data;
    } catch (error) {
      console.log(error + "--- delete reward ---");
    }
  }

  static async getAllRewards(
    searchFilter,
    sortFilter,
    dateRangeFilter,
    typeFilter
  ) {
    const dateFrom = dateRangeFilter.from
      ? dateRangeFilter.from
      : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();

    try {
      const sql = `SELECT * FROM reward
                  WHERE ${searchFilter.toSearch} LIKE ?
                  AND
                      reward_type LIKE ?
                  AND 
                      CAST(date_added AS DATE) >= ? 
                  AND 
                      CAST(date_added AS DATE) <= ?
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;

      const rewardValues = [
        `%${searchFilter.searchKey}%`,
        `%${typeFilter}%`,
        dateFrom,
        dateTo,
      ];

      const [data, _] = await db.execute(sql, rewardValues);

      return data;
    } catch (error) {
      console.log(error + "--- select all rewards ---");
    }
  }

  static async getAllUserRewards(
    user_id,
    searchFilter,
    sortFilter,
    showFilter,
    typeFilter
  ) {
    try {
      const sqlAll = `SELECT ua.user_achievement_id, r.reward_id, r.reward_name, 
                          r.reward_type, r.reward, r.description, r.date_added,

                      CASE
                        WHEN ua.points >= a.goal THEN 1 ELSE 0
                      END AS is_received
                      
                      FROM achievement AS a

                      INNER JOIN user_achievement AS ua 
                      ON ua.achievement_id = a.achievement_id

                      INNER JOIN reward AS r 
                      ON r.reward_id = a.reward_id

                      WHERE ua.user_id = ?

                      AND 
                        r.${searchFilter.toSearch} LIKE ?

                      AND
                        r.reward_type LIKE ?
                        
                      ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode}`;

      const sqlUser = `SELECT * FROM user_achievement AS ua

                      INNER JOIN achievement AS a 
                      ON ua.achievement_id = a.achievement_id

                      INNER JOIN reward AS r 
                      ON r.reward_id = a.reward_id

                      WHERE ua.user_id = ?

                      AND 
                        a.goal <= ua.points

                      AND 
                        r.${searchFilter.toSearch} LIKE ?

                      AND
                        r.reward_type LIKE ?

                      ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;

      const rewardValues = [
        user_id,
        `%${searchFilter.searchKey}%`,
        `%${typeFilter}%`,
      ];

      const toexecute = showFilter.toShow === "all" ? sqlAll : sqlUser;
      const [data, _] = await db.execute(toexecute, rewardValues);
      return data;
    } catch (error) {
      console.log(error + "--- get all user rewards ---");
    }
  }

  static async getReward(reward_id) {
    try {
      const sql = `SELECT * FROM reward
                    WHERE reward_id = ?;`;
      const rewardValues = [reward_id];
      const [data, _] = await db.execute(sql, rewardValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- select reward ---");
    }
  }

  static async getUserReward(reward_id) {
    try {
      const sql = `SELECT * FROM reward AS r
                    INNER JOIN achievement AS a ON r.reward_id = a.reward_id
                    INNER JOIN user_achievement AS ua ON a.achievement_id = ua.achievement_id
                    WHERE r.reward_id = ?;`;
      const rewardValues = [reward_id];

      const [data, _] = await db.execute(sql, rewardValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- select reward ---");
    }
  }
}

module.exports = Reward;
