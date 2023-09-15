const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "69621957924-n72dsrmkmpsig44gdsh32ciq9e2tu360.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04JTiMkjcUZ0uCgYIARAAGAQSNwF-L9Irl_bbd2P0y1o4jPwgkAA_pQGvZsZ62mcZSQpj3f9XDq5sYkhkhQiCIB29b0Jt6A_PuA8";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(email: string, subject: string, html: string) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "indipound@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "INDIPOUND <indipound@gmail.com>",
      to: email,
      subject: subject,
      text: html,
      html: html,
    };
    const result = await transport.sendMail(mailOptions);

    console.log("result (2)");
    console.log(result);

    return result;
  } catch (error) {
    console.log("error sending email (2)");
    console.log(error);

    return error;
  }
}
