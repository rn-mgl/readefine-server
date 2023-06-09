const sendgrid = require("@sendgrid/mail");
const { BadRequestError } = require("../../../errors");

const url = "http://192.168.1.121:3000/reset";

const sendPasswordResetEmail = async (sendTo, toName, token) => {
  const message = {
    from: `Readefine <rltnslns@gmail.com>`,
    to: sendTo,
    subject: "Password Reset",
    text: "Click the link to reset your account's password.",
    html: `Hello ${toName},

        <br /><br />

        You requested for a password reset on Readefine, 

        <br /><br />

        reset your account by clicking here:

        <br /><br />

        <a href="${url}/${token}">Reset Readefine Password</a> 

        <br /><br />

        This link will expire in 24 hours. If you did not request for Readefine password reset,
        you can safely ignore this email.

        <br /><br />

        Kind Regards,

        <br /><br />

        Readefine | Developers.`,
  };

  const data = await sendgrid.send(message);

  if (!data) {
    throw new BadRequestError(`Error in sending password reset link. Try again later.`);
  }

  return data;
};

module.exports = { sendPasswordResetEmail };
