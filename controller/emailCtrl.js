const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async (data,req,res)=>{
    var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MP
        }
    });

      const info = await smtpTransport.sendMail({
        from: 'houssamelatmani01@gmail.com', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html:data.htm, // html body
      });
})


module.exports = sendEmail