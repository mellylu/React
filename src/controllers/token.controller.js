const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');

const JWT_SECRET = process.env.JWT_SECRET;
const Token = require("../models/token.model");
const User = require("../models/user.model");

const sendEmail = require("../utils/sendEmail")


exports.sendEmailToResetPassword = (req, res) => {
    if (req.body.email) {
        User.findOne({
            user: [{ email: req.body.identifer }],
        })
        // .then(async(user) => {
        //     if (user) {
        //         const token = Token.findOne({
        //             userId: user?._id,
        //             })
        //             if (!token) {
        //                 token = await new Token({
        //                     userId: user._id,
        //                     token: crypto.randomBytes(32).toString("hex"),
        //                 }).save();
        //             }
        //             const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        // await sendEmail(user.email, "Password reset", link);

        // res.send("password reset link sent to your email account");
      
        .then((user) => {
            if (user) {
                Token.findOne({
                    userId: user._id,
                })
                    .then(token => {
                        console.log(token)
                        if (token) {
                            sendEmail.sendEmail(req, res)
                           
                            res.status(200).send({
                                success: true,
                                message: "Email sended",
                                email: user?.email,
                            });
                        } else {
                            const userToken = jwt.sign(
                                {
                                    hash: randomString.generate(100),
                                },
                                JWT_SECRET,
                                {
                                    expiresIn: 86400,
                                },
                            );

                            const token = new Token({
                                userId: user?._id,
                                token: userToken,
                            });

                            token.save();

                            sendEmail.sendEmail()
                            

                            
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(401).send({
                            success: false,
                            message: "Eepp",
                        });
                    });
            } else {
                res.status(201).send({
                    success: true,
                    message: "User not found",
                });
            }
                
        })
        .catch(() => {
            res.status(401).send({
                success: false,
                message: "Error has occured",
            });
        });
} else {
    res.status(400).send({
        success: false,
        message: "Missing data",
    });
}
}
