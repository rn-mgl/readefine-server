const db = require("../../db/connection");

class Dashboard {
  constructor() {}

  static async getAdminCounts() {
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

  static async getAdminUpdates() {
    try {
      const sql = `SELECT (SELECT s.title 
                            FROM story AS s 
                            WHERE s.story_id = (SELECT MAX(story_id) FROM story)) AS storyTitle,

                          (SELECT CONCAT(u.name, " ", u.surname) 
                            FROM users AS u 
                            WHERE u.user_id = (SELECT MAX(user_id) FROM users)) AS userName,

                          (SELECT s.title FROM test AS t
                            INNER JOIN story AS s ON t.story_id = s.story_id
                            WHERE t.test_id = (SELECT MAX(test_id) FROM test)) AS testTitle,

                          (SELECT r.reward_name FROM reward AS r
                            WHERE r.reward_id = (SELECT MAX(reward_id) FROM reward)) AS rewardName,
                          
                          (SELECT a.achievement_name FROM achievement AS a
                            WHERE a.achievement_id = (SELECT MAX(achievement_id) FROM achievement)) AS achievementName;`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get updates ---");
    }
  }

  static async getSingleUserCounts(user_id) {
    try {
      const sql = `SELECT (SELECT COUNT(read_id) FROM read_story WHERE read_by = '${user_id}') AS readCount,

                  (SELECT COUNT(taken_id) FROM taken_test WHERE taken_by = '${user_id}') AS testCount,

                  (SELECT COUNT(user_achievement_id) FROM user_achievement AS ua
                    INNER JOIN achievement AS a ON ua.achievement_id = a.achievement_id
                    WHERE user_id = '${user_id}' AND ua.points >= a.goal) AS achievementCount,

                  (SELECT COUNT(answer_id) FROM answered_riddles WHERE answered_by = '${user_id}') AS riddleCount`;

      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + " --- get counts ---");
    }
  }

  static async getHeadUpdates() {
    try {
      const sql = `SELECT (
                    SELECT CONCAT(admin.name, " ", admin.surname) FROM admin
                    WHERE admin.admin_id = (SELECT MAX(admin_id) FROM admin)) AS lastAdmin,

                    (SELECT resource_name FROM admin_activity
                    WHERE activity_type = 'C' 
                    AND activity_id = (SELECT MAX(activity_id) FROM 
                                      admin_activity WHERE activity_type = 'C')) 
                    AS lastCreate,

                    (SELECT resource_name FROM admin_activity
                    WHERE activity_type = 'R'
                    AND activity_id = (SELECT MAX(activity_id) FROM 
                                      admin_activity WHERE activity_type = 'R')) 
                     AS lastRead,

                    (SELECT resource_name FROM admin_activity
                    WHERE activity_type = 'U' 
                    AND activity_id = (SELECT MAX(activity_id) FROM 
                                      admin_activity WHERE activity_type = 'U')) 
                    AS lastUpdate,

                    (SELECT resource_name FROM admin_activity
                    WHERE activity_type = 'D' 
                    AND activity_id = (SELECT MAX(activity_id) FROM 
                                      admin_activity WHERE activity_type = 'D')) 
                    AS lastDelete;`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get head updates ---");
    }
  }
}

module.exports = Dashboard;
