const db = require("../../db/connection");

class AdminActivities {
  constructor() {}

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

      const [achievementData, _1] = await db.execute(sqlAchievement);
      const [rewardData, _2] = await db.execute(sqlReward);
      const [riddlesData, _3] = await db.execute(sqlRiddles);
      const [storyData, _4] = await db.execute(sqlStory);
      const [storyContentData, _5] = await db.execute(sqlStoryContent);
      const [testData, _6] = await db.execute(sqlTest);
      const [testAnswerData, _7] = await db.execute(sqlTestAnswer);
      const [testQuestionData, _8] = await db.execute(sqlTestQuestion);

      return {
        achievementData,
        rewardData,
        riddlesData,
        storyData,
        storyContentData,
        testData,
        testAnswerData,
        testQuestionData,
      };
    } catch (error) {
      console.log(error + "--- get all admin activities ---");
    }
  }
}

module.exports = AdminActivities;
