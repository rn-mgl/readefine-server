const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");

const User = require("../../../models/users/User");
const UserLexile = require("../../../models/users/UserLexile");
const UserAchievement = require("../../../models/achievements/UserAchievement");

const fns = require("../../functionController");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const { sendVerificationEmail } = require("../mail/verificationMail");

const verifyUser = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new BadRequestError(
      `You do not have the appropriate credentials to verify your account.`
    );
  }

  const isExpired = fns.isTokenExpired(token);

  if (isExpired) {
    throw new BadRequestError(
      `The link for changing the passord has already expired.`
    );
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET);

  if (!verify) {
    throw new BadRequestError(
      `You do not have the appropriate credentials to change a password.`
    );
  }

  if (!verify?.id || !verify?.username || !verify?.email || !verify?.role) {
    throw new BadRequestError(
      `You do not have the appropriate credentials to change a password.`
    );
  }

  const user = await User.verifyUser(verify.id);

  if (!user) {
    throw new BadRequestError(
      `Error in verifying your account. Try again later.`
    );
  }

  res.status(StatusCodes.OK).json(user);
};

const logInUser = async (req, res) => {
  const { loginData } = req.body;

  const { candidateIdentifier, candidatePassword } = loginData;

  let user = null;
  if (validator.isEmail(candidateIdentifier)) {
    user = await User.findWithEmail(candidateIdentifier);
  } else {
    user = await User.findWithUsername(candidateIdentifier);
  }

  if (!user) {
    throw new NotFoundError(`There is no user with the given identifier.`);
  }

  const { user_id, name, surname, username, email, password, is_verified } =
    user;

  const isMatch = await fns.isMatchedPassword(password, candidatePassword);

  if (!isMatch) {
    throw new BadRequestError(`The email and password does not match.`);
  }

  const primary = {
    userId: user_id,
    name: name,
    surname: surname,
    username: username,
    email: email,
    token: null,
    role: "user",
    isVerified: is_verified,
  };

  if (!is_verified) {
    const token = fns.createSignUpToken(user_id, username, email, "user");

    primary.token = `Bearer ${token}`;

    res.status(StatusCodes.OK).json({ primary });

    const mail = await sendVerificationEmail(
      email,
      `${name} ${surname}`,
      token
    );
    return;
  } else {
    const token = fns.createLogInToken(user_id, username, email, "user");

    primary.token = `Bearer ${token}`;

    res.status(StatusCodes.OK).json({ primary });

    return;
  }
};

const signUpUser = async (req, res) => {
  const { userData } = req.body;
  const { name, surname, username, gradeLevel, email, password, image } =
    userData;

  if (!name || !surname || !username || !gradeLevel || !email || !password) {
    throw new BadRequestError(`Fill all information before signing up.`);
  }

  const takenEmail = await User.findWithEmail(email);

  if (takenEmail) {
    throw new BadRequestError(
      `The email ${email} is already used in Readefine.`
    );
  }

  const takenUserName = await User.findWithUsername(username);

  if (takenUserName) {
    throw new BadRequestError(
      `The username ${username} has already been taken.`
    );
  }

  const hashedPassword = await fns.hashPassword(password);
  const lexileLevel = fns.getLexile(gradeLevel);
  const user = new User(
    name,
    surname,
    username,
    gradeLevel,
    email,
    hashedPassword,
    image
  );
  const data = await user.createUser();

  if (!data) {
    throw new BadRequestError(`Error in signing up. Try again later.`);
  }

  const lexile = new UserLexile(data.insertId, lexileLevel);
  const lexileData = await lexile.createLexile();

  if (!lexileData) {
    throw new BadRequestError(`Error in creating lexile. Try again later.`);
  }

  const token = fns.createSignUpToken(data.insertId, username, email, "user");
  const achievementAssign = await UserAchievement.assignUserAchievements(
    data.insertId
  );

  if (!achievementAssign) {
    throw new BadRequestError(
      `Error in assigning achievements. Try again later.`
    );
  }

  res.status(StatusCodes.OK).json({ data, token });

  const mail = await sendVerificationEmail(email, `${name} ${surname}`, token);
};

module.exports = { logInUser, signUpUser, verifyUser };
