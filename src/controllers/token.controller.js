const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');

const Token = require("../models/token.model");
const User = require("../models/user.model");

const resetPassword = require("../utils/email")


exports.sendEmailToResetPassword = (req, res) => {
    if (req.body.email) {
        User.findOne({
            $or: [{ email: req.body.identifer }],
        })
        .then(user => {
            if (user) {
                Token.findOne({
                    userId: user?._id,
                })
                    .then(token => {
                        if (token) {
                            resetPassword(user, token.token, URL_FRONT);
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

                            resetPassword(user, token.token, URL_FRONT);

                            res.status(200).send({
                                success: true,
                                message: "Email sended",
                                email: user?.email,
                            });
                        }
                    })
                    .catch(() => {
                        res.status(401).send({
                            success: false,
                            message: "Server error",
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
