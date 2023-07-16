const db = require("../../db/connection");

class UserActivities {
  constructor() {}

  static async getAllUserActivities(user_id) {
    try {
      const sqlDangle = `SELECT * FROM answered_dangle AS ad
                        INNER JOIN words AS w ON ad.word_id = w.word_id
                        WHERE answered_by = '${user_id}'
                        ORDER BY ad.date_answered DESC;`;

      const sqlDecipher = `SELECT * FROM answered_decipher AS ad
                          INNER JOIN words AS w ON ad.word_id = w.word_id
                          WHERE answered_by = '${user_id}'
                          ORDER BY ad.date_answered DESC;`;

      const sqlRiddles = `SELECT ar.answer_id, ar.date_answered, r.riddle, r.answer AS correct_answer, ar.answer AS my_answer FROM answered_riddles AS ar
                          INNER JOIN riddles AS r ON ar.riddle_id = r.riddle_id
                          WHERE answered_by = '${user_id}'
                          ORDER BY ar.date_answered DESC;`;

      const sqlQuestions = `SELECT aq.answer_id, aq.date_answered, aq.answer AS my_answer, tq.question, ta.answer AS correct_answer 
                          FROM answered_question AS aq
                          INNER JOIN test_question AS tq ON aq.question_id = tq.question_id
                          INNER JOIN test_answer AS ta on tq.question_id = ta.question_id
                          WHERE answered_by = '${user_id}'
                          ORDER BY aq.date_answered DESC;`;

      const sqlReadStory = `SELECT s.added_by, s.author, s.book_cover, 
                            s.date_added, s.genre, s.lexile, s.story_id, t.test_id, s.title, rs.read_by, rs.date_read,

                            CASE
                              WHEN rs.read_by = '${user_id}' THEN 1 ELSE 0
                            END AS is_read,

                            CASE
                              WHEN tt.taken_by = '${user_id}' THEN 1 ELSE 0
                            END AS is_taken

                            FROM story AS s

                            LEFT JOIN test AS t
                            ON s.story_id = t.story_id

                            LEFT JOIN read_story AS rs
                            ON s.story_id = rs.story_id
                            AND rs.read_by = '${user_id}'

                            LEFT JOIN taken_test AS tt
                            ON t.test_id = tt.test_id
                            AND tt.taken_by = '${user_id}'
                            
                            WHERE rs.read_by = '${user_id}'
                            ORDER BY rs.date_read DESC;`;

      const sqlTakenTest = `SELECT t.test_id, t.story_id, t.date_added, t.added_by, 
                            s.story_id, s.book_cover, s.title, s.author, s.lexile, s.genre, s.added_by, s.date_added, 
                            tt.score, tt.date_taken,

                            CASE 
                              WHEN tt.taken_by = '${user_id}' THEN 1 ELSE 0
                            END AS is_taken

                            FROM test AS t

                            INNER JOIN story AS s ON
                            t.story_id = s.story_id

                            LEFT JOIN taken_test AS tt ON
                            t.test_id = tt.test_id
                            AND tt.taken_by = '${user_id}'
                            
                            WHERE tt.taken_by = '${user_id}'
                            ORDER BY tt.date_taken DESC;`;

      const sqlAchievement = `SELECT ua.user_achievement_id, ua.user_id, ua.points,

                              a.achievement_id, a.achievement_name, a.achievement_type, a.specifics, a.task, a.goal,

                              r.reward_id, r.reward_name, r.reward_type, r.reward, r.description,

                              CASE
                                WHEN ua.points >= a.goal THEN 1 ELSE 0
                              END AS is_received

                              FROM user_achievement AS ua 

                              INNER JOIN achievement AS a 
                              ON ua.achievement_id = a.achievement_id

                              INNER JOIN reward AS r 
                              ON a.reward_id = r.reward_id

                              WHERE ua.user_id = '${user_id}'
                              AND ua.points >= a.goal
                              
                              ORDER BY ua.date_updated DESC;`;

      const sqlSession = `SELECT * FROM user_session
                          WHERE user_id = '${user_id}'
                          ORDER BY date_logged DESC;`;

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
