const sendgrid = require("@sendgrid/mail");
const { BadRequestError } = require("../../../errors");

const url = "http://192.168.1.121:3000";

const sendVerificationEmail = async (sendTo, toName, token) => {
  const message = {
    from: `Readefine <rltnslns@gmail.com>`,
    to: sendTo,
    subject: "Account Verification",
    text: "Click the link to verify your account.",
    html: `<h1> Hello <i>${toName}</i></h1>

        <br /><br />

        You <b>registered an account</b> on Readefine, 

        <br /><br />

        before being able to use your account you need to verify that this is your email 
        address by clicking here:

        <br /><br />

        <a href="${url}/verify/${token}">
          <h4>Verify My Readefine Account</h4>
        </a> 

        <br /><br />

        This link will expire in <b>24 hours.</b> If you did not sign up for a Readefine account,
        you can safely ignore this email.

        <br /><br />

        Kind Regards,

        <br /><br />

        Readefine | <i>Developers.</i>`,
  };

  const data = await sendgrid.send(message);

  if (!data) {
    throw new BadRequestError(`Error in sending verification link. Try again later.`);
  }

  return data;
};

module.exports = { sendVerificationEmail };
