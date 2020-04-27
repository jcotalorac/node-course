const validator = require('validator');
const chalk = require('chalk');
const getNotes = require('./notes');

const msg = getNotes();
console.log(msg);

console.log(validator.isEmail('andrew@example.com'));

console.log(validator.isURL('http://mead.io'));

console.log(chalk.red.inverse('Error!'));