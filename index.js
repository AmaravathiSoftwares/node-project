import nodemailer from 'nodemailer';

process.env.OPENSSL_CONF = '/path/to/openssl.cnf';

let transporter = nodemailer.createTransport({
    host: 'mail.amaravathi.live',
    port: 465,
    secure: true,
    auth: {
        user: 'info@amaravathi.live',
        pass: 'XoGGv1(XQ.jy'
    },
    tls: {
        rejectUnauthorized: false // Allow invalid certificate (unsafe for production)
    },
    // logger: true // Enable detailed logging
});

let mailOptions = {
    from: 'info@amaravathi.live',
    to: 'darlingveera1997@gmail.com',
    subject: 'Email For Testing...',
    text: 'Hi, this is Aravind from Amaravathi Software Innovations',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        // console.log('Error occurred: ' + error);
    } else {
        //  console.log('Email sent successfully to ' + info.response);
        // console.log('Email sent successfully to ' + info.accepted);
        // console.log('Email sent successfully to ' + info.messageId);
        // console.log('Email sent successfully to ' + info.envelope.from);
        // console.log('Email sent successfully to ' + info.envelope.to);
        // console.log('Email sent successfully to ' + info.pending);
        // console.log('Email sent successfully to ' + info.rejected);
    }
});
