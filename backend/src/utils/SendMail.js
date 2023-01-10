const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const sendEmail = async (toemail, subject, text) => {
    try {

        const createTransporter = async () => {
            const oauth2Client = new OAuth2(
              process.env.CLIENT_ID,
              process.env.CLIENT_SECRET,
              "https://developers.google.com/oauthplayground"
            );
          
            oauth2Client.setCredentials({
              refresh_token: process.env.REFRESH_TOKEN
            });
          
            const accessToken = await new Promise((resolve, reject) => {
              oauth2Client.getAccessToken((err, token) => {
                if (err) {
                  reject("Failed to create access token :(");
                }
                resolve(token);
              });
            });
          
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                accessToken,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
              }
            });
          
            return transporter;
          };

          const sendEmail = async (emailOptions) => {
            let emailTransporter = await createTransporter();
            await emailTransporter.sendMail(emailOptions);
          };

          sendEmail({
            subject: subject,
            text: text,
            to: toemail,
            from: process.env.EMAIL
          }).catch((err)=>{
            console.log(err);
          })
          

    } catch (err) {
        console.log("error in sending email" + email)
        console.log(err)
    }
}

module.exports = sendEmail;