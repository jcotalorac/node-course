const sgMail = require('@sendgrid/mail');
//const sendgridAPIKey = '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';
const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);
const msg = {
    to: 'jcotalorac@gmail.com',
    from: 'juancagado@hotmail.com',
    replyTo: 'juancagado@hotmail.com',
    subject: 'This is my first creation',
    text: 'I hope this one actually gets to you.'
};
sgMail.send(msg);