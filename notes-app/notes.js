const fs = require('fs');

const getNotes = function() {
    return 'Your notes...';
}

const addNote = function(title, body) {
    const notes = loadNotes();

    notes.push({
        title: title,
        body: body
    });
    console.log(notes);
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const data = JSON.parse(dataBuffer.toString);
        return data;        
    } catch (error) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}