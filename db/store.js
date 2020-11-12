const util = require("util");
const fs = require("fs");



const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  constructor() {
  this.lastId = 0;
}
 
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
        // here you will write a function that uses the above read function and parses the notes from the file 
      let phraseNotes;

      try {
        phraseNotes = [].concat(JSON.parse(notes));
    } catch (err) {
      phraseNotes = [];
    }
      return phraseNotes;
    })
    
  }

  addNote(note) {
    var { title, text } = note;


    // Error handle here, if we have no title or text added throw a new error explaining what is wrong
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Add a unique id to the note using uuid package
    
    var currentNote = { title, text, id: ++this.lastId };
    return this.getNotes()
    .then(notes => [...notes, currentNote])
    .then(updatedNotes => this.write(updatedNotes))
    .then(() => currentNote);
  
  }

 


removeNote(id) {
  return this.getNotes()
    .then(notes=> notes.filter(note=> note.id !==parseInt(id)))
    .then(cleanNotes => this.write(cleanNotes));
  }
}

module.exports = new Store();

