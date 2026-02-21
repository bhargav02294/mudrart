const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: `MudrArt <noreply@mail.swarize.in>`,
      to,
      subject,
      html
    });

    return data;

  } catch (error) {
    console.error("Email Error:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendMail;