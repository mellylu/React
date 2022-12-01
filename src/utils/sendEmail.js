const nodemailer = require("nodemailer");
require('dotenv').config()

// async..await is not allowed in global scope, must use a wrapper
exports.sendEmail = async(req, res, token) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: "thibault2399@hotmail.fr", // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });
  let infoMail = {
    from: "thibault2399@hotmail.fr", // sender address
    to: "melly.lucas32@yahoo.fr", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<a href='http://localhost:3000/resetpassword?token=${token.token}'>MMMMMMMMMMMMM</a>` //+ token.token + "\n\n" //`<b>Hello world?</b> <a href="${req.headers.host}/reset${token.token}"/>`, // html body
  };


  transporter.sendMail(infoMail, (err)=>{
    if(err){
      return console.log(err)
    }else{
      console.log(`Success`)
    }
})

transporter.close()

  // transporter.sendMail(infoMail, (err, info) => {
  //   if(!err){
  //     console.log("666666666666")
  //     res.send({
  //     success:true,
  //     message: "The message was transmitted successfully"
  //     })
  //   }
  //   else{
  //     console.log("77777777777777")
  //     res.status(500).send({
  //     success:false,
  //     errMessage: err,
  //     message: "There was a problem sending the message, please contact an administrator or try again later"
  //     })
  //   }
}
