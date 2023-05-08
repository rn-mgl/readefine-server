require("dotenv").config();
require("express-async-errors");

// instantiate
const express = require("express");
const cors = require("cors");

// instantiate
const app = express();
const xss = require("xss-clean");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

// client routers
const { userRouter, userSessionRouter } = require("./routers/client/users"); // user
const { readStoryRouter, storyContentRouter, storyRouter } = require("./routers/client/story"); // story
const { authAdminRouter, authClientRouter } = require("./routers/auth"); // auth
const { rewardRouter, userAchievementRouter } = require("./routers/client/achievement"); // achievement
const {
  testRouter,
  takenTestRouter,
  testQuestionRouter,
  testAnswerRouter,
} = require("./routers/client/test"); // test
const {
  dailyDangleRouter,
  dailyDecipherRouter,
  riddlesRouter,
  wordsRouter,
} = require("./routers/client/minigames"); // minigames
const {
  answeredDangleRouter,
  answeredDecipherRouter,
  answeredQuestionsRouter,
  answeredRiddlesRouter,
} = require("./routers/client/answers"); // answers

// admin routers
const { adminUserRouter, adminUserSessionRouter } = require("./routers/admin/users"); // user
const { adminAuthAdminRouter, adminAuthClientRouter } = require("./routers/auth"); // auth
const { adminRewardRouter, adminUserAchievementRouter } = require("./routers/admin/achievement"); // achievement
const {
  adminReadStoryRouter,
  adminStoryContentRouter,
  adminStoryRouter,
} = require("./routers/admin/story"); // story
const {
  adminTestRouter,
  adminTakenTestRouter,
  adminTestQuestionRouter,
  adminTestAnswerRouter,
} = require("./routers/admin/test"); // test
const {
  adminDailyDangleRouter,
  adminDailyDecipherRouter,
  adminRiddlesRouter,
  adminWordsRouter,
} = require("./routers/admin/minigames"); // minigames
const {
  adminAnsweredDangleRouter,
  adminAnsweredDecipherRouter,
  adminAnsweredQuestionsRouter,
  adminAnsweredRiddlesRouter,
} = require("./routers/admin/answers"); // answers

// middlewares
const clientAuthMiddleware = require("./middlewares/clientAuthMiddleware");
const adminAuthMiddleware = require("./middlewares/adminAuthMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");

// middlewares
app.use(cors());
app.use(xss());
app.use(helmet());
app.use(fileUpload({ useTempFiles: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// auth router application
app.use("/auth_admin", authAdminRouter);
app.use("/auth_client", authClientRouter);

// users router application
app.use("/user", clientAuthMiddleware, userRouter);
app.use("/session", clientAuthMiddleware, userSessionRouter);

// story router application
app.use("/story", clientAuthMiddleware, storyRouter);
app.use("/story_content", clientAuthMiddleware, storyContentRouter);
app.use("/read_story", clientAuthMiddleware, readStoryRouter);

// achievement router application

app.use("/user_achievement", clientAuthMiddleware, userAchievementRouter);
app.use("/reward", clientAuthMiddleware, rewardRouter);

// test router application
app.use("/test", clientAuthMiddleware, testRouter);
app.use("/taken_test", clientAuthMiddleware, takenTestRouter);
app.use("/test_question", clientAuthMiddleware, testQuestionRouter);
app.use("/test_answer", clientAuthMiddleware, testAnswerRouter);

// minigames router application
app.use("/dangle", clientAuthMiddleware, dailyDangleRouter);
app.use("/decipher", clientAuthMiddleware, dailyDecipherRouter);
app.use("/riddles", clientAuthMiddleware, riddlesRouter);
app.use("/words", clientAuthMiddleware, wordsRouter);

// answers router application
app.use("/answered_dangle", clientAuthMiddleware, answeredDangleRouter);
app.use("/answered_decipher", clientAuthMiddleware, answeredDecipherRouter);
app.use("/answered_questions", clientAuthMiddleware, answeredQuestionsRouter);
app.use("/answered_riddles", clientAuthMiddleware, answeredRiddlesRouter);

// middleware
app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 9000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`listening to port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
