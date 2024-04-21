"use strict";

const MailJet = require("node-mailjet");

function sendForgetPasswordEmail(user, host, resetLink) {
  const mailjet = MailJet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.EMAIL_FROM || "workingatgems@gmail.com",
          Name: "Eshop Team",
        },
        To: [
          {
            Email: user.email,
            Name: `${user.firstName} ${user.lastName}`,
          },
        ],
        Subject: "[Eshop] Reset Password",

        HTMLPart: `
          <h3>Dear ${user.firstName} ${user.lastName},</h3>
          <br>
            <p>You have requested to reset your password for your ${host}.</p>
            <br>
            <p>Click on the link below to reset your password.</p>
            <a href="${resetLink}" target="_blank">Reset Password</a>
            <br>
            <p>If you did not request a password reset, please ignore this email.</p>
            <br>
            <p>Thank you.</p>
            <p>Eshop Team</p>

          `,
      },
    ],
  });
  return request;
}

module.exports = { sendForgetPasswordEmail };
