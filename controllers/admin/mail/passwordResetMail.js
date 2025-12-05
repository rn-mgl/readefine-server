const sendgrid = require("@sendgrid/mail");
const { BadRequestError } = require("../../../errors");
const axios = require("axios");

const sendPasswordResetEmail = async (sendTo, toName, token) => {
  const envelope = {
    from: `Readefine <rltnslns@gmail.com>`,
    to: sendTo,
    subject: "Password Reset",
    source: process.env.EMAIL_SOURCE,
    html: `Hello Admin ${toName},

        <br /><br />

        You requested for a password reset on Readefine, 

        <br /><br />

        reset your account by clicking here:

        <br /><br />

        <a href="${process.env.URL}/renew/${token}">Reset Readefine Password</a> 

        <br /><br />

        This link will expire in 24 hours. If you did not request for Readefine password reset,
        you can safely ignore this email.

        <br /><br />

        Kind Regards,

        <br /><br />

        Readefine | Developers.`,
  };

  const data = await axios.post(`${process.env.EMAIL_CONNECTOR}`, { envelope });

  if (!data) {
    throw new BadRequestError(
      `Error in sending password reset link. Try again later.`
    );
  }

  return data;
};

module.exports = { sendPasswordResetEmail };
