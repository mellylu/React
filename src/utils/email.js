const resetPassword = async (user, token, urlfront) => {
    let html = getTemplate("resset");
    const reg = new RegExp("(__customer__)", "g");
    html = html.replace(reg, `${user.firstName} ${user.lastName}`);

    const reg2 = new RegExp("(__url__)", "g");
    html = html.replace(reg2, `${urlfront}/updatePassword?token=${token}`);

    let htmltosend = getTemplate("base");
    const regbase = new RegExp("(__Template__)", "g");
    htmltosend = htmltosend.replace(regbase, html);

    const nodemailer  = {
        to: user.email,
        subject: "Reset password | Site Mangas",
        html: htmltosend,
    };
    sendMail(nodemailer);
};

module.exports = resetPassword;