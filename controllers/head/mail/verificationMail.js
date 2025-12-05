const sendgrid = require("@sendgrid/mail");
const { BadRequestError } = require("../../../errors");
const axios = require("axios");

const sendVerificationEmail = async (sendTo, toName, token) => {
  const envelope = {
    from: `Readefine <rltnslns@gmail.com>`,
    to: sendTo,
    subject: "Account Verification",
    source: process.env.EMAIL_SOURCE,
    html: `<h1> Hello Head <i>${toName}</i></h1>

        <br /><br />

        You <b>registered an admin account</b> on Readefine, 

        <br /><br />

        before being able to use your admin account you need to verify that this is your email 
        address by clicking here:

        <br /><br />

        <a href="${url}/validate/${token}">
          <h4>Verify My Readefine Head Account</h4>
        </a> 

        <br /><br />

        This link will expire in <b>24 hours.</b> If you did not sign up for a Readefine account,
        you can safely ignore this email.

        <br /><br />

        Kind Regards,

        <br /><br />

        Readefine | <i>Developers.</i>`,
  };

  const data = await axios.post(`${process.env.EMAIL_CONNECTOR}`, { envelope });

  if (!data) {
    throw new BadRequestError(
      `Error in sending verification link. Try again later.`
    );
  }

  return data;
};

module.exports = { sendVerificationEmail };
