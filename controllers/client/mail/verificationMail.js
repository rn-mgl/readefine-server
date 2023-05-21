const sendgrid = require("@sendgrid/mail");
const { BadRequestError } = require("../../../errors");

const url = "http://192.168.1.121:3000/verify";

const sendVerifiationEmail = async (sendTo, toName, token) => {
  const message = {
    from: `Readefine <rltnslns@gmail.com>`,
    to: sendTo,
    subject: "Account Verification",
    text: "Click the link to verify your account.",
    html: `Hello ${toName},

        <br /><br />

        You registered an account on Readefine, 

        <br /><br />

        before being able to use your account you need to verify that this is your email 
        address by clicking here:

        <br /><br />

        <a href="${url}/${token}">Verify Readefine Account</a> 

        <br /><br />

        This link will expire in 24 hours. If you did not sign up for a comms account,
        you can safely ignore this email.

        <br /><br />

        Kind Regards,

        <br /><br />

        Readefine | Developers.`,
  };

  const data = await sendgrid.send(message);

  if (!data) {
    throw new BadRequestError(`Error in sending verification link. Try again later.`);
  }

  return data;
};

module.exports = { sendVerifiationEmail };
