require("dotenv").config();
require("express-async-errors");

// instantiate
const express = require("express");
const cors = require("cors");

// instantiate
const app = express();
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const sendgrid = require("@sendgrid/mail");

///////////////////////////////////////// global routers /////////////////////////////////////////////////////
const fileClientRouter = require("./routers/client/files/fileRouter");
const fileAdminRouter = require("./routers/admin/files/fileRouter");
const fileHeadRouter = require("./routers/head/files/fileRouter");
const warmerRouter = require("./routers/global/warmerRouter");

///////////////////////////////////////// client routers /////////////////////////////////////////////////////
const wordsRouter = require("./routers/client/words/wordsRouter");
const {
  userRouter,
  userSessionRouter,
  userLexileRouter,
} = require("./routers/client/users"); // user

const {
  readStoryRouter,
  storyContentRouter,
  storyRouter,
} = require("./routers/client/story"); // story

const {
  authClientRouter,
  passwordResetRouter,
} = require("./routers/client/auth"); // auth

const { userActivitiesRouter } = require("./routers/client/activities"); // activites

const {
  rewardRouter,
  userAchievementRouter,
} = require("./routers/client/achievement"); // achievement

const archivesRouter = require("./routers/client/archives/archivesRouter"); //archives

const {
  testRouter,
  takenTestRouter,
  testQuestionRouter,
  testAnswerRouter,
} = require("./routers/client/test"); // test

const {
  riddlesRouter,
  minigameDashboardRouter,
} = require("./routers/client/minigames"); // minigames

const {
  answeredDangleRouter,
  answeredDecipherRouter,
  answeredQuestionsRouter,
  answeredRiddlesRouter,
} = require("./routers/client/answers"); // answers

//////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// admin routers /////////////////////////////////////
const adminDashboardRouter = require("./routers/admin/dashboard/dashboardRouter");

const adminWordsRouter = require("./routers/admin/words/wordsRouter");

const {
  authAdminRouter,
  adminPasswordResetRouter,
} = require("./routers/admin/auth"); // auth

const { adminActivitiesRouter } = require("./routers/admin/activities/"); // activities

const {
  adminUserRouter,
  adminRouter,
  adminUserSessionRouter,
  adminUserLexileRouter,
  adminSessionRouter,
} = require("./routers/admin/users"); // user

const {
  adminAchievementRouter,
  adminRewardRouter,
  adminUserAchievementRouter,
} = require("./routers/admin/achievement"); // achievement

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

const { adminRiddlesRouter } = require("./routers/admin/minigames"); // minigames

const {
  adminAnsweredDangleRouter,
  adminAnsweredDecipherRouter,
  adminAnsweredQuestionsRouter,
  adminAnsweredRiddlesRouter,
} = require("./routers/admin/answers"); // answers

//////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// head routers /////////////////////////////////////

const headDashboardRouter = require("./routers/head/dashboard/dashboardRouter");

const {
  authHeadRouter,
  headPasswordResetRouter,
} = require("./routers/head/auth"); // auth

const {
  headRouter,
  headSessionRouter,
  headAdminRouter,
} = require("./routers/head/users"); // users

const { headAdminActivitiesRouter } = require("./routers/head/activities/");

//////////////////////////////////////////////////////////////////////////////

