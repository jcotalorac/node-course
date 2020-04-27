const fs = require('fs');
const msg = require('./utils');

fs.writeFileSync('notes.js', msg());