const nodemailer = require('nodemailer');



class EmailSender {
   constructor() {
        this.mapEmails = new Map()
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWD
            }
        });
    }


    send(email) {
        const code = Math.floor(10000 + Math.random() * 90000)

        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Email de verificação',
            text: `Seu código de verificação é: ${code}`
        };
        this.mapEmails.set(email, code)
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                this.mapEmails.set(email, code)
                console.log('Email sent: ' + info.response);
                console.log('Codigo enviado: ' + code)
            }
        });
    }

    checkCode(email, code) {
        const codeReal = this.mapEmails.get(email)
        if(codeReal == code) {
            this.mapEmails.delete(email)
            return true
        } else return false
    }
}

module.exports = {
    Email: new EmailSender()
}