const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.sendEmail = async(req, res) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: "melly.lucas32@yahoo.fr", // generated ethereal user
      pass: "rougejaune", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let infoMail = {
    from: "melly.lucas32@yahoo.fr", // sender address
    to: "melly.lucas32@yahoo.fr", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter.sendMail(infoMail, (err, info) => {
    if(!err){
      res.send({
      success:true,
      message: "The message was transmitted successfully"
      })
    }
    else{
      res.status(500).send({
      success:false,
      errMessage: err,
      message: "There was a problem sending the message, please contact an administrator or try again later"
      })
    }
  })
}
