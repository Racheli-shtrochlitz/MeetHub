const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mindy05832@gmail.com',
        pass: 'xggammfabxykoavb'
    }
})


const sendMail = (req, res) => {
    console.log("req.body: ",req.body)
    const { toName, formName, message, email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email not provided" });
    }
    transport.sendMail({
        from:'mindy05832@gmail.com',
        to: email,
        subject: `hi ${toName} sent from ${formName} by educonnect`,
        html: message
    }).then(() => {
        console.log("Sending email to:", email, ". message:", message);
        res.status(200).json({ message: "Email sent successfully" });
    }).catch((err) => {
        console.error("Error sending email:", err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    })
}

module.exports = { sendMail }