const validator = require('validator');
const yargs = require('yargs');
const chalk = require('chalk');

yargs.version('1.1.0');

console.log(yargs.argv);

/*if(command === 'add'){
    console.log('Adding note!');
} else if(command === 'remove') {
    console.log('Removing note!');
}*/