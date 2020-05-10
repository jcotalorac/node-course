const sgMail = require('@sendgrid/mail');
//const sendgridAPIKey = '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';
const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'juancagado@hotmail.com',
        replyTo: 'juancagado@hotmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
};

module.exports = {
    sendWelcomeEmail
}