// middlewares
const clientAuthMiddleware = require("./middlewares/clientAuthMiddleware");
const adminAuthMiddleware = require("./middlewares/adminAuthMiddleware");
const headAuthMiddleware = require("./middlewares/headAuthMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(helmet());
app.use(fileUpload({ useTempFiles: true }));
sendgrid.setApiKey(process.env.SENDGRID_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

///////////////////////// global router application /////////////////////////

app.use("/readefine_admin_file", adminAuthMiddleware, fileAdminRouter);
app.use("/readefine_client_file", clientAuthMiddleware, fileClientRouter);
app.use("/readefine_head_file", headAuthMiddleware, fileHeadRouter);

app.use("/warmer", warmerRouter);

///////////////////////// client router application /////////////////////////

// auth router application
app.use("/auth_client", authClientRouter);
app.use("/auth_client_password_reset", passwordResetRouter);

// user archives
app.use("/archives", clientAuthMiddleware, archivesRouter);

// users router application
app.use("/user", clientAuthMiddleware, userRouter);
app.use("/user_lexile", clientAuthMiddleware, userLexileRouter);

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
app.use("/riddles", clientAuthMiddleware, riddlesRouter);
app.use("/minigames_dashboard", clientAuthMiddleware, minigameDashboardRouter);

// answers router application
app.use("/answered_dangle", clientAuthMiddleware, answeredDangleRouter);
app.use("/answered_decipher", clientAuthMiddleware, answeredDecipherRouter);
app.use("/answered_questions", clientAuthMiddleware, answeredQuestionsRouter);
app.use("/answered_riddles", clientAuthMiddleware, answeredRiddlesRouter);

// word router application
app.use("/words", clientAuthMiddleware, wordsRouter);

// user session application
app.use("/session", userSessionRouter);

// activities router application
app.use("/activities", clientAuthMiddleware, userActivitiesRouter);

//////////////////////////////////////////////////////////////////////////////

///////////////////////// admin router application /////////////////////////

// auth router application
app.use("/auth_admin", authAdminRouter);
app.use("/auth_admin_password_reset", adminPasswordResetRouter);

// dashboard router application
app.use("/admin_dashboard", adminAuthMiddleware, adminDashboardRouter);

// users router application
app.use("/admin_user", adminAuthMiddleware, adminUserRouter);
app.use("/admin", adminAuthMiddleware, adminRouter);
app.use("/admin_user_session", adminAuthMiddleware, adminUserSessionRouter);
app.use("/admin_user_lexile", adminAuthMiddleware, adminUserLexileRouter);

// story router application
app.use("/admin_story", adminAuthMiddleware, adminStoryRouter);
app.use("/admin_story_content", adminAuthMiddleware, adminStoryContentRouter);
app.use("/admin_read_story", adminAuthMiddleware, adminReadStoryRouter);

// achievement router application
app.use("/admin_achievement", adminAuthMiddleware, adminAchievementRouter);
app.use(
  "/admin_user_achievement",
  adminAuthMiddleware,
  adminUserAchievementRouter
);
app.use("/admin_reward", adminAuthMiddleware, adminRewardRouter);

// test router application
app.use("/admin_test", adminAuthMiddleware, adminTestRouter);
app.use("/admin_taken_test", adminAuthMiddleware, adminTakenTestRouter);
app.use("/admin_test_question", adminAuthMiddleware, adminTestQuestionRouter);
app.use("/admin_test_answer", adminAuthMiddleware, adminTestAnswerRouter);

// minigames router application
app.use("/admin_riddles", adminAuthMiddleware, adminRiddlesRouter);

// answers router application
app.use(
  "/admin_answered_dangle",
  adminAuthMiddleware,
  adminAnsweredDangleRouter
);
app.use(
  "/admin_answered_decipher",
  adminAuthMiddleware,
  adminAnsweredDecipherRouter
);
app.use(
  "/admin_answered_questions",
  adminAuthMiddleware,
  adminAnsweredQuestionsRouter
);
app.use(
  "/admin_answered_riddles",
  adminAuthMiddleware,
  adminAnsweredRiddlesRouter
);

// words
app.use("/admin_words", adminAuthMiddleware, adminWordsRouter);

//sessions
app.use("/admin_session", adminSessionRouter);

// activities
app.use("/admin_activities", adminAuthMiddleware, adminActivitiesRouter);

//////////////////////////////////////////////////////////////////////////////

///////////////////////// head router application /////////////////////////

// auth router application
app.use("/auth_head", authHeadRouter);
app.use("/auth_head_password_reset", headPasswordResetRouter);

// session router application
app.use("/head_session", headAuthMiddleware, headSessionRouter);

// users router application
app.use("/head", headAuthMiddleware, headRouter);
app.use("/head_admin", headAuthMiddleware, headAdminRouter);

// dashboard router application
app.use("/head_dashboard", headAuthMiddleware, headDashboardRouter);

//activities router application
app.use(
  "/head_admin_activities",
  headAuthMiddleware,
  headAdminActivitiesRouter
);

//////////////////////////////////////////////////////////////////////////////

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
