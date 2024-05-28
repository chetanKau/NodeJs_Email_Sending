const nodemailer = require("nodemailer");
const express = require("express");
require("dotenv").config();

const app = express()

app.use(express.json())
// const nodemailer = require("nodemailer");

// require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(to, subject, body) {

  const payload = {
    from: "chetankaushik29@gmail.com",
    to,
    subject,
    text: body
  }

  transporter.sendMail(payload, (err, data) => {

    if (err) {
      console.log(err)
    } else {
      console.log("Email is sent to ", to)
    }

  })

}


 app.post('/send-email', async(req, res) => {
 await sendEmail(req.body.to, req.body.subject, req.body.body)
  console.log("test1");

  res.send({ email: "Email sent !" })

})


// module.exports = sendEmail;

app.listen(8000, () => {
  console.log("Port is running at 8000");
})