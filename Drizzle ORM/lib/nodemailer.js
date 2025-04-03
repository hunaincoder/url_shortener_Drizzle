import nodemailer from "nodemailer";

const testAccount = nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "jamarcus.gusikowski@ethereal.email",
    pass: "QDjGeGE6udf16PctU8",
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: `"URL SHORTENER" <jamarcus.gusikowski@ethereal.email>`,
    to,
    subject,
    html,
  });

  const testEmailURL = nodemailer.getTestMessageUrl(info);
  console.log("Verify email : ", testEmailURL);
};
