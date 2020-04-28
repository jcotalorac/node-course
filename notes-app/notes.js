const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    console.log(loadNotes());
}

const listNotes = () => {
    console.log(loadNotes());
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });        
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const data = JSON.parse(dataBuffer.toString());
        return data;        
    } catch (error) {
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();   
    const index = notes.findIndex((note) => {
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
    removeNote: removeNote,
    listNotes: listNotes
}