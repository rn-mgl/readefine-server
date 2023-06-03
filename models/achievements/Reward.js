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

  static async updateReward(reward_id, reward_name, reward_type, reward, description, added_by) {
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

  static async getAllRewards(searchFilter, sortFilter, dateRangeFilter) {
    const dateFrom = dateRangeFilter.from ? dateRangeFilter.from : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();
    try {
      const sql = `SELECT * FROM reward
                  WHERE ${searchFilter.toSearch} LIKE '%${searchFilter.searchKey}%'
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
}

module.exports = Reward;
