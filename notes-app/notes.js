const fs = require('fs');
const chalk = require('chalk');

const getNotes = function() {
    return 'Your notes...';
}

const addNote = function(title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note){
        return note.title === title;
    });

    if(duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });        
        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note title taken!');
    }

}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const data = JSON.parse(dataBuffer.toString());
        return data;        
    } catch (error) {
        return [];
    }
}

const removeNote = function(title) {
    const notes = loadNotes();   
    const index = notes.findIndex(function(note) {
        return note.title === title;
    });
    if(index > -1) {
        notes.splice(index, 1);
        saveNotes(notes);
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}