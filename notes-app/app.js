const validator = require('validator');
const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes');

yargs.version('1.1.0');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }, 
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.author);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function(){
        console.log('Removing the note');
    }
});

yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: function(){
        console.log('Listing the note');
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function(){
        console.log('Reading the note');
    }
});

yargs.parse();