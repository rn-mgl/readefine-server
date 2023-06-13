const db = require("../../db/connection");

class Dashboard {
  constructor() {}

  static async getCounts() {
    try {
      const sql = `SELECT (SELECT COUNT(user_id) FROM users) AS userCount,
                          (SELECT COUNT(story_id) FROM story) AS storyCount,
                          (SELECT COUNT(test_id) FROM test) AS testCount,
                          (SELECT COUNT(question_id) FROM test_question) AS questionCount,
                          (SELECT COUNT(achievement_id) FROM achievement) AS achievementCount,
                          (SELECT COUNT(reward_id) FROM reward) AS rewardCount,
                          (SELECT COUNT(riddle_id) FROM riddles) AS riddleCount`;

      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + " --- get counts ---");
    }
  }

  static async getSingleUserCounts(user_id) {
    try {
      const sql = `SELECT (SELECT COUNT(read_id) FROM read_story WHERE read_by = '${user_id}') AS readCount,
                  (SELECT COUNT(taken_id) FROM taken_test WHERE taken_by = '${user_id}') AS testCount,
                  (SELECT COUNT(user_achievement_id) FROM user_achievement WHERE user_id = '${user_id}') AS achievementCount,
                  (SELECT COUNT(user_achievement_id) FROM user_achievement WHERE user_id = '${user_id}') AS rewardCount,
                  (SELECT COUNT(answer_id) FROM answered_riddles WHERE answered_by = '${user_id}') AS riddleCount`;

      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + " --- get counts ---");
    }
  }
}

module.exports = Dashboard;
