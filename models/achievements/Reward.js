const db = require("../../db/connection");

class Reward {
  constructor(reward_name, reward_type, reward, description, added_by) {
    this.reward_name = reward_name;
    this.reward_type = reward_type;
    this.reward = reward;
    this.description = description;
    this.added_by = added_by;
  }

  async createReward() {
    try {
      const sql = "INSERT INTO reward SET ?;";
      const rewardValues = {
        reward_name: this.reward_name,
        reward_type: this.reward_type,
        reward: this.reward,
        description: this.description,
        added_by: this.added_by,
      };

      const [data, _] = await db.query(sql, rewardValues);
      return data;
    } catch (error) {
      console.log(error + "--- create reward ---");
    }
  }

  static async updateReward(reward_id, reward_name, reward_type, description, reward, added_by) {
    try {
      const sql = `UPDATE reward SET ?
                    WHERE reward_id = '${reward_id}';`;
      const rewardValues = {
        reward_name,
        reward_type,
        reward,
        added_by,
        description,
      };

      const [data, _] = await db.query(sql, rewardValues);
      return data;
    } catch (error) {
      console.log(error + "--- update reward ---");
    }
  }

  static async deleteReward(reward_id) {
    try {
      const sql = `DELETE FROM reward
                    WHERE reward_id = '${reward_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- delete reward ---");
    }
  }

  static async getAllRewards(searchFilter, sortFilter, dateRangeFilter, typeFilter) {
    const dateFrom = dateRangeFilter.from ? dateRangeFilter.from : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();
    try {
      const sql = `SELECT * FROM reward
                  WHERE ${searchFilter.toSearch} LIKE '%${searchFilter.searchKey}%'
                  AND
                      reward_type LIKE '%${typeFilter}%'
                  AND 
                      CAST(date_added AS DATE) >= '${dateFrom}' 
                  AND 
                      CAST(date_added AS DATE) <= '${dateTo}'
                  ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;

      const [data, _] = await db.execute(sql);

      return data;
    } catch (error) {
      console.log(error + "--- select all rewards ---");
    }
  }

  static async getAllUserRewards(user_id, searchFilter, sortFilter, showFilter, typeFilter) {
    try {
      const sqlAll = `SELECT ua.user_achievement_id, r.reward_id, r.reward_name, 
                          r.reward_type, r.reward, r.description, r.added_by, r.date_added,

                      CASE
                        WHEN ua.points >= a.goal THEN 1 ELSE 0
                      END AS is_received
                      
                      FROM achievement AS a

                      INNER JOIN user_achievement AS ua 
                      ON ua.achievement_id = a.achievement_id

                      INNER JOIN reward AS r 
                      ON r.reward_id = a.reward_id

                      WHERE ua.user_id = '${user_id}'

                      AND 
                        r.${searchFilter.toSearch} LIKE '%${searchFilter.searchKey}%'

                      AND
                        r.reward_type LIKE '%${typeFilter}%'
                        
                      ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode}`;

      const sqlUser = `SELECT * FROM user_achievement AS ua

                      INNER JOIN achievement AS a 
                      ON ua.achievement_id = a.achievement_id

                      INNER JOIN reward AS r 
                      ON r.reward_id = a.reward_id

                      WHERE ua.user_id = '${user_id}'

                      AND 
                        a.goal <= ua.points

                      AND 
                        r.${searchFilter.toSearch} LIKE '%${searchFilter.searchKey}%'

                      AND
                        r.reward_type LIKE '%${typeFilter}%'

                      ORDER BY ${sortFilter.toSort} ${sortFilter.sortMode};`;

      const toQuery = showFilter.toShow === "all" ? sqlAll : sqlUser;
      const [data, _] = await db.execute(toQuery);
      return data;
    } catch (error) {
      console.log(error + "--- get all user rewards ---");
    }
  }

  static async getReward(reward_id) {
    try {
      const sql = `SELECT * FROM reward
                    WHERE reward_id = '${reward_id}';`;
      const [data, _] = await db.execute(sql);
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
                    WHERE r.reward_id = '${reward_id}';`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- select reward ---");
    }
  }
}

module.exports = Reward;
