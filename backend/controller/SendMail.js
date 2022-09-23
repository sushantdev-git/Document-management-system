

const nodemailer = require('nodemailer');

const sendMail = async (name, email) => {

    const transporter = nodemailer.createTransport({
        service:"gmail.com",
        auth:{
            user:process.env.MAIL,
            pass:process.env.MAIL_PASS,
        }
    })

    const mailOptions = {
        from : process.env.MAIL,
        to: email,
        subject:"Credit Spending OTP",
        html: `<html>
                <body>
                    <div>
                        <p>Document Manager</p>
                        <p>${name} has been share with you.</p>
                    </div>
                </body>
               </html>`
    }

    const info = await transporter.sendMail(mailOptions);

}

module.exports = sendMail