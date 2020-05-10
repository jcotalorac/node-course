const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'juancagado@hotmail.com',
        replyTo: 'juancagado@hotmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'juancagado@hotmail.com',
        replyTo: 'juancagado@hotmail.com',
        subject: 'Please do not go',
        text: `Sorry ${name} for goodbye`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}