const db = require("../../db/connection");

class AdminActivities {
  constructor(admin_id, resource_type, resource_name, activity_type) {
    this.admin_id = admin_id;
    this.resource_type = resource_type;
    this.resource_name = resource_name;
    this.activity_type = activity_type;
  }

  async createAdminActivity() {
    try {
      const sql = `INSERT INTO admin_activity SET ?;`;
      const insertValues = {
        admin_id: this.admin_id,
        resource_type: this.resource_type,
        resource_name: this.resource_name,
        activity_type: this.activity_type,
      };

      const [data, _] = await db.query(sql, insertValues);
      return data;
    } catch (error) {
      console.log(error + "--- create admin activity ---");
    }
  }

  static async getAllAdminActivity(resource_type, activity_type) {
    try {
      const sql = `SELECT * FROM admin_activity AS aa
                  INNER JOIN admin AS a
                  ON aa.admin_id = a.admin_id
                  WHERE aa.resource_type LIKE '%${resource_type}%'
                  AND aa.activity_type = '${activity_type}'
                  ORDER BY aa.date_logged DESC;`;

      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all admin activities ---");
    }
  }

  static async getAllAdminActivities(admin_id) {
    try {
      const sqlAchievement = `SELECT * FROM achievement 
                              WHERE added_by = '${admin_id}'
                              ORDER BY date_added DESC;`;

      const sqlReward = `SELECT * FROM reward AS r
                        INNER JOIN achievement AS a ON r.reward_id = a.reward_id
                        WHERE r.added_by = '${admin_id}'
                        ORDER BY r.date_added DESC;`;

      const sqlRiddles = `SELECT * FROM riddles 
                        WHERE added_by = '${admin_id}'
                        ORDER BY date_added DESC;`;

      const sqlStory = `SELECT * FROM story 
                       WHERE added_by = '${admin_id}'
                       ORDER BY date_added DESC;`;

      const sqlStoryContent = `SELECT * FROM story_content AS sc 
                                INNER JOIN story AS s ON sc.story_id = s.story_id
                                WHERE sc.added_by = '${admin_id}'
                                ORDER BY sc.date_added DESC;`;

      const sqlTest = `SELECT * FROM test AS t 
                        INNER JOIN story AS s ON t.story_id = s.story_id
                        WHERE t.added_by = '${admin_id}'
                        ORDER BY t.date_added DESC;`;

      const sqlTestAnswer = `SELECT * FROM test_answer AS ta
                            INNER JOIN test_question AS tq ON ta.question_id = tq.question_id
                            INNER JOIN test AS t ON tq.test_id = t.test_id
                            INNER JOIN story AS s ON t.story_id = s.story_id
                            WHERE ta.added_by = '${admin_id}'
                            ORDER BY ta.date_added DESC;`;

      const sqlTestQuestion = `SELECT * FROM test_question AS tq
                              INNER JOIN test AS t ON tq.test_id = t.test_id
                              INNER JOIN story AS s ON t.story_id = s.story_id
                              WHERE tq.added_by = '${admin_id}'
                              ORDER BY tq.date_added DESC;`;

      const sqlSession = `SELECT * FROM admin_session
                              WHERE admin_id = '${admin_id}'
                              ORDER BY date_logged DESC;`;

      const [achievementData, _1] = await db.execute(sqlAchievement);
      const [rewardData, _2] = await db.execute(sqlReward);
      const [riddlesData, _3] = await db.execute(sqlRiddles);
      const [storyData, _4] = await db.execute(sqlStory);
      const [storyContentData, _5] = await db.execute(sqlStoryContent);
      const [testData, _6] = await db.execute(sqlTest);
      const [testAnswerData, _7] = await db.execute(sqlTestAnswer);
      const [testQuestionData, _8] = await db.execute(sqlTestQuestion);
      const [sessionData, _9] = await db.execute(sqlSession);

      return {
        achievementData,
        rewardData,
        riddlesData,
        storyData,
        storyContentData,
        testData,
        testAnswerData,
        testQuestionData,
        sessionData,
      };
    } catch (error) {
      console.log(error + "--- get all admin activities ---");
    }
  }
}

module.exports = AdminActivities;
