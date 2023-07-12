const db = require("../../db/connection");

class UserActivities {
  constructor() {}

  static async getAllUserActivities(user_id) {
    try {
      const sqlDangle = `SELECT * FROM answered_dangle AS ad
                        INNER JOIN words AS w ON ad.word_id = w.word_id
                        WHERE answered_by = '${user_id}';`;

      const sqlDecipher = `SELECT * FROM answered_decipher AS ad
                          INNER JOIN words AS w ON ad.word_id = w.word_id
                          WHERE answered_by = '${user_id}';`;

      const sqlRiddles = `SELECT ar.answer_id, r.riddle, r.answer AS correct_answer, ar.answer AS my_answer FROM answered_riddles AS ar
                          INNER JOIN riddles AS r ON ar.riddle_id = r.riddle_id
                          WHERE answered_by = '${user_id}';`;

      const sqlQuestions = `SELECT aq.answer_id, aq.answer AS my_answer, tq.question, ta.answer AS correct_answer 
                          FROM answered_question AS aq
                          INNER JOIN test_question AS tq ON aq.question_id = tq.question_id
                          INNER JOIN test_answer AS ta on tq.question_id = ta.question_id
                          WHERE answered_by = '${user_id}';`;

      const sqlReadStory = `SELECT * FROM read_story AS rs
                            INNER JOIN story AS s ON rs.story_id = s.story_id
                            WHERE rs.read_by = '${user_id}';`;

      const sqlTakenTest = `SELECT * FROM taken_test AS tt
                            INNER JOIN test AS t ON tt.test_id = t.test_id
                            INNER JOIN story AS s ON t.story_id = s.story_id
                            WHERE tt.taken_by = '${user_id}';`;

      const sqlAchievement = `SELECT * FROM user_achievement AS ua 
                            INNER JOIN achievement AS a ON ua.achievement_id = a.achievement_id
                            WHERE ua.user_id = '${user_id}';`;

      const sqlSession = `SELECT * FROM user_session
                          WHERE user_id = '${user_id}';`;

      const [dangleData, _1] = await db.execute(sqlDangle);
      const [decipherData, _2] = await db.execute(sqlDecipher);
      const [riddlesData, _3] = await db.execute(sqlRiddles);
      const [questionsData, _4] = await db.execute(sqlQuestions);
      const [readStoryData, _5] = await db.execute(sqlReadStory);
      const [takenTestData, _6] = await db.execute(sqlTakenTest);
      const [achievementData, _7] = await db.execute(sqlAchievement);
      const [sessionsData, _8] = await db.execute(sqlSession);

      return {
        dangleData,
        decipherData,
        riddlesData,
        questionsData,
        readStoryData,
        takenTestData,
        achievementData,
        sessionsData,
      };
    } catch (error) {
      console.log(error + "--- get all user activities ---");
    }
  }
}

module.exports = UserActivities;
